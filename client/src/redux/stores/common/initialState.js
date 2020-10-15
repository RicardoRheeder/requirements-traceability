export default {
    loggedIn: true,
    treeData: [
        { title: 'HLRQ1', text: 'hlrq1 text',  },
        { title: 'HLRQ2', text: 'hlrq2 text' },
        {
            title: 'HLRQ3',
            subtitle: 'subtitle',
            dragDisabled: true, 
            text: 'hlrq3 text'
        },
        { title: 'HLRQ4', text: 'hlrq4 text', children: [{ title: 'LLRQ4', text: 'llrq4 text' }], customField:'test' },
    ]
}