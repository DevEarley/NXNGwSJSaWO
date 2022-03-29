import {
  Tree
} from '@nrwl/devkit';

const filePath = `./apps/mfe-poc-shell/webpack.config.js`;

const repoBase = "https://nxn-gw-sj-sa-wo-static-eo2tt.ondigitalocean.app/static"; //WITHOUT ENDING SLASH

export default async function (tree: Tree, schema: any) {
  const name = schema.name;
  let submoduleFileContents = getSubmoduleFile(tree, name);
  updateWebpack(tree, name, submoduleFileContents);
}
//'my-profile': 'http://localhost:4205/remoteEntry.js',
function updateWebpack(tree, name, submoduleFileContents: string) {
  if (name == undefined) return;
  const regexString = `'${name}'\: 'http\:\/\/localhost\:.{4}\/remoteEntry\.js'`;
  const altRegexString = `"${name}"\: 'http\:\/\/localhost\:.{4}\/remoteEntry\.js'`;
  const regexWithComma = new RegExp(`${regexString},`, "gm");
  const regexWithoutComma = new RegExp(regexString, "gm");
  const altRegexWithComma = new RegExp(`${altRegexString},`, "gm");
  const altRegexWithoutComma = new RegExp(altRegexString, "gm");
  const newHost = `'${name}': '${repoBase}/${name}/remoteEntry.js'`;
  console.log(`switch to public | updateWebpack `);

  submoduleFileContents = submoduleFileContents.replace(regexWithComma, `${newHost},`);
  submoduleFileContents = submoduleFileContents.replace(regexWithoutComma, `${newHost}`);
  submoduleFileContents = submoduleFileContents.replace(altRegexWithComma, `${newHost},`);
  submoduleFileContents = submoduleFileContents.replace(altRegexWithoutComma, `${newHost}`);
  tree.write(filePath, submoduleFileContents);

}

function getSubmoduleFile(tree, name) {
  let contents: string = tree.read(filePath).toString();
  return contents;
}

