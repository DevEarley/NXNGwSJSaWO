import {
  Tree
} from '@nrwl/devkit';

const filePath = `./.gitmodules`;

const repoBase = "https://github.com/DevEarley"; //NO ENDING SLASH

export default async function (tree: Tree, schema: any) {
  const name = schema.name;
  if(name == undefined)return;

  let submoduleFileContents =getSubmoduleFile(tree, name);
  if(submoduleAlreadyExists(submoduleFileContents, name)){return false}
  updateGitModuleFile(tree, name,submoduleFileContents);
}

function updateGitModuleFile(tree,name,submoduleFileContents){
  submoduleFileContents+=
`
[submodule "${name}"]
  path = apps/${name}
  url = ${repoBase}/${name}.git
`;
  tree.write(filePath, submoduleFileContents);
}

function getSubmoduleFile(tree,name){
  let contents: string = tree.read(filePath).toString();
  return contents;
}

function submoduleAlreadyExists(submoduleFileContents: string, name: any) {
  return submoduleFileContents.includes(`[submodule "${name}"]`);
}
