import React, { useEffect } from 'react';
import './CardFilm.css';
import { Button } from 'antd';
import { format } from 'date-fns';

export default function Card({ e }) {
  let arr = [];
  function stars() {
    const container = document.getElementById(`${e.id}`);
    for (let i = 1; i <= Math.floor(e.vote_average); i++) {
      arr.push(i);
      container.querySelector(`.item__${i}`).classList.add('star');
      if (e.vote_average - arr[arr.length - 1] < 1 && e.vote_average - arr[arr.length - 1] !== 0) {
        let currentItem = container.querySelector(`.item__${i + 1}`);
        if (e.vote_average - arr[arr.length - 1] <= 0.19) {
          currentItem.classList.add('star__one');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.29) {
          currentItem.classList.add('star__two');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.39) {
          currentItem.classList.add('star__three');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.49) {
          currentItem.classList.add('star__fourth');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.59) {
          currentItem.classList.add('star__fifth');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.69) {
          currentItem.classList.add('star__sixth');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.79) {
          currentItem.classList.add('star__seventh');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.89) {
          currentItem.classList.add('star__eighth');
        } else if (e.vote_average - arr[arr.length - 1] <= 0.99) {
          currentItem.classList.add('star__ninth');
        }
      }
    }
  }
  useEffect(() => {
    stars();
  });
  function descriptionAbbreviation() {
    let arrString = e.overview.split(' ');
    arrString.length = 29;
    if (e.overview.split(' ').length > 29) {
      arrString.push('...');
    }
    return arrString.join(' ');
  }
  return (
    <div className="container swiper-slide" id={e.id}>
      <img className="container__poster" src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}></img>
      <div className="container__info">
        <h3>{e.original_title}</h3>
        {e.release_date ? (
          <div className="container__data">{format(new Date(e.release_date), 'MMMM d, yyyy')}</div>
        ) : null}
        <div className="container__genres">
          <Button type="default">Action</Button>
          <Button type="default">Drama</Button>
        </div>
        <p className="container__description">{descriptionAbbreviation()}</p>
        <div className="rating__items">
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
        <div className="rating__circle">
          <p className="rating__value">{e.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
