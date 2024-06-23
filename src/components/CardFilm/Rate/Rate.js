import React from 'react';

export default function Rate({ setRating }) {
  return (
    <div className="rating__items" onClick={(e) => setRating(e)}>
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
