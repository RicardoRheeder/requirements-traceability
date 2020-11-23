export default {
  loggedIn: false,
  treeData: [
    { title: 'HLRQ1', text: 'hlrq1 text', id: 1, status: ["unsatisfied","WIP","review","satisfied",["user input status","blue"]] },
    { title: 'HLRQ2', text: 'hlrq2 text', id: 2 },
    {
      title: 'HLRQ3',
      // dragDisabled: true,
      text: 'hlrq3 text',
      id: 3,
    },
    {
      title: 'HLRQ4',
      id: 4,
      text: 'hlrq4 text',
      children: [{ title: 'LLRQ4', text: 'llrq4 text', id: 5 }],
      customField: 'test',
      expanded: false,
    },
    { title: 'HLRQ5', text: 'HLRQ5 text', id: 2 },
    { title: 'HLRQ6', text: 'HLRQ6 text', id: 2 },
    { title: 'HLRQ7', text: 'HLRQ7 text', id: 2 },
    { title: 'HLRQ8', text: 'HLRQ8 text', id: 2 },
    { title: 'HLRQ9', text: 'HLRQ9 text', id: 2 },
    { title: 'HLRQ10', text: 'HLRQ10 text', id: 2 },
    { title: 'HLRQ11', text: 'HLRQ11 text', id: 2 },
    { title: 'HLRQ12', text: 'HLRQ12 text', id: 2 },
  ],
  selectedID: 0,

  // mode: 0 = create document
  // mode: 1 = delete document
  // mode: 2 = invite user to document
  // mode: 3 = commit the document
  // mode: 4 = export the document
  modalObject: { visible: false, mode: 0 },
  selectedDocumentPanelObject: 0,
  currentSelectedDocVersion: '',
}
