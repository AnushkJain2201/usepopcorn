import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={8} />
  </React.StrictMode>
);

