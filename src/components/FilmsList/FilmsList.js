import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import MediaQuery from 'react-responsive';

import './FilmsList.css';
import CardFilm from '../CardFilm/CardFilm';

export default function FilmsList() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const apiKey = '60dc1693c2a318aa9e16ce752d4ea508';
  const getMovies = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((json) => {
        setMovieList(json.results);
        setData(json.results.slice(0, 6));
      });
  };
  useEffect(() => {
    getMovies();
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
  return (
    <div className="films-list">
      <MediaQuery minWidth={769}>
        {data.map((e) => {
          return <CardFilm e={e} key={e.id} />;
        })}
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        {movieList.map((e) => {
          return <CardFilm e={e} key={e.id} />;
        })}
      </MediaQuery>
      <Pagination
        total={Math.ceil(movieList.length / 6) * 10}
        defaultCurrent={1}
        current={page}
        onChange={(e) => pages(e)}
      />
    </div>
  );
}
