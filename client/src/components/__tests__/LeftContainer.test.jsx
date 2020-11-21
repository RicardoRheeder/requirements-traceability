import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import LeftContainer from "../LeftContainer"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("LeftContainer", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            document: {
                documents: [{title: 'testdoc'}]
            },
            common: {
                selectedDocumentPanelObject: {title: 'testdoc'}
            }
            
        });
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><LeftContainer/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><LeftContainer/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});