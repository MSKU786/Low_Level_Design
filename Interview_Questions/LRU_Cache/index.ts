/* Need to creat a LRU Cache */

class LNode<K, V> {
  key: K;
  value: V;
  next: LNode<K, V> | null;
  prev: LNode<K, V> | null;
  constructor(key: K, value: V) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache<K, V> {
  private size = 0;
  private capacity: number;
  private head: LNode<K, V> | null;
  private tail: LNode<K, V> | null;
  private map = new Map<K, LNode<K, V>>();

  constructor(capacity: number) {
    this.capacity = capacity;
    this.tail = null;
    this.head = null;
  }

  getSize() {
    return this.size;
  }

  add(node: LNode<K, V>) {
    if (this.map.has(node.key)) {
      let existingNode = this.map.get(node.key);
      this.removeNodeInList(existingNode);
      this.appendNodeInList(existingNode);
    } else {
      if (this.capacity === this.size && this.head != null) {
        this.map.delete(this.head?.key);
        this.head = this.head.next;
        this.size--;
      }

      let newNode = new LNode<K, V>(node.key, node.value);
      this.map.set(node.key, newNode);
      this.appendNodeInList(newNode);
      this.size++;
      ``;
    }
  }

  private removeNodeInList(node: LNode<K, V>) {
    let prev = node.prev;
    let next = node.next;
    if (prev != null) prev?.next = next;
    else this.head = next;

    if (next != null) next?.prev = prev;
    else this.tail = this.tail?.prev;

    node.prev = null;
    node.next = null;
  }

  private appendNodeInList(node: LNode<K, V>) {
    node.prev = this.tail;
    node.next = null;

    if (this.tail) this.tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;
  }

  remove(node: LNode<K, V>) {
    const listNode = this.map.get(node.key);
    if (!listNode) {
      throw new Error('Key not found');
    }
    this.map.delete(node.key);
    this.removeNodeInList(listNode);
    this.size--;
  }
}
