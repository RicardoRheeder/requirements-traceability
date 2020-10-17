// Returns an object of the tree with reorganised ID values
export function Tree_Update(customTreeData) {
  var idCounter = 1;
  function parseData(TreeData){
    Object.keys(TreeData).forEach((index) => {
      TreeData[index]['id'] = idCounter;
      idCounter += 1;

      if (TreeData[index]["children"] != null && TreeData[index]["children"] != []) {
        parseData(TreeData[index]['children'])
      }

      console.log(index, TreeData[index]);
    });
    return TreeData;
  }
  var treeWithCorrectIDs = parseData(customTreeData);
  return treeWithCorrectIDs;
}

// Returns an object of the tree with each node expanded OR each node collapsed
export function Tree_ExpandData(TreeData, expanded) {
  Object.keys(TreeData).forEach((index) => {
    if (TreeData[index]["children"] != null && TreeData[index]["children"] != []) {
      TreeData[index]["expanded"] = expanded;
      Tree_ExpandData(TreeData[index]["children"], expanded);
    }
  });
  return TreeData;
};

// Returns an object of the tree with a new node inserted as the child of the selected node
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

// Returns an object of the tree with the selected ID's node deleted
export function Tree_DeleteNode(customTreeData, attr, targetID ) {
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


// Returns an object of the tree with the selected ID's node deleted
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
  var treeWithDeletedChild = parseData(customTreeData)
  return treeWithDeletedChild;
}