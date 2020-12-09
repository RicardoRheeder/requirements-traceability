import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import CollaboratorIcon from "../CollaboratorIcon"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";


Enzyme.configure({adapter: new Adapter() });

describe("NotificationCard", () => {
    
    test("renders", () => {
        const wrapper = shallow(<CollaboratorIcon 
            key={"i"}
            username={"test"}
            color={5}
            smallIcon={false}/>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const wrapper = mount(<CollaboratorIcon 
            key={"i"}
            username={"test"}
            color={5}
            smallIcon={false}/>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});