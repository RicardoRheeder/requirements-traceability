// Declare octokit
const { Octokit } = require("@octokit/rest");

// Add authorization token
const octokit = new Octokit({
    auth: "ab622c841bb074a7b0e442f506f520a62f6d06c5"});

// Function must be async to use await
async function push ({ owner, repo, base, head, changes }) {
  let response

  if (!base) {
    response = await octokit.repos.get({ owner, repo })
    base = response.data.default_branch
  }

  // Get SHA of the latest commit in the target branch
  response = await octokit.repos.listCommits({
    owner,
    repo,
    sha: base,
    per_page: 1
  })
  let latestCommitSha = response.data[0].sha
  const treeSha = response.data[0].commit.tree.sha

  // Create a tree with the SHA of the tree of the latest commit as a base
  response = await octokit.git.createTree({
    owner,
    repo,
    base_tree: treeSha,
    tree: Object.keys(changes.files).map(path => {
      const mode = "100644"
      return {
        path,
        mode,
        content: changes.files[path]
      }
    })
  })
  const newTreeSha = response.data.sha

  // Create the commit using the SHA of the created tree
  response = await octokit.git.createCommit({
    owner,
    repo,
    message: changes.commit,
    tree: newTreeSha,
    parents: [latestCommitSha]
  })
  latestCommitSha = response.data.sha

  // Update the reference of the target branch with the SHA of the created commit
  return await octokit.git.updateRef({
    owner,
    repo,
    sha: latestCommitSha,
    ref: `heads/${head}`,
    force: true
  })
}

// Main function, repo information and file changes are hardcoded
const main = async () => {
  const owner = 'NotABurner'
  const repo = 'test'
  const base = 'main'
  const head = 'main'
  const changes = {
    files: {
      'README.md': 'Commit from octokit prototype, cleaned and commented version'
    },
    commit: 'Update from octokit'
  }
  return await push({ owner, repo, base, head, changes })
}

main()
