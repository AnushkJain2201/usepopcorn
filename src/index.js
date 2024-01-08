import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// import StarRating from './StarRating';

// const Test = () => {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating color='blue' maxRating={10} onSetRating = {setMovieRating} />

//       <p>This Movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

