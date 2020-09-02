import { createElement } from 'react';
import { render } from 'react-dom';
import Home from './Home';


render(
  createElement(Home),
  document.querySelector('#root')
)