import { Route, Switch } from 'react-router-dom';
import 'react-dom';
import './App.css';
import Header from '../Markup/Header/Header';
import Main from '../Markup/Main/Main';
import Footer from '../Markup/Footer/Footer';
import NotFoundError from '../NotFoundError/NotFoundError';
import Register from '../Rest/Register/Register';
import Login from '../Rest/Login/Login';
import Profile from '../Rest/Profile/Profile';
import Movies from '../Movies/Movies';

function App() {

  return (
    <div className="page">
      <Header/> 
        <Switch>
          <Route exact path="/"> 
            <Main/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/movies">
            <Movies/>
          </Route>       
          <Route path="/saved-movies">
            <Movies/>
          </Route>       
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
          <Route path="/error">
            <NotFoundError/>
          </Route>
        </Switch> 
      <Footer/>
    </div>
  );
}

export default App;