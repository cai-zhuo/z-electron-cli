import Home from './pages/Home';
import { createElement } from 'react';
import { render } from 'react-dom';


render(
  createElement(Home),
  document.querySelector('#root')
)