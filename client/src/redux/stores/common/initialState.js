export default {
    loggedIn: true,
    treeData: [
        { title: 'HLRQ1' },
        { title: 'HLRQ2' },
        {
            title: 'HLRQ3',
            subtitle: 'subtitle',
            dragDisabled: true,
        },
        { title: 'HLRQ4', children: [{ title: 'LLRQ4' }], customField:'test' },
    ]
}