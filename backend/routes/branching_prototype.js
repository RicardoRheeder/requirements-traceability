// Authenticate

const { Octokit } = require("@octokit/rest");

const crypto = require('crypto');

const octokit = new Octokit({

    auth: "ab622c841bb074a7b0e442f506f520a62f6d06c5",

});

// async function getUser(){
//     const { data }  = await octokit.request("/user");
//     return data;
// }

// data = getUser();

// data.then((data)=>{
//     console.log(data);
// });


// Get the repo
// const repo  = octokit.repos.get({
//     owner: "NotABurner",
//     repo: "Test"
// });

// repo.then((res)=>{
//     console.log(res);
// });

// Create the branch
var name = "refs/heads/Test_Branch"
var sha1 = crypto.createHash('sha1').update(name).digest('hex');

res = octokit.git.createRef({
    owner: "NotABurner",
    repo: "Test",
    ref: name,
    sha: sha1
});

// Check if it was made or if an error occurred
res.then((res1)=>{
    console.log(res1);
}).catch(err=>{
    console.log(err);
});





