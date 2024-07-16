function createNode(value, left, right) {
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
			return array[0];
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
	console.log(sortedArray);
	console.log("Binary Tree:", root);
	prettyPrint(root);
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
createTree(testArr);
