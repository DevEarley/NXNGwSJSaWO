import {
  Tree
} from '@nrwl/devkit';

const filePath = `./apps/mfe-poc-shell/webpack.config.js`;

const repoBase = "https://github.com/DevEarley"; //WITHOUT ENDING SLASH

export default async function (tree: Tree, schema: any) {
  const name = schema.name;
  const port = schema.port;
  let submoduleFileContents =getSubmoduleFile(tree, name);
  updateWebpack(tree, name,port,submoduleFileContents);
}
//'my-profile': 'http://localhost:4205/remoteEntry.js',
//TODO account for comma
function updateWebpack(tree,name,port,submoduleFileContents){
  console.log(`switch to local | updateWebpack | ,'${name}': '${repoBase}/remoteEntry.js'`, `,'${name}': 'http://localhost:${port}/remoteEntry.js'`)
  submoduleFileContents.replace(`',${name}': '${repoBase}/remoteEntry.js'`, `,'${name}': 'http://localhost:${port}/remoteEntry.js'`);
  tree.write(filePath, submoduleFileContents);
}

function getSubmoduleFile(tree,name){
  let contents: string = tree.read(filePath).toString();
  return contents;
}

