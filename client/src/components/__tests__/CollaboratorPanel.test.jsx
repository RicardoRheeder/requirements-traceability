import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import CollaboratorPanel from "../CollaboratorPanel"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("CollaboratorPanel", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            document: {
                documents: [{title: 'testdoc', versions: [], tree: null}],
                versions: [],
                current_doc: {collaborators: [
                    { _id: '111', username: 'testUser1' },
                    { _id: '222', username: 'testUser2' },
                  ]}
            },
            common: {
                selectedDocumentPanelObject: {title: 'testdoc'}
            },
            user: {
                notifications: []
            }
            
        });
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><CollaboratorPanel/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><CollaboratorPanel/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});