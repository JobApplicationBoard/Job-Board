/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React, {useState} from 'react';

import Board from '../client/components/Board.jsx';
import Login from './components/Login.jsx';



const App = () => {
  const [renderLogin, setRenderLogin] = useState(true);
  

  return (
    <div>
      <header>
        <div class="title-container">
          
          <h1 className="head-title">Axojobl - Navigate Your Career Waters</h1>
        </div>
      </header>
      <div className="app-container">
        { renderLogin ? <Login /> : <Board /> }
      </div>
    </div>
  );
};

export default App;
