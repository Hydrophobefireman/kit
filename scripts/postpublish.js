const {postpublish} = require("./util");
const {exec} = require("child_process");
const {promisify} = require("util");

const _execPromise = promisify(exec);
function execPromise(command, tag = "$") {
  console.log(tag, command);
  return _execPromise(command);
}
async function runGitCommands() {
  try {
    await execPromise("git add --all");
    await execPromise('git commit -m "bump version"');
    await execPromise("git push origin master");
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

if (require.main === module) {
  postpublish().then(runGitCommands);
}
