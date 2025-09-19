import { BTS } from './BTS.js'

const tree = new BTS();
tree.buildTree([
  42, 17, 93, 58, 23, 7, 81, 36, 65, 14,
  99, 1, 56, 27, 73, 88, 19, 4, 12, 31,
  68, 25, 39, 52, 95, 3, 9, 18, 21, 29,
  33, 47, 61, 70, 85, 90, 15, 6, 8, 11,
  22, 26, 38, 44, 49, 53, 60, 72, 80, 100
]);

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }

    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value);

    if (node.left !== null) {
        prettyPrint(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }
}

prettyPrint(tree.holeTree);
tree.deleteItem(39)
prettyPrint(tree.holeTree);

