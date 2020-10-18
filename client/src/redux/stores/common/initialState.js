export default {
  loggedIn: false,
  treeData: [
    { title: "HLRQ1", text: "hlrq1 text", id: 1},
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
    {
      title: "HLRQ3",
      // dragDisabled: true,
      text: "hlrq3 text",
      id: 3
    },
    {
      title: "HLRQ4",
      id: 4,
      text: "hlrq4 text",
      children: [{ title: "LLRQ4", text: "llrq4 text", id: 5 }],
      customField: "test",
      expanded :false,
    },
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
    { title: "test", text: "hlrq2 text", id: 2 },
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
    { title: "HLRQ2", text: "hlrq2 text", id: 2 },
  ],
  selectedID: 0,
};
