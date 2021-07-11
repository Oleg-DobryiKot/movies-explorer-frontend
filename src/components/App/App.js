import { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import 'react-dom';

import './App.css';
import Header from '../Markup/Header/Header';
import Main from '../Markup/Main/Main';
import Footer from '../Markup/Footer/Footer';
import Tooltip from '../Markup/Tooltip/Tooltip';
import NotFoundError from '../NotFoundError/NotFoundError';
import Register from '../Rest/Register/Register';
import Login from '../Rest/Login/Login';
import Profile from '../Rest/Profile/Profile';
import Movies from '../Movies/Movies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ErrorMessageContext } from '../../contexts/ErrorMessageContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import mainApi from '../../utils/mainApi';


function App() {
  const initialData = { email: '', password: ''};
  const [data, setData] = useState(initialData);
  const history = useHistory();

  const [currentUserState, setCurrentUserState] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessageState, setErrorMessageState]  = useState('');
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  
  useEffect(() => {
    getUserDataByToken()
      .then((userData) => {
        if (userData) {
          const authToken = localStorage.getItem('jwt');
          setData(userData);
          setLoggedIn(true);
          mainApi.getUserInfo(authToken)
            .then(info => { setCurrentUserState(info) })
            .catch(console.error);
        } else { history.push('/') } 
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
    return auth.authorize(email, password)
      .then(res => {
        if (!res || res.status === 400) throw new Error('Что то пошло не так!')
        if (res.status === 401) throw new Error('Нет пользователя с таким e-mail...');
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setData({ email, password });
          setLoggedIn(true);
          mainApi.getUserInfo(res.token)
          .then(info => { setCurrentUserState(info) })
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
        return data;
      })
      .catch((res) => {
        setIsRegistered(false);
        if (res.status === 401) {
          setErrorMessageState('Такой пользователь уже зарегестрирован!')
        } else {
          setErrorMessageState('Что-то не так с запросом на сервер!');
        }
      })
  }

  function handleLoggedOut() {
    localStorage.removeItem('jwt');
    setData(initialData);
    setLoggedIn(false);    
    history.push('/');
  }

  function handleShowTooltip() {
    setIsTooltipOpen(true);
  }

  function closeTooltip() {
    setIsTooltipOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser: currentUserState, setCurrentUser: currentUser => setCurrentUserState(currentUser) }}>       
      <ErrorMessageContext.Provider value={{ message: errorMessageState, setErrorMessage: message => setErrorMessageState(message) }}> 
      <Header loggedIn={ loggedIn } /> 
        <Switch>
          <Route exact path="/"> 
            <Main/>
          </Route>
          <ProtectedRoute path="/profile" 
            loggedIn={ loggedIn }
            onLoggedOut={ handleLoggedOut } 
            userData={ data }
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
            <Register onRegister={ handleRegister } onShowTooltip={ handleShowTooltip }/>
          </Route>
          <Route path="/signin">
            <Login onLogin={ handleLogin } onShowTooltip={ handleShowTooltip }/>
          </Route>
          <Route path="/error">
            <NotFoundError/>
          </Route>
        </Switch> 
      <Footer/>
      <Tooltip 
        isOpen={ isTooltipOpen }
        onClose={ closeTooltip }
        isRegistered = { isRegistered }
        isLoggedIn = { loggedIn }
      />
      </ErrorMessageContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;