import { useEffect } from "react";

export const useKey = (key, action) => {
    useEffect(() => {
        const escapeMovieDetail = document.addEventListener('keydown', (e) => {
          if(e.code.toLowerCase() === key.toLowerCase()) {
            action();
          }
        });
    
        return () => {
          document.removeEventListener('keydown', escapeMovieDetail);
        }
      }, [action, key]);
}