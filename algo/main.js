const arr = [1, 2, 3, null, null, 4, 5, 6, 7, 8, 9];

function buildTree(arr, i = 0) {
  if (i >= arr.length || arr[i] == null) return null;
  const node = { value: arr[i], left: null, right: null };
  node.left = buildTree(arr, 2 * i + 1);
  node.right = buildTree(arr, 2 * i + 2);
  return node;
}

buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9], 0);

const makeANode = (value) => ({ value, left: null, right: null });

function queueApproach() {
  let index = 0;
  const root = makeANode(arr[index]);
  const queue = [root];
  while (index + 1 < arr.length) {
    node = queue.shift();
    index += 1;
    if (arr[index] && index < arr.length) {
      node.left = makeANode(arr[index]);
      queue.push(node.left);
    }
    index += 1;
    if (arr[index] && index < arr.length) {
      node.right = makeANode(arr[index]);
      queue.push(node.right);
    }
  }
  return root;
}
window.tree = queueApproach();

function readLevelOrder() {
  const queue = [window.tree];
  const result = [];
  while (queue.length) {
    let node = queue.shift();
    if (node) {
      result.push(node.value);
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  console.log("Level Order", result);
}
readLevelOrder();
function readPreOrder() {
  const queue = [window.tree];
  const result = [];
  while (queue.length) {
    let node = queue.pop();
    if (node) {
      result.push(node.value);
      queue.push(node.right);
      queue.push(node.left);
    }
  }
  console.log("Pre Order", result);
}
readPreOrder();
function readPostOrder() {
  const queue = [window.tree.left];
  const result = [];
  while (queue.length) {
    let node = queue.pop();
    if (node) {
      result.push(node.value);
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  console.log("Post Order", result);
}
readPostOrder();
