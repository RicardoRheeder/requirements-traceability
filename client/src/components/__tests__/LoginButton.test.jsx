import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import LoginButton from "../LoginButton"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Login Button", () => {
    let store;
    let testButton;
    beforeEach(() => {
        store = mockStore({});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><LoginButton/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><LoginButton/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});