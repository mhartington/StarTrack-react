import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { register } from './serviceWorker';
import store from './store';
import {IonToast} from '@ionic/react';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
    <IonToast isOpen={true} message="Your settings have been saved." />
  </Provider>,
  rootElement
);

register({
  onUpdate: async (registration: ServiceWorkerRegistration) => {
    await registration.update();
    console.log(registration);
    console.log('new version');
  }
});
