export function Tree_Update(customTreeData) {
  var idCounter = 1;
  function parseData(TreeData){
    Object.keys(TreeData).forEach((index) => {
      TreeData[index]['id'] = idCounter;
      idCounter += 1;

      if (TreeData[index]['children'] != null){
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

export function Tree_InsertNode(customTreeData, selectedNodeID ) {
  console.log("insert" + selectedNodeID)

  var newNode = {title: "New Node", id: 999, text:"Text here"}
  // let updatedTree = customTreeData

  function parseData(TreeData){
    Object.keys(TreeData).forEach((index) => {
      if (TreeData[index]['children'] != null){
        parseData(TreeData[index]['children'])
      }
      
      if (TreeData[index]['id'] == selectedNodeID){
        if (TreeData[index]['children'] == null){
            TreeData[index]['children'] = []
        }
        
        TreeData[index]['children'].push(newNode)
        
        // console.log(index, TreeData[index]);
      }
    });

    return TreeData;
  }

  var treeWithAddedChild = parseData(customTreeData);
  var treeWithCorrectIDs = Tree_Update(treeWithAddedChild);
  console.log(treeWithCorrectIDs)

  return treeWithCorrectIDs;
}



export function Tree_DeleteNode(customTreeData, id ) {
  console.log("delete" + id)
}


// {
//   title: "HLRQ4",
//   id: 4,
//   text: "hlrq4 text",
//   children: [{ title: "LLRQ4", text: "llrq4 text", id: 5 }],
//   customField: "test",
// },