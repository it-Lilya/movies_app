import React, { useEffect, useState, useContext } from 'react';
import { Pagination, Spin } from 'antd';
import MediaQuery from 'react-responsive';

import CardFilm from '../CardFilm/CardFilm';
import { GenresContext } from '../genre-list';

export default function MoviesList({ data, movieList = [], page, pages, load, guestId, activeTabs }) {
  const [a, setA] = useState(true);
  const genres = useContext(GenresContext);
  const [currentGenres, setCurrentGenres] = useState([]);
  useEffect(() => {
    setCurrentGenres(genres);
  });
  useEffect(() => {
    if (activeTabs === '1') {
      setA(true);
    }
    if (activeTabs === '2') {
      setA(false);
    }
  }, [activeTabs]);
  return (
    <>
      <MediaQuery minWidth={769}>
        {load ? (
          <Spin />
        ) : (
          currentGenres.length > 0 &&
          data.map((e) => {
            return <CardFilm e={e} key={e.id} guestId={guestId} page={page} a={a} currentGenres={currentGenres} />;
          })
        )}
        <Pagination dataSource={data} total={50} defaultCurrent={1} current={page} onChange={(e) => pages(e)} />
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        {load ? (
          <Spin />
        ) : (
          currentGenres.length > 0 &&
          movieList.map((e) => {
            return <CardFilm e={e} key={e.id} guestId={guestId} page={page} a={a} currentGenres={currentGenres} />;
          })
        )}
      </MediaQuery>
    </>
  );
}
