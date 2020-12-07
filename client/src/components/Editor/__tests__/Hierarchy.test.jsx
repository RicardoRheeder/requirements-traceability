import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import Hierarchy from "../Hierarchy"
import {nodecontainer} from "../Hierarchy"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"


const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

describe("Hierarchy", () => {
    let store;
    let testHier;
    beforeEach(() => {
        store = mockStore({
            splitpos: 150,
            common:{
                
                treeData:  [
                    { title: "HLRQ1", text: "hlrq1 text", id: 1},
                    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
                    {
                    title: "HLRQ3",
                    id: 3,
                    text: "hlrq3 text",
                    children: [{ title: "LLRQ3", text: "llrq3 text", id: 3 }],
                    }
                ],
                selectedID: 3,
                
            },
            document: {
                current_doc: {versions: ["versionName=0.0", "versionName=1.1"],}
            },
            user:{
                info:{
                    _id: "test"
                }
            }
        });
        JSON.parse = jest.fn().mockImplementation(() => {
            return {versionName: "1.1"}
        });
    });
    test("renders", () => {
        const wrapper = shallow(<Provider store = {store}><Hierarchy/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test("renders with children", () => {
        const scrollMock = () => {
            true
        }
        const setIdMock = (num) => {
            true
        }
        const wrapper = mount(<Provider store = {store}><Hierarchy scrollToElementFunction={scrollMock
          }
          setSelectedNodeId={setIdMock}
          selectedNodeId={1}/></Provider>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    
    
    
});