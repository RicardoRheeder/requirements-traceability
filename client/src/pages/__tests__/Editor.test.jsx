import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Editor from "../Editor"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Editor", () => {
    let store;
    let editor;
    beforeEach(() => {
        store = mockStore({common:{
            treeData: [],
            selectedID: [],
        }});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Editor/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><Editor/></Provider>);
        expect(wrapper.exists()).toBe(true);
    })
});