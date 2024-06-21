import React, { useState, useEffect, createContext } from 'react';

import { apiToken } from '../api';
export const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    fetchWithProgress('https://api.themoviedb.org/3/genre/movie/list?language=en', (progress) => {
      console.log(`Загрузка: ${progress}%`);
    })
      .then((data) => setGenres(JSON.parse(data).genres))
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
};
function fetchWithProgress(url, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${apiToken}`);
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error('Ошибка загрузки: ' + xhr.statusText));
      }
    };

    xhr.onerror = () => reject(new Error('Сетевая ошибка'));
    xhr.send();
  });
}
