import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import NavBar from "../NavBar"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import {BrowserRouter} from 'react-router-dom'


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });


describe("Nav Bar", () => {
    let store;
    let testBar;
    beforeEach(() => {
        store = mockStore({});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><NavBar/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<BrowserRouter><Provider store = {store}><NavBar/></Provider></BrowserRouter>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    })
});