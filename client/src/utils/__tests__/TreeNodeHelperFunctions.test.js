import React from "react"
import Enzyme, { shallow, mount} from "enzyme"
import * as TreeFuncts from "../TreeNodeHelperFunctions"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"

const sinon = require("sinon")

const sandbox = sinon.createSandbox();
const mockStore = configureStore([])
Enzyme.configure({adapter: new Adapter() });

var testTree = []

describe("Tree Helper Functions", () =>{
    beforeEach(() => {
        testTree = [
            { title: "HLRQ1", text: "hlrq1 text", id: 1,expanded: false},
            { title: "HLRQ2", text: "hlrq2 text", id: 2, expanded: false },
            {
            title: "HLRQ3",
            id: 3,
            text: "hlrq3 text",
            children: [{ title: "LLRQ3", text: "llrq3 text", id: 4, expanded: false },],
            expanded: false
            }
        ]
        
    });
    test("High level Node name is correctly updated", ()=> {
        var testsap = TreeFuncts.Tree_UpdateNodeName(testTree, 1, "titleChanged");
        expect(testsap[0]['title']).toBe("titleChanged");
    });
    test("Low level node name is correctly updated", ()=>{
        var testsap = TreeFuncts.Tree_UpdateNodeName(testTree, 4, "titleChanged");
        expect(testsap[2]['children'][0]['title']).toBe("titleChanged"); 
    });
    test("High level node text is correctly updated", () => {
        var testsap = TreeFuncts.Tree_UpdateNodeText(testTree, 1, "text changed")
        expect(testsap[0]['text']).toBe("text changed");
    });
    test("Low level node text is correctly updated", () => {
        var testsap = TreeFuncts.Tree_UpdateNodeText(testTree, 4, "text changed")
        expect(testsap[2]['children'][0]['text']).toBe("text changed");
    });
    test("High level node text is deleted", () => {
        var testsap = TreeFuncts.Tree_DeleteNode(testTree, 'id', 3);
        expect(testsap).toStrictEqual([
            { title: "HLRQ1", text: "hlrq1 text", id: 1,expanded: false},
            { title: "HLRQ2", text: "hlrq2 text", id: 2, expanded: false }
            
        ]);
    });
    test("Low level node is deleted", () => {
        var testsap = TreeFuncts.Tree_DeleteNode(testTree, 'id', 4);
        expect(testsap).toStrictEqual(
            [
                { title: "HLRQ1", text: "hlrq1 text", id: 1,expanded: false},
                { title: "HLRQ2", text: "hlrq2 text", id: 2, expanded: false },
                {
                title: "HLRQ3",
                id: 3,
                text: "hlrq3 text",
                children: [],
                expanded: false
                }
            ]
        );
    });
    test("Child node is inserted", () => {
        var testsap = TreeFuncts.Tree_InsertNode(testTree, 1);
        expect(testsap[0].hasOwnProperty('children')).toBe(true);
        expect(testsap[0]['children'][0]['id']).toBe(999);
    })

    test("tree is properly expanded", () => {
        var testsap = TreeFuncts.Tree_ExpandData(testTree, true);
        expect(testsap[2]['expanded']).toBe(true);
        expect(testsap[0]['expanded']).toBe(false);
    });

    test("tree is properly updated", () => {
        var testsap = TreeFuncts.Tree_InsertNode(testTree,1);
        testsap = TreeFuncts.Tree_Update(testsap);
        expect(testsap[0]['children'][0]['id']).toBe(2);
    });

    
    

    
})