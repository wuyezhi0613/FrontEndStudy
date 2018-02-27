import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './js/TodoList';
import store from './js/TodoStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoList />, document.getElementById('root'));
registerServiceWorker();
