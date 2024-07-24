function createNode(value, left = null, right = null) {
	return {
		value,
		left,
		right,
	};
}

function createTree(arr) {
	let uniqueValues = arr.filter(function (value, index, array) {
		return array.indexOf(value) === index;
	});
	let sortedArray = uniqueValues.sort((a, b) => a - b);

	let root = buildTree(sortedArray);

	function buildTree(array) {
		if (array.length <= 1) {
			return createNode(array[0]);
		}
		let middleIndex = Math.ceil(array.length / 2);
		let leftArr = array.slice(0, middleIndex);
		let rightArr = array.slice(middleIndex + 1);
		let rootNode = createNode(
			array[middleIndex],
			buildTree(leftArr),
			buildTree(rightArr)
		);
		return rootNode;
	}
	function insert(value) {
		let node = root;
		if (value == node.value) {
			console.error("value exists");
			return false;
		}
		while (node) {
			if (value < node.value) {
				//go left
				//if left is null then add node with this value else go on
				if (node.left) {
					node = node.left;
				} else {
					node.left = createNode(value);
					return true;
				}
			} else {
				//go right
				//if right is null then add else go on
				if (node.right) {
					node = node.right;
				} else {
					node.right = createNode(value);
					return true;
				}
			}
		}
	}
	function deleteItem(value, node = root) {
		if (node === null) {
			return node;
		}
		if (value == node.value) {
			if (!node.left && !node.right) {
				return (node = null);
			} else if (!node.left.value) {
				node = node.right;
				return node;
			} else if (!node.right.value) {
				node = node.left;
				return node;
			} else {
				let tempNode = largerSmallestNode(node.right);
				node.value = tempNode.value;

				node.right = deleteItem(tempNode.value, node.right);
				return node;
			}
		} else if (value < node.value) {
			node.left = deleteItem(value, node.left);
			return node;
		} else {
			node.right = deleteItem(value, node.right);
			return node;
		}

		// console.error("item to delete not found");
		return false;
	}
	function largerSmallestNode(node) {
		while (node.left) {
			node = node.left;
		}
		return node;
	}
	function printTree() {
		prettyPrint(root);
	}
	console.log(sortedArray);
	console.log("Binary Tree:", root);
	//printTree();

	return {
		root,
		insert,
		printTree,
		deleteItem,
	};
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let testTree = createTree(testArr);
testTree.insert(15);
testTree.insert(2);
prettyPrint(testTree.root);
testTree.deleteItem(4);
prettyPrint(testTree.root);
