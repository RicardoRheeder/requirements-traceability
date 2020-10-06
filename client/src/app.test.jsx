import React from 'react';
import ReactDOM from 'react-dom';
import app from './app.jsx';    

import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'; 
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<app />', () => {
    it('renders the test component', () => {
        const testcomp = shallow(<app />);
        expect(testcomp.type).toEqual(app);
    });

});