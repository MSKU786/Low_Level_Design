/* Need to creat a LRU Cache */

class LNode<K> {
  value: K;
  next: LNode<K> | null;
  prev: LNode<K> | null;
  constructor(value: K) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache<K>{
  private size = 0;
  private currentSize = 0;
  private head :  LNode<K> | null;
  private tail :  LNode<K> | null;
  private map = new Map<K, LNode<K>>()

  constructor(size: number) {
    this.size = size;
    this.tail = null;
    this.head = null;
  }


  getSize() {
    return this.size;
  }

  add( node : LNode<K>) : number {
    let nodeData = node.value;

    if (this.map.has(nodeData)) {
        this.removeNodeFromList(nodeData);
        this.addNodeOnList(nodeData);
    } else {
      this.currentSize++;
      if (this.head == null) {
        this.head = new LNode<K>(nodeData);
        this.tail = this.head;
      }

      if (this.currentSize > this.size) {
        this.map.delete(this.head.value);
        this.head = this.head.next;
      }
    }

    return 1;
  }

  removeNodeFromList(nodeData: K) {
      let removeNode = this.map.get(nodeData);
      let prevNode = removeNode?.prev;
      let nextNode = removeNode?.next;

      prevNode?.next = nextNode;
      nextNode.prev = prevNode;
  }

  addNodeOnList(nodeData: K) {
    let newNode = new LNode<K>(nodeData);

    if (this.tail == null) {
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = this.tail.next;
    }
  }


  remove(node: LNode<K>) {

  }



}



/*


1 2 1 4 