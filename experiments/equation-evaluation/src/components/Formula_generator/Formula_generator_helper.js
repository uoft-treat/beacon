class TreeNode {
    constructor(left, right, operator) {
        this.left = left;
        this.right = right;
        this.operator = operator;
        this.toString = function () {
            return '(' + left + ' ' + operator + ' ' + right + ')';
        };
    }
}

function randomNumberRange(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

var x = ['*','-','+'];

export function buildTree(numNodes) {
    if (numNodes === 1)
        return randomNumberRange(1, 100);
    
    var numLeft = Math.floor(numNodes / 2);
    var leftSubTree = buildTree(numLeft);
    var numRight = Math.ceil(numNodes / 2);
    var rightSubTree = buildTree(numRight);
    
    var m = randomNumberRange(0, x.length);
    var str = x[m];
    return new TreeNode(leftSubTree, rightSubTree, str);
}

