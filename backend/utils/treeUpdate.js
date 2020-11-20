function Tree_UpdateDatabaseTreeReq(databaseTree, localRequirement) {
  // If the passed requirement is a string, you need to parse the localRequirement
  const localReq = JSON.parse(localRequirement)
  const dbTree = JSON.parse(databaseTree)
  // console.log(dbTree)

  function parseDatabaseTree(TreeData, localReq, localReqUniqueID) {
    var i = TreeData.length
    while (i--) {
      if (
        TreeData[i] &&
        TreeData[i].hasOwnProperty('uniqueID') &&
        TreeData[i]['uniqueID'] === localReqUniqueID
      ) {
        TreeData[i] = localReq
        break
      } else if (TreeData[i].hasOwnProperty('children')) {
        parseDatabaseTree(TreeData[i]['children'], localReq, localReqUniqueID)
      }
    }
    return TreeData
  }

  var combinedTree = parseDatabaseTree(dbTree, localReq, localReq['uniqueID'])
  console.log('here is the updated doc')
  console.log(combinedTree)
  return combinedTree
}

module.exports = Tree_UpdateDatabaseTreeReq
