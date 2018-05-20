import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {

  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyAPYSYzUGBObks3hqBAg2Mb0VkDiCHWZiY',
      authDomain: 'taker-c5788.firebaseapp.com',
      databaseURL: 'https://taker-c5788.firebaseio.com',
      projectId: 'taker-c5788',
      storageBucket: 'taker-c5788.appspot.com',
      messagingSenderId: '813674765422'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
