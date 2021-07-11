import { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import 'react-dom';

import './App.css';
import Header from '../Markup/Header/Header';
import Main from '../Markup/Main/Main';
import Footer from '../Markup/Footer/Footer';
// import Tooltip from '../Markup/Tooltip/Tooltip';
import Tooltip2 from '../Markup/Tooltip2/Tooltip2';
import NotFoundError from '../NotFoundError/NotFoundError';
import Register from '../Rest/Register/Register';
import Login from '../Rest/Login/Login';
import Profile from '../Rest/Profile/Profile';
import Movies from '../Movies/Movies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TooltipContext } from '../../contexts/TooltipContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import mainApi from '../../utils/mainApi';


function App() {
  const initialData = { email: '', password: ''};
  // const [data, setData] = useState(initialData);
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [tooltipMessage, setTooltipMessage] = useState(null);

  
  
  useEffect(() => {
    getUserDataByToken()
      .then((userData) => {
        if (userData) {
          debugger;
          const authToken = localStorage.getItem('jwt');
          setCurrentUser(userData);
          setLoggedIn(true);
          mainApi.getUserInfo(authToken)
            .then(info => { setCurrentUser(info) })
            .catch(console.error);
          history.push('/movies');
        } else {
          history.push('/');
        } 
      })
  }, [history, loggedIn]);

  const getUserDataByToken = () => {
    return new Promise((resolve) => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.checkToken(jwt)
          .then(res => {
            if (res) {
              resolve({ email: res.email, name: res.name });
            }
            resolve(null);
          })
          .catch(() => {
            resolve(null);
          });
      } else {
        resolve(null);  
      }      
    });
  }

  function handleLogin({ email, password }) {
    debugger;
    return auth.authorize(email, password)
      .then(res => {
        if (!res || res.status === 400) throw new Error('Что то пошло не так!')
        if (res.status === 401) throw new Error('Нет пользователя с таким e-mail...');
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setCurrentUser({ email, password });
          setLoggedIn(true);
          mainApi.getUserInfo(res.token)
            .then(info => {
              setCurrentUser(info);
              history.push('/movies');
            })
            .catch(console.error);
        }
      });
  }

  function handleRegister({ name, email, password }) {
    return auth.register(name, email, password)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(data => {
        setIsRegistered(true);
        handleLogin({ email, password });
        return data;
      })
      .catch((res) => {
        setIsRegistered(false);
        if (res.status === 401) {
          // setErrorMessageState('Такой пользователь уже зарегестрирован!')
        } else {
          // setErrorMessageState('Что-то не так с запросом на сервер!');
        }
      })
  }

  function handleLoggedOut() {
    localStorage.removeItem('jwt');
    setCurrentUser(initialData);
    setLoggedIn(false);    
    history.push('/');
  }

  // function handleShowTooltip() {
  //   setIsTooltipOpen(true);
  // }

  // function closeTooltip() {
  //   setIsTooltipOpen(false);
  // }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}>       
      <TooltipContext.Provider value={{ message: tooltipMessage, setMessage: setTooltipMessage }}>
      <div>{ JSON.stringify(currentUser) }</div> 
      <Header loggedIn={ loggedIn } /> 
        <Switch>
          <Route exact path="/"> 
            <Main/>
          </Route>
          <ProtectedRoute path="/profile" 
            loggedIn={ loggedIn }
            onLoggedOut={ handleLoggedOut } 
            component={ Profile }
          />
          <ProtectedRoute path="/movies"
            loggedIn={ loggedIn }
            component={ Movies }
          />
          <ProtectedRoute path="/saved-movies"
            loggedIn={ loggedIn }
            component={ Movies }
          />
          <Route path="/signup">
            <Register onRegister={ handleRegister }/>
          </Route>
          <Route path="/signin">
            <Login onLogin={ handleLogin }/>
          </Route>
          <Route path="/error">
            <NotFoundError/>
          </Route>
        </Switch> 
      <Footer/>
      {/*
      <Tooltip 
        isOpen={ isTooltipOpen }
        onClose={ closeTooltip }
        isRegistered = { isRegistered }
        isLoggedIn = { loggedIn }
      />
      */}
      <Tooltip2></Tooltip2>
      </TooltipContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;