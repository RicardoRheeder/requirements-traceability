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
  console.log(treeWithCorrectIDs)

  return treeWithCorrectIDs;
}

export function Tree_ExpandData(TreeData, expanded) {
  Object.keys(TreeData).forEach((index) => {
    if (TreeData[index]["children"] != null && TreeData[index]["children"] != []) {
      TreeData[index]["expanded"] = expanded;
      Tree_ExpandData(TreeData[index]["children"], expanded);
    }
  });

  return TreeData;
};

export function Tree_InsertNode(customTreeData, selectedNodeID ) {
  console.log("insert" + selectedNodeID)

  var newNode = {title: "New Node", id: 999, text:"Text here", expanded: false}
  // let updatedTree = customTreeData

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
        // console.log(index, TreeData[index]);
      }
    });
    return TreeData;
  }
  var treeWithAddedChild = parseData(customTreeData);
  return treeWithAddedChild;
}

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
