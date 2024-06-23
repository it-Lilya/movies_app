import React, { useEffect, useState } from 'react';
import { Alert, Tabs, Input, Spin } from 'antd';
import { Online, Offline } from 'react-detect-offline';

import './App.css';
import { apikey, apiToken } from '../api';

import MoviesList from './MoviesList/MoviesList';
import { GenresProvider } from './genre-list';

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [copyData, setCopyData] = useState();
  const [currentLength, setCurrentLength] = useState(true);
  const [guestId, setGuestId] = useState();
  const [activeTabs, setActiveTabs] = useState('1');
  const [errorCopy, setErrorCopy] = useState(false);
  const debounce = require('lodash.debounce');
  const [input, setInput] = useState(
    <Input className="input__search" placeholder="Type to search..." onChange={debounce(searchChange, [2000])} />
  );
  const [ratedData, setRatedData] = useState(false);
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((r) => r.json())
      .then((d) => setGuestId(d.guest_session_id));
  }, []);
  function getMovies() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}`)
      .then((response) => {
        if (response.ok) {
          setLoad(false);
          return response.json();
        }
      })
      .then((json) => {
        setError(null);
        setCurrentLength(false);
        setData(json.results);
        setMovieList(json.results);
        setCopyData(json.results);
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
    setData([]);
    setLoad(false);
  }, []);
  function pages(e) {
    window.scrollTo(0, 0);
    setPage(e);
    if (document.querySelector('.ant-input').value.trim().length === 0) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${e}`)
        .then((response) => response.json())
        .then((body) => setData(body.results));
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${document.querySelector('.ant-input').value}&api_key=${apikey}&page=${e}`
      )
        .then((response) => response.json())
        .then((body) => setData(body.results));
    }
  }
  const item = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];
  function searchChange() {
    if (document.querySelector('.ant-input').value.trim().length !== 0) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${document.querySelector('.ant-input').value}&api_key=${apikey}&page=${page}`
      )
        .then((response) => {
          if (response.ok) {
            setLoad(false);
            return response.json();
          }
        })
        .then((json) => {
          if (json.results.length === 0) {
            setLoad(false);
            setCurrentLength(true);
            setData([]);
            setMovieList([]);
            setErrorCopy(false);
          } else {
            setCurrentLength(false);
            setLoad(false);
            setData(json.results);
            setMovieList(json.results);
          }
          if (!json.results.length) {
            setErrorCopy(true);
          }
        });
    } else {
      setLoad(false);
      setCurrentLength(false);
      getMovies();
    }
  }
  function activeTabsChange(key) {
    setActiveTabs(key.toString());
    if (key === '2') {
      setInput(null);
      setLoad(true);
      if (ratedData) {
        fetch(`https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?api_key=${apikey}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        })
          .then((res) => res.json())
          .then((body) => {
            if (body) {
              setLoad(false);
              setMovieList(body.results);
              setData(body.results);
            }
          });
      } else {
        setLoad(false);
        setInput(<Alert description="Список оцененных фильмов пуст." banner={true} showIcon={false} type="info" />);
        setMovieList([]);
        setData([]);
      }
    } else {
      setLoad(false);
      setData(copyData);
      setMovieList(copyData);
      setInput(
        <Input className="input__search" placeholder="Type to search..." onChange={debounce(searchChange, [2000])} />
      );
    }
    document
      .querySelectorAll('.ant-pagination-item')
      .forEach((el) => el.classList.remove('ant-pagination-item-active'));
    setPage(1);
  }
  async function setRating(e) {
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
    })
      .then((re) => re.json())
      .then(() => setRatedData(true));
  }
  return (
    <div className="main">
      <Online>
        <div className="films-list">
          {error ? (
            <Alert description={error} banner={true} showIcon={true} type="error" />
          ) : (
            <>
              <Tabs className="tabs" defaultActiveKey={activeTabs} items={item} onChange={activeTabsChange}></Tabs>
              {input}
              {currentLength ? (
                errorCopy ? (
                  <Alert description="Фильмы не найдены." banner={true} showIcon={false} type="info" />
                ) : (
                  <Spin />
                )
              ) : (
                <GenresProvider>
                  <MoviesList
                    data={data}
                    movieList={movieList}
                    page={page}
                    pages={pages}
                    load={load}
                    setRating={setRating}
                  />
                </GenresProvider>
              )}
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
