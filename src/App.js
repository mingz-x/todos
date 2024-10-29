import React, { useEffect } from 'react';
import axios from 'axios'
import './assets/css/todos.scss';
import store from './state/store';
import Insert from './component/Insert';
import List from './component/List';
import Sort from './component/Sort';

function App() {

  return (
    <div className='todolist'>
      <h2>Todos</h2>
      <div className='wrap'>
        <Insert/>
        <List/>
        <Sort/>
      </div>
    </div>
  );
}

export default App;
