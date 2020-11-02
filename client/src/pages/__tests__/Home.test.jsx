import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Home from "../Home"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import {LeftContainer} from "../../components";


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Homepage", () => {
    let store;
    let homepage;
    beforeEach(() => {
        store = mockStore({ user :{
            info: "test",
            errorMessage: null
        },
        document: {
            documents: []
        }
    });
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Home/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><Home/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    })
    test("renders left container", () => {
        const wrapper = mount(<Provider store = {store}><Home/></Provider>);
        expect(wrapper.contains(<LeftContainer />)).toBe(true);
    });
    test("renders banner image", () => {
        const wrapper = mount(<Provider store = {store}><Home/></Provider>);
        expect(wrapper.find(".home-logo-banner").exists()).toBe(true);
    })
});