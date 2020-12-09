import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Modal_SetRequirementStatus from "../Modal_SetRequirementStatus"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
Enzyme.configure({adapter: new Adapter() });

describe("Set req status modal component", () => {
    let store
    beforeEach(() => {
        store = mockStore({
            document: {
                documents: [{title: 'testdoc', versions: [], tree: null}],
                versions: [],
                fetchedStatuses: null,
                current_doc:{_id: "test"},
                treeData: {title: "test"}
            },
            common: {
                selectedDocumentPanelObject: {title: 'testdoc'},
                modalObject: {visible: true}
            },
            user: {
                notifications: []
            }
            
        });
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Modal_SetRequirementStatus/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><Modal_SetRequirementStatus/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});