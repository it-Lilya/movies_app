import React, { useEffect, useState } from 'react';
import './CardFilm.css';
import { Button } from 'antd';
import { format } from 'date-fns';
import { Rate } from 'antd';

// import Rated from './Rate/Rate';

export default function Card({ e, currentGenres, setRating }) {
  const [classes, setClasses] = useState('');
  const [cardRating, setCardRating] = useState(e.vote_average.toFixed(1));
  const [value, setValue] = useState(cardRating);
  const genresArr = e.genre_ids;
  let array = [];
  genresArr.forEach((t) => {
    array.push(currentGenres.find((el) => el.id === t));
  });
  useEffect(() => {
    if (e.rating) {
      setCardRating(e.rating);
      setValue(e.rating);
    } else {
      setCardRating(e.vote_average.toFixed(1));
      setValue(e.vote_average.toFixed(1));
    }
    if (Math.floor(cardRating) > 0 && Math.floor(cardRating) < 3) {
      setClasses('third_raiting');
    } else if (Math.floor(cardRating) >= 3 && Math.floor(cardRating) < 5) {
      setClasses('five_raiting');
    } else if (Math.floor(cardRating) >= 5 && Math.floor(cardRating) < 7) {
      setClasses('seven_raiting');
    } else {
      setClasses('above_five_raiting');
    }
  }, []);
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
        {/* <Rated setRating={setRating} e={e} /> */}
        <div className="rating__items">
          <Rate
            onChange={(val) => {
              setCardRating(val);
              setValue(val);
              setRating(val, e);
            }}
            value={value}
            count={10}
          />
        </div>
        <div className={`rating__circle ${classes}`}>
          <p className="rating__value">{cardRating}</p>
        </div>
      </div>
    </div>
  );
}
