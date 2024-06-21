import React from 'react';

import { apiToken } from '../../../api';

export default function Rate({ guestId }) {
  async function click(e) {
    const raiting = parseInt(e.target.className.match(/\d+/));
    const movieId = e.target.closest('.container').id;
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        value: raiting,
      }),
    }).then((re) => re.json());
  }
  return (
    <div className="rating__items" onClick={(e) => click(e)}>
      <div className="rating__item item__1"></div>
      <div className="rating__item item__2"></div>
      <div className="rating__item item__3"></div>
      <div className="rating__item item__4"></div>
      <div className="rating__item item__5"></div>
      <div className="rating__item item__6"></div>
      <div className="rating__item item__7"></div>
      <div className="rating__item item__8"></div>
      <div className="rating__item item__9"></div>
      <div className="rating__item item__10"></div>
    </div>
  );
}
