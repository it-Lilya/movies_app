import React, { useEffect, useState, useContext } from 'react';
import { Pagination, Spin } from 'antd';
import MediaQuery from 'react-responsive';

import CardFilm from '../CardFilm/CardFilm';
import { GenresContext } from '../genre-list';

export default function MoviesList({ data, movieList = [], page, pages, load, setRating }) {
  const genres = useContext(GenresContext);
  const [currentGenres, setCurrentGenres] = useState([]);
  useEffect(() => {
    setCurrentGenres(genres);
  });
  return (
    <>
      <MediaQuery minWidth={769}>
        {load ? (
          <Spin />
        ) : (
          currentGenres.length > 0 &&
          data.map((e) => {
            return <CardFilm e={e} key={e.id} currentGenres={currentGenres} setRating={setRating} />;
          })
        )}
        {data.length >= 20 && (
          <Pagination dataSource={data} total={40} defaultCurrent={1} current={page} onChange={(e) => pages(e)} />
        )}
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        {load ? (
          <Spin />
        ) : (
          currentGenres.length > 0 &&
          movieList.map((e) => {
            return <CardFilm e={e} key={e.id} currentGenres={currentGenres} setRating={setRating} />;
          })
        )}
      </MediaQuery>
    </>
  );
}
