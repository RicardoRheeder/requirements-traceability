import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Modal_CommitDocument from "../Modal_CommitDocument"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("commit document modal component", () => {
    let store
    beforeEach(() => {
        store = mockStore({
            document: {
                documents: [{title: 'testdoc', versions: [], tree: null}],
                versions: [],
                current_doc: {id: "333",
                    collaborators: [
                    { _id: '111', username: 'testUser1' },
                    { _id: '222', username: 'testUser2' },
                  ]}
            },
            common: {
                selectedDocumentPanelObject: {title: 'testdoc'},
                treeData: {test:"test"}
            },
            user: {
                info: "testinfo",
                notifications: []
            }
            
        });
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Modal_CommitDocument/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><Modal_CommitDocument/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});