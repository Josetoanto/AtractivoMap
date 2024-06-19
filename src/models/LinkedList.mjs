// LinkedList.mjs

import Node from './Node.mjs'; // Asumiendo que Node está definido en Node.mjs

export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null;
        this.#count = 0;
    }

    push(name, weight = 1) {
        let node = new Node(name, weight);
        if (this.#head === null) {
            this.#head = node;
        } else {
            let current = this.#head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.#count++;
    }

    size() {
        return this.#count;
    }

    isEmpty() {
        return this.#head === null;
    }

    forEach(callback) {
        let current = this.#head;
        while (current !== null) {
            callback(current.value, current.weight);
            current = current.next;
        }
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;
        }
        return null;
    }

    indice() {
        const elements = [];
        let i = this.#head;
        while (i !== null) {
            elements.push(i.value);
            i = i.next;
        }
        return elements;
    }
    indice() {
        let current = this.#head;
        return {
          [Symbol.iterator]() {
            return this;
          },
          next() {
            if (current) {
              const value = current.value;
              current = current.next;
              return { done: false, value };
            } else {
              return { done: true };
            }
          }
        };
      }
}
