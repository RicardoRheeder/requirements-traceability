import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Modal_AddDocument from "../Modal_AddDocument"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Add Document modal component", () => {
    let store
    beforeEach(() => {
        store = mockStore({user:{
            info: null
        }});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Modal_AddDocument/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><Modal_AddDocument/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});