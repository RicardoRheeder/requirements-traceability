import React from 'react';
import ReactDOM from 'react-dom';
import {add} from './app.jsx';    

import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json'; 
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

console.log(add(1,3))

test('add function', () =>{
    const val = add(1,2)
    expect(val).toBe(3)
});