const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
 class Stack { // стек работает по принципу Last In First Out" (LIFO), то есть "последним зашел, первым вышел"

  constructor() {
    this.items = []
  }

  push(item) { // метод добавляет новый элемент

    this.items.push(item)

  }

  pop() { // метод удаляет последний элемент

      return this.items.pop()

  }

  peek() { // возвращает последний добавленный элемент, если такой есть иначе возвращает null если массив пустой

    return this.items.length === 0 ? null : this.items[this.items.length - 1]

  }
}

module.exports = {
  Stack
};
