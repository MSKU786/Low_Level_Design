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
  private head = null;
  private tail = null;
  private map = new Map<K, LNode<K>>()

  constructor(size: number) {
    this.size = size;
  }


  getSize() {
    return this.size;
  }

  add( node : LNode<K>) {

  }


}



/*


1 2 1 4 