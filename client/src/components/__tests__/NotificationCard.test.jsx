import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import NotificationCard from "../NotificationCard"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";


Enzyme.configure({adapter: new Adapter() });

describe("NotificationCard", () => {
    
    test("renders", () => {
        const wrapper = shallow(<NotificationCard notification = "test"/>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<NotificationCard notification = "test"/>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});