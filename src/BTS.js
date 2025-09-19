import { Queue } from './queue.js'

class Node {
  constructor(value, left = null, right = null) {
    this.left = left
    this.value = value
    this.right = right
  }
}

class BTS {
  holeTree

  buildTree(array, firstTime = true) {
    let newArray

    if (firstTime) {
      newArray = FilterTheDouble(array)
    } else {
      newArray = array
    }

    if (newArray.length === 1) {
      return new Node(newArray[0])
    }

    if (newArray.length === 0) {
      return null
    }

    const mid = Math.floor(newArray.length / 2)

    const root = newArray[mid]
    const left = newArray.slice(0, mid)
    const right = newArray.slice(mid + 1)

    this.holeTree = new Node(
      root,
      this.buildTree(left, false),
      this.buildTree(right, false)
    )
    return this.holeTree
  }

  insert(value) {
    let current = this.holeTree
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = new Node(value)
          return
        }
        current = current.left
      } else {
        if (current.right === null) {
          current.right = new Node(value)
          return
        }
        current = current.right
      }
    }
  }

  deleteItem(value) {
    let current = this.holeTree
    let parent = null

    while (current !== null) {
      if (value < current.value) {
        parent = current
        current = current.left
      } else if (value > current.value) {
        parent = current
        current = current.right
      } else {
        if (current.left === null && current.right === null) {
          if (parent === null) {
            this.holeTree = null
          } else if (parent.left === current) {
            parent.left = null
          } else {
            parent.right = null
          }
        } else if (current.left === null || current.right === null) {
          let child = current.left || current.right
          if (parent === null) {
            this.holeTree = child
          } else if (parent.left === current) {
            parent.left = child
          } else {
            parent.right = child
          }
        } else {
          let succParent = current
          let succ = current.right
          while (succ.left !== null) {
            succParent = succ
            succ = succ.left
          }
          current.value = succ.value

          if (succParent.left === succ) {
            succParent.left = succ.right
          } else {
            succParent.right = succ.right
          }
        }
        return
      }
    }
  }

  preOrderForEach(callback){
    let current = this.holeTree;
    callback(preOrderDigging(current))
  }

  InOrderForEach(callback){
    let current = this.holeTree;
    callback(InOrderDigging(current))
  }

  postOrderForEach(callback){
    let current = this.holeTree;
    callback(postOrderDigging(current))
  }

  levelOrderForEach(callback) {
    let check = true
    if (callback == undefined) {
      console.error('The callback is undefined in levelOrderForEach function')
      check = false
    }

    let queue = new Queue()
    queue.enqueue(this.holeTree)
    let array = []

    while (!queue.isEmpty()) {
      let current = queue.dequeue()
      array.push(current.value)
      if (current.left !== null) queue.enqueue(current.left)
      if (current.right !== null) queue.enqueue(current.right)
    }
    if (check) callback(array)
  }

  height(value){
    let current = this.holeTree

    while(current.value !== value){
        if (value < current.value) {
            current = current.left;
        } else if (current.value < value){
            current = current.right;
        }
    }

    return {value:current.value, height:digAndCountTheHeight(current)}
  }

  depth(value){
    let current = this.holeTree
    let Counter = 0;
    while(current.value !== value){
        if (value < current.value) {
            current = current.left;
            Counter++
        } else if (current.value < value){
            current = current.right;
            Counter++
        }
    }

    return {value:current.value, depth:Counter}
  }

  isBalanced(){
    const current = this.holeTree
    const left = digAndCountTheHeight(current.left)
    const right = digAndCountTheHeight(current.right)
    const def = left - right
    if(def == 0) return true;
    if(def == 1 ) return true;
    if(def == -1) return true;
    else return false;
  }

  rebalance(){
    this.preOrderForEach((e)=>{this.buildTree(e)})
  }
}

function preOrderDigging(current){
   if (current === null) return [];     
  let array = [];
  array.push(current.value);          
  array = array.concat(preOrderDigging(current.left));  
  array = array.concat(preOrderDigging(current.right));  

  return array;
}

function InOrderDigging(current){
   if (current === null) return [];     
  let array = [];
  array = array.concat(InOrderDigging(current.left));  
  array.push(current.value);          
  array = array.concat(InOrderDigging(current.right));  

  return array;
}

function postOrderDigging(current){
   if (current === null) return [];     
  let array = [];
  array = array.concat(postOrderDigging(current.left));  
  array = array.concat(postOrderDigging(current.right));  
  array.push(current.value);          

  return array;
}

function digAndCountTheHeight(current){
     if (current === null) return -1; 
  let left = digAndCountTheHeight(current.left);
  let right = digAndCountTheHeight(current.right);
  return 1 + Math.max(left, right);
}

function FilterTheDouble(array) {
  const newArray = mergeSort(array)
  let filter = []

  for (let i = 0; i < newArray.length; i++) {
    if (filter.length === 0 || filter[filter.length - 1] !== newArray[i]) {
      filter.push(newArray[i])
    }
  }
  return filter
}

function mergeSort(array) {
  if (array.length <= 1) return array

  const mid = Math.floor(array.length / 2)
  const leftHalf = array.slice(0, mid)
  const rightHalf = array.slice(mid)

  const sortedLeft = mergeSort(leftHalf)
  const sortedRight = mergeSort(rightHalf)

  const merged = []
  let i = 0,
    j = 0

  while (i < sortedLeft.length && j < sortedRight.length) {
    if (sortedRight[j] < sortedLeft[i]) {
      merged.push(sortedRight[j])
      j++
    } else {
      merged.push(sortedLeft[i])
      i++
    }
  }

  return merged.concat(sortedLeft.slice(i)).concat(sortedRight.slice(j))
}

export { BTS }
