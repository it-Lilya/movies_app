import React from 'react';
import { Pagination, Spin } from 'antd';
import MediaQuery from 'react-responsive';

import CardFilm from '../CardFilm/CardFilm';

export default function MoviesList({ data, movieList, page, pages, load }) {
  return (
    <>
      <MediaQuery minWidth={769}>
        {load ? (
          <Spin />
        ) : (
          data.map((e) => {
            return <CardFilm e={e} key={e.id} />;
          })
        )}
        <Pagination dataSource={data} total={50} defaultCurrent={1} current={page} onChange={(e) => pages(e)} />
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
  );
}
