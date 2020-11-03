import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import LogoutButton from "../LogoutButton"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Logout Button", () => {
    let store;
    let testButton;
    beforeEach(() => {
        store = mockStore({});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><LogoutButton/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("logs out when pressed", () => {
        //const wrapper = mount(<Provider store = {store}><LogoutButton/></Provider>);
        //wrapper.update()
        //wrapper.find('.logout-button').simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
});