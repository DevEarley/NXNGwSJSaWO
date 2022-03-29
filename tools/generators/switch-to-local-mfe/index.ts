import {
  Tree
} from '@nrwl/devkit';

const filePath = `./apps/mfe-poc-shell/webpack.config.js`;

const repoBase = "https://nxn-gw-sj-sa-wo-static-eo2tt.ondigitalocean.app/static"; //WITHOUT ENDING SLASH
//'my-profile': 'http://localhost:4205/remoteEntry.js',

export default async function (tree: Tree, schema: any) {
  const name = schema.name;
  const port = schema.port;
  console.log(schema)
  if (name == undefined || port == undefined) return;
  let submoduleFileContents = getSubmoduleFile(tree);
  updateWebpack(tree, name, port, submoduleFileContents);
}

function updateWebpack(tree, name, port, submoduleFileContents: string) {
  const target = `'${name}': '${repoBase}/${name}/remoteEntry.js'`;
  const newHost = `'${name}': 'http://localhost:${port}/remoteEntry.js'`;
  console.log(`switch to local | updateWebpack | looking for ,${target}`);

  const matchesWithComma = submoduleFileContents.includes("," + target);
  if (matchesWithComma == true) {
    console.log(`switch to local | found match with comma`);
    submoduleFileContents = submoduleFileContents.replace(`,${target}`, `,${newHost}`);
  }
  else {
    console.log(`switch to local | no match with comma`);
    const matchesWithoutComma = submoduleFileContents.includes(target);
    if (matchesWithoutComma == true) {
      console.log(`switch to local | found match without comma`);
      submoduleFileContents = submoduleFileContents.replace(target, newHost);
    }
    else {
      console.log(`switch to local | no match without comma | giving up`);
    }
  }

  tree.write(filePath, submoduleFileContents);
}

function getSubmoduleFile(tree) {
  let contents: string = tree.read(filePath).toString();
  return contents;
}

