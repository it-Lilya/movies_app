import React, { useEffect, useState } from 'react';
import { Alert, Tabs, Input } from 'antd';
import { Online, Offline } from 'react-detect-offline';

import './App.css';
import MoviesList from './MoviesList/MoviesList';

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [copyData, setCopyData] = useState();
  const [currentLength, setCurrentLength] = useState(true);
  const debounce = require('lodash.debounce');
  const apiKey = '60dc1693c2a318aa9e16ce752d4ea508';
  function getMovies() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
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
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${e}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data.results);
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${document.querySelector('.ant-input').value}&api_key=${apiKey}&page=${e}`
      )
        .then((response) => response.json())
        .then((json) => setData(json.results));
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
    setLoad(true);
    if (document.querySelector('.ant-input').value.trim().length !== 0) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${document.querySelector('.ant-input').value}&api_key=${apiKey}&page=${page}`
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
          } else {
            setCurrentLength(false);
            setLoad(false);
          }
          setData(json.results);
          setMovieList(json.results);
        });
    } else {
      setLoad(false);
      setData(copyData);
      setCurrentLength(false);
    }
  }
  return (
    <div className="main">
      <Online>
        <div className="films-list">
          {error ? (
            <Alert description={error} banner={true} showIcon={true} type="error" />
          ) : (
            <>
              <Tabs className="tabs" defaultActiveKey="1" items={item}></Tabs>
              <Input
                className="input__search"
                placeholder="Type to search..."
                onChange={debounce(searchChange, [2000])}
              />
              {currentLength ? (
                <Alert description="Фильмы не найдены." banner={true} showIcon={false} type="info" />
              ) : (
                <MoviesList data={data} movieList={movieList} page={page} pages={pages} load={load} />
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
