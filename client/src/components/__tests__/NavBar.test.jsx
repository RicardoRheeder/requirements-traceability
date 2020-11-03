import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import NavBar from "../NavBar"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import { BrowserRouter as Router } from 'react-router-dom';


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
    test("calls navBar function to Home", () => {
        const wrapper = mount(<Router><Provider store = {store}><NavBar/></Provider></Router>);
        wrapper.update()
        wrapper.find('.nav-link').at(0).simulate('click')
        expect(wrapper).toMatchSnapshot();
    });
    test("calls navBar function to Editor", () => {
        const wrapper = mount(<Router><Provider store = {store}><NavBar/></Provider></Router>);
        wrapper.update()
        wrapper.find('.nav-link').at(1).simulate('click')
        expect(wrapper).toMatchSnapshot();
    });
});