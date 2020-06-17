import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { register } from './serviceWorker';
import store from './store';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

register({
  onUpdate: async (registration: ServiceWorkerRegistration) => {
    await registration.update();
    window.location.reload();
  },
});
