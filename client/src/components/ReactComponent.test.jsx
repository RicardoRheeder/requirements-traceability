import React from 'react';
import ReactDOM from 'react-dom';
import ReactComponent from './ReactComponent.jsx';    

import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'; 
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('test component renders', () =>{
    shallow(<ReactComponent/>)
})