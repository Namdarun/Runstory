import React from 'react';
import ReactDOM from 'react-dom';
// import * as ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { AuthProvider } from './User/context/AuthProvider';
import { ColorModeScript } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
// import store from './store';

// const root = ReactDOM.createRoot(container);
// const container = document.getElementById('root');

ReactDOM.render(
      <>
      <ColorModeScript />
      <AuthProvider>
        <App/>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <script>Kakao.init("자바스크립트 앱키");</script>
      </AuthProvider>
      </>,
    document.getElementById('root')
);


// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
