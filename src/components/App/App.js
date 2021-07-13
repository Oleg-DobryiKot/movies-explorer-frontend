import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import SavedMovies from '../Movies/SavedMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TooltipContext } from '../../contexts/TooltipContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import mainApi from '../../utils/mainApi';


function App() {
  const initialData = { email: '', password: ''};
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [tooltipMessage, setTooltipMessage] = useState(null);

  
  
  useEffect(() => {
    getUserDataByToken()
      .then((userData) => {
        if (userData) {
          const authToken = localStorage.getItem('jwt');
          mainApi.getUserInfo(authToken)
            .then(info => {
              setCurrentUser(info);
              setLoggedIn(true);
              history.push('/movies');
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          history.push('/');
        } 
      })
  }, [loggedIn]);

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
          mainApi.getUserInfo(res.token)
            .then(info => {
              localStorage.setItem('jwt', res.token);
              setCurrentUser(info);
              setLoggedIn(true);
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
          setTooltipMessage({ type: 'error', text: 'Такой пользователь уже зарегестрирован!' });
        } else {
          setTooltipMessage({ type: 'error', text: 'Что-то не так с запросом на сервер!' });
        }
      })
  }

  function handleLoggedOut() {
    localStorage.removeItem('jwt');
    setCurrentUser(initialData);
    setLoggedIn(false);    
    history.push('/');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>       
      <TooltipContext.Provider value={{ message: tooltipMessage, setMessage: setTooltipMessage }}>
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
            component={ SavedMovies }
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
      <Tooltip/>
      </TooltipContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;