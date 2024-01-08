import { useEffect, useState } from "react";

const KEY = 'af22b349';

export const useMovies = (query) => {

	const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
		
		// The function will be called only if it exists.
		// callback?.();

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const result = await response.json();

        if (result.Response === "False") throw new Error("Movie Not Found");

        setMovies(result.Search);
      } catch (err) {
        console.log(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // If the query that we search in the search box is less than 3 charachters we will not make the fetch request
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // handleCloseMovie();

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

	return {movies, isLoading, error};
};
