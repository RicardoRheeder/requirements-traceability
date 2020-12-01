import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Modal_InviteUser from "../Modal_InviteUser"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("invite user modal component", () => {
    let store
    beforeEach(() => {
        store = mockStore({common:{
            modalObject: { visible: true},
            selectedDocumentPanelObject: {_id:"test"}
        },
        user: {info: "testinfo"}});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Modal_InviteUser/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><Modal_InviteUser/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});