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
import { removeLocalSavedMovies } from '../../utils/savedMoviesStorage';
import { removeLocalMovies } from '../../utils/moviesStorage';

function App() {
  const initialData = { email: '', password: ''};
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
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
            })
            .catch(err => {
              console.error(err);
            })
            .finally(() => setTokenChecked(true));
        } else {
          setTokenChecked(true);
          history.push('/');
        } 
      })
  }, []);

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
              setTooltipMessage({ type: 'info', text: 'Поздравляем, логин успешный!' });
              history.push('/movies');
            })
            .catch(err => setTooltipMessage({
              type: 'error',
              text: err.message || 'Что-то пошло не так!'
            }));
        }
      });
  }

  function handleRegister({ name, email, password }) {
    return auth.register(name, email, password)
      .then(data => {
        setIsRegistered(true);
        handleLogin({ email, password });
        return data;
      })
      .catch((error) => {
        setIsRegistered(false);
        setTooltipMessage({ type: 'error', text: error.message || 'Что то пошло не так!' });
      });
  }

  function handleLoggedOut() {
    localStorage.removeItem('jwt');
    removeLocalSavedMovies();
    removeLocalMovies();
    setCurrentUser(initialData);
    setLoggedIn(false);    
    history.push('/');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>       
      <TooltipContext.Provider value={{ message: tooltipMessage, setMessage: setTooltipMessage }}>
      <Header loggedIn={ loggedIn } />
        {
          tokenChecked
            ? (
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
                <Route render={ NotFoundError } />
              </Switch> 
            )
            : null
        }
      <Footer/>
      <Tooltip/>
      </TooltipContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;