import React, { useEffect, useState } from 'react';
import { Pagination, Spin, Alert } from 'antd';
import MediaQuery from 'react-responsive';
import { Online, Offline } from 'react-detect-offline';

import './FilmsList.css';
import CardFilm from '../CardFilm/CardFilm';

export default function FilmsList() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const apiKey = '60dc1693c2a318aa9e16ce752d4ea508';
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  async function getMovies() {
    await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((response) => {
        if (response.ok) {
          setLoad(false);
          return response.json();
        }
      })
      .then((json) => {
        setMovieList(json.results);
        setData(json.results.slice(0, 6));
        setError(null);
      })
      .catch((e) => {
        if (e instanceof TypeError) {
          setError('Не удалось получить данные.');
        } else {
          setError('Нет сети интернет.');
        }
      });
  }
  useEffect(() => {
    setError(null);
    getMovies();
    setMovieList([]);
  }, []);
  function pages(e) {
    if (e === 1) {
      setData(movieList.slice(0, 6));
    } else if (e === 2) {
      setData(movieList.slice(6, 12));
    } else if (e === 3) {
      setData(movieList.slice(12, 18));
    } else if (e === 4) {
      setData(movieList.slice(18));
    }
    setPage(e);
    document.querySelectorAll('.ant-pagination-item').forEach((o) => o.classList.remove('ant-pagination-item-active'));
    document.querySelector(`.ant-pagination-item-${e}`).classList.add('ant-pagination-item-active');
  }
  // useEffect(() => {
  //   console.log(error);
  // }, [error]);
  return (
    <div>
      <Online>
        <div className="films-list">
          {error ? (
            <Alert description={error} banner={true} showIcon={true} type="error" />
          ) : (
            <>
              <MediaQuery minWidth={769}>
                {load && !error ? (
                  <Spin />
                ) : (
                  data.map((e) => {
                    return <CardFilm e={e} key={e.id} />;
                  })
                )}
                <Pagination
                  total={Math.ceil(movieList.length / 6) * 10}
                  defaultCurrent={1}
                  current={page}
                  onChange={(e) => pages(e)}
                />
              </MediaQuery>
              <MediaQuery maxWidth={768}>
                {load ? (
                  <Spin />
                ) : (
                  movieList.map((e) => {
                    return <CardFilm e={e} key={e.id} />;
                  })
                )}
              </MediaQuery>
            </>
          )}
        </div>
      </Online>
      <Offline>
        <Alert type="error" message="Отсутствует подключение к сети интернет." />
      </Offline>
    </div>
  );
}
