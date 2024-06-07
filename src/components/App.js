import React from 'react';
import { ConfigProvider } from 'antd';

import './App.css';
import FilmsList from './FilmsList/FilmsList';

const App = () => (
  <main className="main">
    <ConfigProvider
      theme={{
        token: {
          colorText: '#827E7E',
          colorBgBase: '#FAFAFA',
          colorPrimary: '#D9D9D9',
          borderRadius: 3,
          defaultHoverBg: '#4096ff',
        },
      }}
    >
      <FilmsList />
    </ConfigProvider>
  </main>
);

export default App;
