import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomRoute from '../src/routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <ToastContainer closeOnClick={false} closeButton={true}/>
    <CustomRoute />
  </Provider>
);


