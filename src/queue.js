const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */



class Queue { // очередь работате по принципу @First In First Out" (LIFO), то есть "первым зашел, первым вышел"

  constructor() {
      // this.items = []; 
      this.head = null;
      this.length = 0;   
  }

  getUnderlyingList() { // метод вернёт первый элемент в очереди || null 
    
    // let obj = {
    //   value: this.firstItem,
    //   next: this.lastItem
    // }

    // return obj

    return this.head 
     
  }

  enqueue(item) {
    if (this.length === 0) { // изначально длина нашей очереди равна 0
      this.head = new ListNode(item) // изначально наш класс Queue имеет поле head со значением null, и мы знаем что длина нашей очереди равна нулю, поэтому полю head мы присвеиваем новый объект экземпляра класса ListNode с полями value и next,  число, которое мы передаем в качестве аргумента новому экземпляру будет являться значение поля value
    } else { // если у нас уже создан экземпляр класса и поле head имеет значение
      let current = this.head; // то в переменной current мы хранием наш новый экземпляр класса ListNode
      while (current.next) {
        current = current.next;
      }
      current.next = new ListNode(item); // следующим элементом будет новый экземпляр класса ListNode со значением value равным значению передаваемого аргумента
    }

    this.length += 1;
  }

  dequeue() {
    //return this.items.shift(item)
    if (this.length === 0) { // если из очереди удалять нечего - функция не сработает
      return
    }

    let remove = this.head.value; // переменная в которой хранится значение первого в очереди элемента

    this.head = this.head.next // первому элементу присваиваем значение следующего элемента || null


    return remove // фунеция вернет значение первого элемент очереди
  }

  

  }


let queue = new Queue;

queue.enqueue(5)
queue.enqueue(6)
queue.enqueue(7)
queue.dequeue()
queue.dequeue() 
console.log(queue);

module.exports = {
  Queue
};
