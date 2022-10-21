import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'
import {Provider} from "react-redux";
import {store} from "./redux/store";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

