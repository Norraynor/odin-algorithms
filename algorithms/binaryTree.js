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

	function getRoot() {
		return root;
	}
	function buildTree(array) {
		if (array.length <= 1) {
			if (array[0] == undefined) return null;
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
	}
	function largerSmallestNode(node) {
		while (node.left) {
			node = node.left;
		}
		return node;
	}

	function find(value) {
		let node = root;
		while (node) {
			if (value == node.value) {
				return node;
			} else if (value < node.value) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}

	function levelOrder(callback) {
		if (!callback) {
			throw new Error("Callback function is required");
		}
		let node = root;
		let queue = [node];
		let callbackQueue = [node];
		while (queue.length > 0) {
			node = queue[0];
			if (node.left) {
				callbackQueue.push(node.left);
				queue.push(node.left);
			}
			if (node.right) {
				callbackQueue.push(node.right);
				queue.push(node.right);
			}
			queue.shift();
		}
		callbackQueue.forEach((element) => {
			callback(element);
		});
	}
	function inOrder(callback, node = root) {
		if (!callback) {
			throw new Error("Callback function is required");
		}
		if (node) {
			inOrder(callback, node.left);
			callback(node);
			inOrder(callback, node.right);
		}
	}
	function preOrder(callback, node = root) {
		if (!callback) {
			throw new Error("Callback function is required");
		}
		if (node) {
			callback(node);
			preOrder(callback, node.left);
			preOrder(callback, node.right);
		}
	}
	function postOrder(callback, node = root) {
		if (!callback) {
			throw new Error("Callback function is required");
		}
		if (node) {
			postOrder(callback, node.left);
			postOrder(callback, node.right);
			callback(node);
		}
	}
	function height(node) {
		if (node == null) {
			return -1;
		}
		let countNode = createNode(
			node.value,
			1 + height(node.left),
			1 + height(node.right)
		);
		if (countNode.left >= countNode.right) {
			return countNode.left;
		} else {
			return countNode.right;
		}
	}

	function depth(value) {
		if (value == null) {
			return -1;
		}
		let count = 0;
		let currentNode = root;
		while (currentNode) {
			if (currentNode.value == value) {
				return count;
			} else if (currentNode.value > value) {
				count++;
				currentNode = currentNode.left;
			} else if (currentNode.value < value) {
				count++;
				currentNode = currentNode.right;
			}
		}
		return -1;
	}
	function isBalanced() {
		if (
			height(root.left) - height(root.right) > 1 ||
			height(root.left) - height(root.right) < -1
		) {
			return false;
		} else {
			return true;
		}
	}
	function rebalance() {
		let inOrderArray = [];
		inOrder((node) => {
			inOrderArray.push(node.value);
		});
		console.log(inOrderArray);
		root = buildTree(inOrderArray);
		console.log(root);
	}
	function printTree() {
		prettyPrint(root);
	}
	console.log(sortedArray);
	console.log("Binary Tree:", root);
	//printTree();

	return {
		getRoot,
		insert,
		printTree,
		deleteItem,
		find,
		levelOrder,
		preOrder,
		postOrder,
		inOrder,
		height,
		depth,
		isBalanced,
		rebalance,
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

const randomNumbersArray = (min, max, len = 1) => {
	return Array.from(
		{ length: len },
		() => Math.floor(Math.random() * (max - min + 1)) + min
	);
};

// let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let testTree = createTree(testArr);
// testTree.insert(15);
// testTree.insert(2);
// prettyPrint(testTree.root);
// testTree.deleteItem(16);
// prettyPrint(testTree.root);
// console.log(testTree.find(7));
// console.log(testTree.find(89));
// testTree.levelOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// testTree.preOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// testTree.postOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// testTree.inOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// // prettyPrint(testTree.root);
// console.log(testTree.depth(5));
// console.log(testTree.height(testTree.find(5)));
// console.log(testTree.isBalanced());

let randomTree = createTree(randomNumbersArray(1, 100, 30));
console.log(randomTree.isBalanced());
prettyPrint(randomTree.getRoot());
// randomTree.levelOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// console.log("--");
// randomTree.preOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// console.log("--");

// randomTree.postOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// console.log("--");

// randomTree.inOrder((nodeplus) => {
// 	console.log(nodeplus);
// });

//unbalance here
randomTree.insert(101);
randomTree.insert(102);
randomTree.insert(103);
randomTree.insert(104);
randomTree.insert(105);

console.log("-----");
prettyPrint(randomTree.getRoot());

console.log(randomTree.isBalanced());
console.log("-----");
randomTree.rebalance();
console.log(randomTree.isBalanced());

prettyPrint(randomTree.getRoot());

// randomTree.levelOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// console.log("--");
// randomTree.preOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// console.log("--");

// randomTree.postOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
// console.log("--");

// randomTree.inOrder((nodeplus) => {
// 	console.log(nodeplus);
// });
