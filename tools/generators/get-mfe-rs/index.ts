import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace';

function uppercase(val: string) {
  return val.toUpperCase();
}

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, { name: schema.name });
  const libraryRoot = readProjectConfiguration(tree, schema.name).root;

generateFiles(tree, joinPathFragments(__dirname, './files'), libraryRoot, {
  uppercase,
  name: schema.name,
});
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}