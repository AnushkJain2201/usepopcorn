import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'af22b349';

export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);


  const handleCloseMovie = () => {
    setSelectedId(null);
  }

  const {movies, isLoading, error}  = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");
  
  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = localStorage.getItem('watched');

  //   return JSON.parse(storedValue);
  // });


  const handleSelectMovie =(id) => {
    setSelectedId((currId) => id === currId ? null : id);
  }

  

  const handleAddWatched = (movie) => {
    setWatched((currWatched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  const handleDeleteWatched = (id) => {
    setWatched((currWatched) => currWatched.filter((movie) => movie.imdbID !== id));
  }

  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then(res => res.json()).then(data => console.log(data));

  // useEffect(() => {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then(res => res.json())
  //   .then(data => setMovies(data.Search))
  // }, [])  

  // async and await to do the same thing
  // useEffect(() => {

  //   const controller = new AbortController();

  //   async function fetchMovies() {
  //     try{
  //       setIsLoading(true);
  //       setError("");

  //       const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

  //       if(!response.ok) throw new Error("Something went wrong with fetching movies");

        

  //       const result = await response.json();

  //       if(result.Response === 'False') throw new Error("Movie Not Found");

  //       setMovies(result.Search);
        
  //     } catch(err) {
  //       console.log(err.message);
  //       if(err.name !== "AbortError") {
  //         setError(err.message);
  //       }

  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   // If the query that we search in the search box is less than 3 charachters we will not make the fetch request
  //   if(query.length < 3) {
  //     setMovies([]);
  //     setError('');
  //     return;
  //   }

  //   handleCloseMovie();

  //   fetchMovies();

  //   return () => {
  //     controller.abort();
  //   }
  // }, [query])

  // useEffect to save the new watched list in the localstorage everytime the watched state is updated
  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, [watched]);
 
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>

        {/* <Box element={isLoading ? <Loader /> : <MovieList movies={movies} />} />

        <Box element={
          <>
            <WatchedSummary watched={watched} />

            <WatchedList watched={watched} />
          </>
        } /> */}

        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}

          {isLoading && <Loader />}

          {!isLoading && !error && <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}

          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          
          {
            selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched} /> :
            <>
              <WatchedSummary watched={watched} />

              <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          }
          
        </Box>

      </Main>
    </>
  );
}

const MovieDetails = ({selectedId, onCloseMovie, onAddWatched, watched}) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if(userRating)
      countRef.current = countRef.current + 1;
  }, [userRating])

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

	const {Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current
    }

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
 
  useEffect(() => {
    

    const getMovieDetails = async() => {
			setIsLoading(true);

      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

			const data = await response.json();
			setMovie(data);

			setIsLoading(false);
    }

		getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    const escapeMovieDetail = document.addEventListener('keydown', (e) => {
      if(e.code === 'Escape') {
        onCloseMovie();
      }
    });

    return () => {
      document.removeEventListener('keydown', escapeMovieDetail);
    }
  }, [onCloseMovie]);

  useEffect(() => {
    if(!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn"
    }
  }, [title]);

  return (
    <div className="details">
			{isLoading ? <Loader /> : 
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>

						<img src={poster} alt={title} />

						<div className="details-overview">
							<h2>{title}</h2>
							<p>{released} &bull; {runtime}</p>
							<p>{genre}</p>
							<p><span>🌟</span>{imdbRating} IMDB rating</p>
						</div>

					</header>

					<section>
						<div className="rating">
              { !isWatched ?
                <>
                  <StarRating maxRating={10}  size={24} onSetRating={setUserRating} />

                  { userRating > 0 && <button className="btn-add" onClick={handleAdd}>Add to list</button>}
                </>

                : <p>You already rated this movie {watchedUserRating} <span>🌟</span></p>
              }
						</div>

						<p><em>{plot}</em></p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			}
			
    </div>
  );
}

const  ErrorMessage = ({message}) => {
  return(
    <p className="error">
      <span>📛</span> {message}
    </p>
  );
}

const Loader = () => {
  return(
    <p className="loader">Loading...</p>
  );
}

const WatchedList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>
          X
        </button>

      </div>
    </li>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const Box = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

/*
const Watched = () => {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />

          <WatchedList watched={watched} />
        </>
      )}
    </div>
  );
};
*/

const MovieList = ({ movies, handleSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleSelectMovie={handleSelectMovie} />
      ))}
    </ul>
  );
};

const Movie = ({ movie, handleSelectMovie }) => {
  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const Search = ({query, setQuery}) => {
  const inputEl = useRef(null);

  // Search field will be focused after pressing the Enter key
  useEffect(() => {
    const callback = (e) => {
      if(document.activeElement === inputEl.current) return; 
      if(e.code === "Enter") {
        inputEl.current.focus();

        setQuery('');
      }
    }

    document.addEventListener('keydown', callback);

    return () => document.addEventListener('keydown', callback);
  }, [setQuery])

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

const NavBar = ({children}) => {
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  );
};

const Main = ({ children }) => {
  return (
    <main className="main">
      {children}
    </main>
  );
};
