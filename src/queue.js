class Queue {
  constructor() {
    this.items = []
  }

  enqueue(newItem) {
    this.items.push(newItem)
  }

  dequeue() {
    return this.items.shift()
  }

  peek() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  reTurn() {
    return this.items
  }
}

export { Queue }
