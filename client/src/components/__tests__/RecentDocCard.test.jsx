import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import RecentDocCard from "../RecentDocCard"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("RecentDocCard", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            document: {
                documents: [{title: 'testdoc', versions: [], tree: null}],
                versions: []
            },
            common: {
                selectedDocumentPanelObject: {title: 'testdoc'}
            },
            user: {
               recent_docs: []
            }
            
        });
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><RecentDocCard/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><RecentDocCard/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});