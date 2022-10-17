const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/



class BinarySearchTree {

  constructor() {
    this.rootNode = null;    
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = this.rootNode;
        if(!node){
            this.rootNode = new Node(data);
            return;
        }
        else{
            const searchTree = (node) => {
                if(data < node.data){
                    if(node.left == null){
                        node.left = new Node(data);
                        return;
                    }
                    else if(node.left){
                        return searchTree(node.left)
                    }
                }
                else if(data > node.data){
                    if(node.right == null){
                        node.right = new Node(data);
                        return;
                    }
                    else if(node.right){
                        return searchTree(node.right);
                    }
                }
                else{
                    return null;
                }
            }
            return searchTree(node);
        }
  }

  has(data) {
    
    let findData = this.find(data);

    if (findData) {
      return this.find(data).data === data
    } 

    if (!findData) {
      return false
    }
    
  }

  find(data) {
    
      const returnNode = (node, data) => {
        let result = null;
        if (node) {
          if (node.data === data) {
            return node;
          }
          
          if (data > node.data) {
            result = returnNode(node.right, data);
          } else {
            result = returnNode(node.left, data);
          }
        }
        return result;
      }
      return returnNode(this.rootNode, data);    
  }

  remove(data){
    const removeNode = (node, data) => {

        if(node == null) return null;
            
        if(data == node.data){
            //без потомков
            if(!node.left && !node.right)
                return null;
            //без потомков справа
            if(!node.right)
                return node.left;
            //без потомков слева
            if(!node.left)
                return node.right;
            /*есть потомки с двух сторон*/

            //выбираем самое малое значение из правой ветки
            let tempNode = node.right;
            while(tempNode.left)
                tempNode = tempNode.left;
            //ставим на место удаленной ноды
            node.data = tempNode.data;
            node.right = removeNode(node.right, tempNode.data);
            return node;
        }
        else if(data < node.data){
            node.left = removeNode(node.left, data);
            return node;
        }
        else{
            node.right = removeNode(node.right, data);
            return node;
        }
    }
    this.rootNode = removeNode(this.rootNode, data);
  }

  min(node = this.rootNode) {
    while(node.left) { // проходит по левой ветке до тех пор пока node.left === true
      node = node.left; // сдвигает узлы пока node.left === true
    }
    return node.data;
  }

  max(node = this.rootNode) {
    while(node.right) { // проходит по правой ветке до тех пор пока node.right === true
      node = node.right; // сдвигает узлы пока node.right === true
    }
    return node.data;
  }
}



module.exports = {
  BinarySearchTree
};