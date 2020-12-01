import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import RequirementStatusContainer from "../RequirementStatusContainer"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Requirement Status Container", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            document: {
                documents: [{title: 'testdoc', versions: [], tree: null}],
                versions: [],
                fetchedStatuses: ["teststatus"]
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
        const onFocusReq = (id) => {
            true
        }
        const updateTree = () => {
            true
        }
        const wrapper = shallow(<Provider store = {store}><RequirementStatusContainer
            key={"i"}
            requirementStatuses={["mystatus"]}
            onFocusReq={onFocusReq}
            reqID={"333"}
            updateTree={updateTree}
          /></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const onFocusReq = (id) => {
            true
        }
        const updateTree = () => {
            true
        }
        const wrapper = mount(<Provider store = {store}><RequirementStatusContainer
            key={"i"}
            requirementStatuses={["mystatus"]}
            onFocusReq={onFocusReq}
            reqID={"333"}
            updateTree={updateTree}
          /></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});