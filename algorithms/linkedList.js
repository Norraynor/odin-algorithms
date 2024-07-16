function createLinkedList() {
	let list = { head: { next: null } };
	function append(value) {
		//add element to the end of list
		let node = list.head;

		while (node.next) {
			node = node.next;
		}
		node.next = createLinkedNode(value, null);
	}
	function prepend(value) {
		//add element to start of list
		let node = list.head;
		let saveNext = node.next;
		node.next = createLinkedNode(value, saveNext);
	}
	function size() {
		//return elements count
		let node = list.head;
		let i = 0;
		while (node.next) {
			node = node.next;
			i++;
		}
		return i;
	}
	function head() {
		//return first element
		return list.head.next;
	}
	function tail() {
		let node = list.head;
		//return last element
		while (node.next) {
			node = node.next;
		}
		return node;
	}
	function at(index) {
		//return node at given index
		let node = list.head;
		let i = 0;
		while (i < index) {
			node = node.next;
			i++;
		}
		return node;
	}
	function pop() {
		//removes last element
		let node = list.head;
		while (node.next.next) {
			node = node.next;
		}
		node.next = null;
	}
	function contains(value) {
		//return true if element is found otherwise false
		let node = list.head;
		while (node.next) {
			if (node.value === value) {
				return true;
			}
			node = node.next;
		}
		return false;
	}
	function find(value) {
		//return index of element containing value
		let node = list.head;
		let i = 0;
		while (node) {
			if (node.value === value) {
				return i;
			}
			node = node.next;
			i++;
		}
		return "not found";
	}
	function toString() {
		//represent linked list objects as string
		//format: (value)->(value)->null
		let node = list.head;
		let valueArr = [];
		while (node.next) {
			node = node.next;
			valueArr.push(node.value);
		}
		return valueArr.join(" -> ");
	}
	function insertAt(value, index) {
		//insert new element at given index
		let node = list.head;
		let i = 0;
		while (i < index) {
			node = node.next;
			i++;
		}
		let saveNext = node.next;
		node.next = createLinkedNode(value, saveNext);
	}
	function removeAt(index) {
		//remove element at given index
		let node = list.head;
		let i = 0;
		while (i < index) {
			node = node.next;
			i++;
		}
		let saveNext = node.next.next;
		node.next = saveNext;
		return node;
	}
	function getList() {
		return list;
	}
	return {
		getList,
		head,
		tail,
		append,
		prepend,
		size,
		at,
		pop,
		contains,
		find,
		toString,
		insertAt,
		removeAt,
	};
}

function createLinkedNode(value = null, nextNode = null) {
	return {
		value,
		next: nextNode,
	};
}

export { createLinkedList };

const newList = createLinkedList();

console.log(newList);
console.log({
	head: newList.head(),
	list: newList.getList(),
	tail: newList.tail(),
	size: newList.size(),
});
newList.append("xd");
console.log(newList.getList());
newList.append("yolo");
console.log(newList.getList());
newList.prepend("wut");
console.log(newList.getList());
console.log(newList.size());
console.log(newList.at(2));
console.log(newList.tail());
newList.append("popster");
console.log(newList.tail());
newList.pop();
console.log(newList.tail());
console.log(newList.contains("xd"));
console.log(newList.contains("mom"));
console.log(newList.find("wut"));
console.log(newList.find("dad"));
console.log(newList.toString());
newList.insertAt("penetrate", 1);
console.log(newList.getList());
newList.removeAt(1);
console.log(newList.getList());
