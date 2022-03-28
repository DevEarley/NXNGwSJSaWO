import {
  Tree
} from '@nrwl/devkit';

const filePath = `./apps/mfe-poc-shell/webpack.config.js`;

const repoBase = "https://github.com/DevEarley"; //WITHOUT ENDING SLASH

export default async function (tree: Tree, schema: any) {
  const name = schema.name;
  const port = schema.port;
  let submoduleFileContents =getSubmoduleFile(tree, name);
  updateGitModuleFile(tree, name,port,submoduleFileContents);
}

function updateGitModuleFile(tree,name,port,submoduleFileContents){
  const regex = new RegExp(`http:\/\/localhost\:*\/${name}`,"g");
  submoduleFileContents.replace(regex,`${repoBase}/${name}`);
  tree.write(filePath, submoduleFileContents);
}

function getSubmoduleFile(tree,name){
  let contents: string = tree.read(filePath).toString();
  return contents;
}

