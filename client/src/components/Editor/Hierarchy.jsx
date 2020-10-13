import React, { Component } from 'react'

import { HierarchyTab } from '../'

import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';

export default class Hierarchy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: null,
            treeData: [
              { title: 'HLRQ1' },
              { title: 'HLRQ2' },
              {
                title: 'HLRQ3',
                subtitle: 'subtitle',
                dragDisabled: true,
              },
              { title: 'HLRQ4', children: [{ title: 'LLRQ4' }], customField:'dfsfd' },
            ],
          };
          this.updateTreeData = this.updateTreeData.bind(this);
          this.expandAll = this.expandAll.bind(this);
          this.collapseAll = this.collapseAll.bind(this);       
    }

    render() {
        const {
            treeData,
            searchString,
            searchFocusIndex,
            searchFoundCount,
        } = this.state;

        const alertNodeInfo = ({ node, path, treeIndex }) => {
            const objectString = Object.keys(node)
              .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
              .join(',\n   ');
      
            global.alert(
              'Info passed to the icon and button generators:\n\n' +
                `node: {\n   ${objectString}\n},\n` +
                `path: [${path.join(', ')}],\n` +
                `treeIndex: ${treeIndex}`
            );
        };
      
        const selectPrevMatch = () =>
            this.setState({
              searchFocusIndex:
                searchFocusIndex !== null
                  ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
                  : searchFoundCount - 1,
            });
      
        const selectNextMatch = () =>
            this.setState({
              searchFocusIndex: searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0,
            });

        return (
            <div className="root-div" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {/* Tree Utilities */}
                <div className="tree-utilities" >
                    <div>Hierarchy</div>

                    {/* Expand/Collapse buttons */}
                    <div>
                        <button onClick={this.expandAll}>Expand All</button>
                        <button onClick={this.collapseAll}>Collapse All</button>
                    </div>
                    <form
                        style={{ display: 'inline-block' }}
                        onSubmit={event => {
                            event.preventDefault();
                        }}
                    >
                        <label htmlFor="find-box">
                            <div className="search-panel">
                                Search:&nbsp;
                                {/* Search box */}
                                <input
                                    id="find-box"
                                    className="search-box"
                                    type="text"
                                    value={searchString}
                                    onChange={event =>
                                        this.setState({ searchString: event.target.value })
                                    }
                                />

                                {/* '<' and '>' buttons */}
                                <button
                                    type="button"
                                    disabled={!searchFoundCount}
                                    onClick={selectPrevMatch}
                                >
                                    &lt;
                                </button>
                                <button
                                    type="submit"
                                    disabled={!searchFoundCount}
                                    onClick={selectNextMatch}
                                >
                                    &gt;
                                </button>

                                {/* Search results */}
                                <span>
                                    &nbsp;
                                    {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
                                    &nbsp;/&nbsp;
                                    {searchFoundCount || 0}
                                </span>
                            </div>
                        </label>
                    </form>
                </div>

                {/* Tree Visual */}
                <div className="tree-visual" >
                <SortableTree
                    theme={FileExplorerTheme}
                    treeData={treeData}
                    onChange={this.updateTreeData}
                    rowHeight ={40}
                    canDrag={({ node }) => !node.dragDisabled}
                    
                    searchQuery={searchString}
                    searchFocusOffset={searchFocusIndex}
                    searchFinishCallback={matches =>
                        this.setState({
                            searchFoundCount: matches.length,
                            searchFocusIndex:
                            matches.length > 0 ? searchFocusIndex % matches.length : 0,
                        })
                    }

                    generateNodeProps={
                        rowInfo => {console.log(rowInfo); return ({
                            buttons: [
                                <button onClick={() => alertNodeInfo(rowInfo)}>i</button>,
                            ],
                            listIndex: 0,
                            lowerSiblingCounts: [],
                            className: "tree-node-styling" + (rowInfo.node.customField ? ' type-a' : ""),
                        })}
                    }
                />
                </div>
            </div>
        )
    }

    updateTreeData(treeData) {
        this.setState({ treeData });
      }
    
      expand(expanded) {
        this.setState({
          treeData: toggleExpandedForAll({
            treeData: this.state.treeData,
            expanded,
          }),
        });
      }
    
      expandAll() {
        this.expand(true);
      }
    
      collapseAll() {
        this.expand(false);
      }
}
