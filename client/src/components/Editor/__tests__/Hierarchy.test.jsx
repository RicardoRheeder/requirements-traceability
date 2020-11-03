import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Hierarchy from "../Hierarchy"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Hierarchy", () => {
    let store;
    let testHier;
    beforeEach(() => {
        store = mockStore({});
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Hierarchy/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("calls Hierarchy function expandAll", () => {
        //const wrapper = mount(<Provider store = {store}><Hierarchy/></Provider>);
        //wrapper.update()
        //wrapper.find('.hierarchy-button').at(0).simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
    test("calls Hierarchy function collapseAll", () => {
        //const wrapper = mount(<Provider store = {store}><Hierarchy/></Provider>);
        //wrapper.update()
        //wrapper.find('.hierarchy-button').at(1).simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
    test("calls Hierarchy function insertNode", () => {
        //const wrapper = mount(<Provider store = {store}><Hierarchy/></Provider>);
        //wrapper.update()
        //wrapper.find('.hierarchy-button').at(2).simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
    test("calls Hierarchy function deleteNode", () => {
        //const wrapper = mount(<Provider store = {store}><Hierarchy/></Provider>);
        //wrapper.update()
        //wrapper.find('.hierarchy-button').at(3).simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
    test("calls Hierarchy function for < button", () => {
        //const wrapper = mount(<Provider store = {store}><Hierarchy/></Provider>);
        //wrapper.update()
        //wrapper.find('Button[type="button"').simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
    test("calls Hierarchy function for > submit", () => {
        //const wrapper = mount(<Provider store = {store}><Hierarchy/></Provider>);
        //wrapper.update()
        //wrapper.find('Button[type="submit"').simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
    test("calls Hierarchy function alerNodeInfo", () => {
        //const wrapper = mount(<Provider store = {store}><Hierarchy/></Provider>);
        //wrapper.update()
        //wrapper.find('.node-info-button').simulate('click')
        //expect(wrapper).toMatchSnapshot();
    });
});