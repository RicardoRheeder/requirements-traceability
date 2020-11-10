import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import LandingPage from "../LandingPage"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import { LoginButton } from "../../components";


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Landing Page", () => {
    let store;
    let landing;
    beforeEach(() => {
        store = mockStore({});
    });
    test("renders", () => {
        const wrapper = shallow(LandingPage());
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders with children', () => {
        const wrapper = mount(<Provider store = {store}><LandingPage/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    })
    test('renders button and logo', () => {
        const wrapper = mount(<Provider store = {store}><LandingPage/></Provider>);
        expect(wrapper.contains(<LoginButton/>)).toBe(true);
        expect(wrapper.find(".landing-logo-icon").exists()).toBe(true);
    })
});