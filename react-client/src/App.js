import React, { Component } from 'react';
import {
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'

// Import main CSS styles
import './App.css';

// Import top level components
import configureStore from './store/configureStore';
import initialState from './reducers/initialState';

// Import top level componets
import HomePage from './components/home/homePage';
import GamePage from './components/game/gamePage';

// Init redux store with initial state
const store = configureStore(initialState);

const history = createHistory()

class App extends Component {
  render() {
    return (
      <div className="App">

        {/* Redux integration */}
        <Provider store={store}>

          {/* Routing integration */}
          <Router history={history}>

            {/* Only one route at the time */}
            <Switch>

              {/* Root for the ome page */}
              <Route exact path="/" component={HomePage}/>

              {/* Game view */}
              <Route path="/game/:type" component={GamePage}/>

              {/* Any other route */}
              <Route render={() => <Redirect to="/"/>}/>
              
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
