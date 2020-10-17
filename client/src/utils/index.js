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



export function Tree_DeleteNode(customTreeData, selectedNodeID ) {
  console.log("delete" + selectedNodeID)
  let continueWalk = true

  function parseData(TreeData){
    Object.keys(TreeData).forEach((index) => {
      if (continueWalk){
        if (TreeData[index]['children'] != null){
          parseData(TreeData[index]['children'])
        }
        
        if (TreeData[index]['id'] == selectedNodeID){
          continueWalk = false
          TreeData[index] = {}
        }
      }
    });

    return TreeData;
  }

  var treeWithDeletedChild = parseData(customTreeData);

  console.log("jere")
  console.log(treeWithDeletedChild)

  return treeWithDeletedChild;
}


// {
//   title: "HLRQ4",
//   id: 4,
//   text: "hlrq4 text",
//   children: [{ title: "LLRQ4", text: "llrq4 text", id: 5 }],
//   customField: "test",
// },