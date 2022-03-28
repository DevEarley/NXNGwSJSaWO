import {
  Tree
} from '@nrwl/devkit';

const filePath = `./apps/mfe-poc-shell/webpack.config.js`;

const repoBase = "https://github.com/DevEarley"; //WITHOUT ENDING SLASH

export default async function (tree: Tree, schema: any) {
  const name = schema.name;
  let submoduleFileContents =getSubmoduleFile(tree, name);
  updateWebpack(tree, name, submoduleFileContents);
}
//'my-profile': 'http://localhost:4205/remoteEntry.js',
function updateWebpack(tree,name,submoduleFileContents:string){
  const regexString = `'${name}'\: 'http\:\/\/localhost\:.{4}\/remoteEntry\.js'`;
  const regexWithComma = new RegExp(`,${regexString}`,"gm");
  const regexWithoutComma = new RegExp(regexString,"gm");
  const matchesWithComma =  submoduleFileContents.match( regexWithComma);
  if(matchesWithComma == null){
    console.log(`switch to public | updateWebpack | no matches with comma `);
    const matchesWithoutComma =  submoduleFileContents.match( regexWithoutComma);
    if(matchesWithoutComma == null){
      console.log(`switch to public | updateWebpack | no matches without comma | giving up`);
      return;
    }
    else{
      console.log(matchesWithoutComma.index);
        submoduleFileContents=  submoduleFileContents.replace(regexWithoutComma,`,'${name}': '${repoBase}/${name}/remoteEntry.js'`);
       tree.write(filePath, submoduleFileContents);
    }
  }
  else{
    console.log(matchesWithComma.index);
      submoduleFileContents=  submoduleFileContents.replace(regexWithComma,`,'${name}': '${repoBase}/${name}/remoteEntry.js'`);
     tree.write(filePath, submoduleFileContents);
  }
}

function getSubmoduleFile(tree,name){
  let contents: string = tree.read(filePath).toString();
  return contents;
}
