import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import ModalComponent from "../ModalComponent"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("modal component base", () => {
    let store
    beforeEach(() => {
        store = mockStore({common:{
            modalObject: { visible: true}
        }});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><ModalComponent/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<Provider store = {store}><ModalComponent/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});