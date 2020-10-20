/**
 * Returns an object of the tree with reorganised ID values
 * @param {Object} customTreeData - The tree data to parse
 * @returns The modified tree structure
 */
export function Tree_Update(customTreeData) {
  var idCounter = 1;

  function parseData(TreeData, strOrdering){
    var OrderingCounter = 1;

    Object.keys(TreeData).forEach((index) => {
      TreeData[index]['id'] = idCounter;

      TreeData[index]['order'] = strOrdering + '' + OrderingCounter + '.';
      OrderingCounter += 1;

      idCounter += 1;
      if (TreeData[index]["children"] != null && TreeData[index]["children"] != []) {
        parseData(TreeData[index]['children'], TreeData[index]['order'])
      }
    });
    return TreeData;
  }

  var treeWithCorrectIDs = parseData(customTreeData, ''); 
  // JSON.parse(JSON.stringify(parseData(customTreeData)));
  return treeWithCorrectIDs;
}

/**
 * Returns an object of the tree with each node expanded property set to true or false
 * @param {Object} customTreeData - The tree data to parse
 * @param {boolean} expanded - Whether or not the expanded nodes should be expanded
 * @returns The modified tree structure
 */
export function Tree_ExpandData(TreeData, expanded) {
  Object.keys(TreeData).forEach((index) => {
    if (TreeData[index]["children"] != null && TreeData[index]["children"] != []) {
      TreeData[index]["expanded"] = expanded;
      Tree_ExpandData(TreeData[index]["children"], expanded);
    }
  });
  return TreeData;
};

/**
 * Returns an object of the tree with a new node inserted as the child of the selected node
 * @param {Object} customTreeData - The tree data to parse
 * @param {int} selectedNodeID - The ID of the node that is currently selected
 * @returns The modified tree structure
 */
export function Tree_InsertNode(customTreeData, selectedNodeID ) {
  var newNode = {title: "New Node", id: 999, text:"Text here", expanded: false}
  function parseData(TreeData){
    Object.keys(TreeData).forEach((index) => {
      if (TreeData[index]['children'] != null){
        parseData(TreeData[index]['children'])
      }
      if (TreeData[index]['id'] == selectedNodeID){
        if (TreeData[index]['children'] == null  && TreeData[index]["children"] != []){
            TreeData[index]['children'] = []
        }
        TreeData[index]['children'].push(newNode)
        TreeData[index]['expanded'] = true;
      }
    });
    return TreeData;
  }
  var treeWithAddedChild = parseData(customTreeData);
  return treeWithAddedChild;
}

/**
 * Returns an object of the tree with the selected ID's node deleted
 * @param {Object} customTreeData - The tree data to parse
 * @param {string} attr - What HTML attribute to check should be 'id' by default
 * @param {int} targetID - The ID of the node that is currently selected (the ID of the node to be deleted)
 * @returns The modified tree structure
 */
export function Tree_DeleteNode(customTreeData, attr='id', targetID ) {
  function parseData(TreeData){
    var i = TreeData.length;
    while(i--){
      if( TreeData[i]
        && TreeData[i].hasOwnProperty(attr)
        && (TreeData[i][attr] === targetID ) ){
          TreeData.splice(i,1);
          break
      } else if (TreeData[i].hasOwnProperty('children')){
        parseData(TreeData[i]['children'])
      }
    }
    return TreeData;
  }
  var treeWithDeletedChild = parseData(customTreeData)
  return treeWithDeletedChild;
}

/**
 * Returns an object of the tree with the selected ID's title property updated
 * @param {Object} customTreeData - The tree data to parse
 * @param {int} targetID - The ID of the node that is currently selected (the ID of the node to be deleted)
 * @param {string} title - The value to update the node's title property with
 * @returns The modified tree structure
 */
export function Tree_UpdateNodeName(customTreeData, targetID, title ) {
  function parseData(TreeData){
    var i = TreeData.length;
    while(i--){
      if( TreeData[i]
        && TreeData[i].hasOwnProperty('id')
        && (TreeData[i]['id'] === targetID ) ){
          TreeData[i]['title'] = title
          break
      } else if (TreeData[i].hasOwnProperty('children')){
        parseData(TreeData[i]['children'])
      }
    }
    return TreeData;
  }
  var treeWithRenamedNode = parseData(customTreeData)
  return treeWithRenamedNode;
}

/**
 * Returns an object of the tree with the selected ID's text property updated
 * @param {Object} customTreeData - The tree data to parse
 * @param {int} targetID - The ID of the node that is currently selected (the ID of the node to be deleted)
 * @param {string} text - The value to update the node's text property with
 * @returns The modified tree structure
 */
export function Tree_UpdateNodeText(customTreeData, targetID, text ) {
  function parseData(TreeData){
    var i = TreeData.length;
    while(i--){
      if( TreeData[i]
        && TreeData[i].hasOwnProperty('id')
        && (TreeData[i]['id'] === targetID ) ){
          TreeData[i]['text'] = text
          break
      } else if (TreeData[i].hasOwnProperty('children')){
        parseData(TreeData[i]['children'])
      }
    }
    return TreeData;
  }
  var treeWithNewText = parseData(customTreeData)
  return treeWithNewText;
}