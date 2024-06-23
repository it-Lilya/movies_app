import React, { useEffect, useState } from 'react';
import './CardFilm.css';
import { Button } from 'antd';
import { format } from 'date-fns';

import Rate from './Rate/Rate';

export default function Card({ e, currentGenres, setRating }) {
  const [classes, setClasses] = useState('');
  const [cardRating, setCardRating] = useState(false);
  const genresArr = e.genre_ids;
  let array = [];
  genresArr.forEach((t) => {
    array.push(currentGenres.find((el) => el.id === t));
  });
  useEffect(() => {
    if (e.rating) {
      setCardRating(true);
      stars(e.rating);
    } else {
      stars(e.vote_average);
    }
  }, []);
  let arr = [];
  function stars(r) {
    const container = document.getElementById(`${e.id}`);
    container.querySelectorAll('.rating__item').forEach((el) => {
      el.classList.remove('star');
    });
    container.querySelector(`.item__${r.toFixed()}`).classList.add('star');
    for (let i = 1; i <= Math.floor(r); i++) {
      arr.push(i);
      container.querySelector(`.item__${i}`).classList.add('star');
      if (r - arr[arr.length - 1] < 1 && r - arr[arr.length - 1] !== 0) {
        let currentItem = container.querySelector(`.item__${i + 1}`);
        if (r >= 0 && (r % 1).toFixed(1) < 0.2) {
          currentItem.classList.add('star__one');
        } else if ((r % 1).toFixed(1) >= 0.2 && (r % 1).toFixed(1) < 0.3) {
          currentItem.classList.add('star__two');
        } else if ((r % 1).toFixed(1) >= 0.3 && (r % 1).toFixed(1) < 0.4) {
          currentItem.classList.add('star__three');
        } else if ((r % 1).toFixed(1) >= 0.4 && (r % 1).toFixed(1) < 0.5) {
          currentItem.classList.add('star__fourth');
        } else if ((r % 1).toFixed(1) >= 0.5 && (r % 1).toFixed(1) < 0.6) {
          currentItem.classList.add('star__fifth');
        } else if ((r % 1).toFixed(1) >= 0.6 && (r % 1).toFixed(1) < 0.7) {
          currentItem.classList.add('star__sixth');
        } else if ((r % 1).toFixed(1) >= 0.7 && (r % 1).toFixed(1) < 0.8) {
          currentItem.classList.add('star__seventh');
        } else if ((r % 1).toFixed(1) >= 0.8 && (r % 1).toFixed(1) < 1) {
          currentItem.classList.add('star__eighth');
        } else if ((r % 1).toFixed(1) >= 1) {
          currentItem.classList.add('star__one');
        }
      }
      if (Math.floor(r).toFixed() > 0 && Math.floor(r).toFixed() < 3) {
        setClasses('third_raiting');
      } else if (Math.floor(r).toFixed() >= 3 && Math.floor(r).toFixed() < 5) {
        setClasses('five_raiting');
      } else if (Math.floor(r).toFixed() >= 5 && Math.floor(r).toFixed() < 7) {
        setClasses('seven_raiting');
      } else {
        setClasses('above_five_raiting');
      }
    }
  }
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
          {array.map((o) => {
            return (
              <Button type="default" key={o.id + Math.random()}>
                {o.name}
              </Button>
            );
          })}
        </div>
        <p className="container__description">{descriptionAbbreviation()}</p>
        <Rate setRating={setRating} />
        <div className={`rating__circle ${classes}`}>
          <p className="rating__value">{cardRating ? e.rating : e.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
