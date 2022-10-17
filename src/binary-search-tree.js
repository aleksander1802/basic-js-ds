const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree { // бинарное древо поиска, строится по принциппу главного узла rootNode состоящее из двух веток, ветка слева  с потомками значение каждого из которых меньше чем значение rootNode, справа ветка состоящая из потомков значение каждого из которых большем чем значение rootNode

  constructor() {
    this.rootNode = null;    
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = this.rootNode;
        if(!node) { //  проверяем существует ли нода
            this.rootNode = new Node(data); //  если нет то создаем новый узел 
            return;
        }
        else{
            const searchTree = (node) => { //  если есть то начинаем сравнивать значения которые приходят в виде аргумента 
                if(data < node.data) { // если значение аргумента меньше существующего в данном узле (слева так как значение корня больше значения аргумента)
                    if(node.left == null) { //  то проверяем существует ли узел слева
                        node.left = new Node(data); // если нет то создаем узел со значением которое приходит как аргумент
                        return;
                    }
                    else if(node.left){
                        return searchTree(node.left) // иначе рекурсивно вызываем функцию поиска узла и в качестве значения аргумента передаем ноду которая уже существует
                    }
                }
                else if(data > node.data){ // если значение аргумента больше существующего в данном узле
                    if(node.right == null) { //  то также проверяем существует ли узел справа (справа так как значение корня меньше значения аргумента)
                        node.right = new Node(data); // если узел не существует то создаем узел со значением которое приходит как аргумент
                        return;
                    }
                    else if(node.right){
                        return searchTree(node.right); // иначе рекурсивно вызываем функцию поиска узла и в качестве значения аргумента передаем ноду(узел) которая уже существует
                    }
                }
                else{
                    return null; // если значение аргумента совпадет со значением узла то ничего не добавляем
                }
            }
            return searchTree(node); // вызываем рекурсивную функцию которая проверит существует ли узел со значением из аргумента
        }
  }

  has(data) { // метод проверяет сущесвует ли узел со значением аргумента
    
    let findData = this.find(data); // данная переменная хранит значение которое получаем из переданного в метод find аргумента (метод find определит существует ли узел со значением из переданного аргумента)

    if (findData) {
      return this.find(data).data === data // если значение существует в одной из веток то возвращаем true
    } 

    if (!findData) {
      return false // если значения не существует ни в одной из веток то возвращаем false
    }
    
  }

  find(data) {
    
      const returnNode = (node, data) => { // рекурсивный метод возвращает узел, первый аргумент - узел из правой или левой ветки, вторым аргументом передаем значение data, значение которе приходит из метода find
        let result = null;
        if (node) { //если узел существует, т.е. значение узла не равно null
          if (node.data === data) { // если значение узла аргумента совпадает со значением аргумента, возвращаем данный узел
            return node;
          }
          
          if (data > node.data) {
            result = returnNode(node.right, data); // если  значение аргумента больше значения узла аргумента - в рекурсивную функцию передеаем в качестве первого аргумента правого потомка (правый узел)
          } else {
            result = returnNode(node.left, data); // если  значение аргумента меньше значения узла аргумента - в рекурсивную функцию передеаем в качестве первого аргумента левого потомка (левый узел)
          }
        }
        return result;
      }
      return returnNode(this.rootNode, data);    // метод find возваращет узел со значением переданным в качестве аргумента
  }

  remove(data) { //метод удаления узла со значением аргумента data
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
      node = node.left; 
    }
    return node.data; // возвращает узел с наименьшм значением 
  }

  max(node = this.rootNode) {
    while(node.right) { // проходит по правой ветке до тех пор пока node.right === true
      node = node.right; 
    }
    return node.data; // возвращает узел с наибольшим значением 
  }
}



module.exports = {
  BinarySearchTree
};