type Transition<K, T> = (state: 'creating' | 'acquiring' | 'releasing' | 'destroying', key: K, item: T) => T
type Entry<T> = {
  value: T
  references: Set<symbol>
}
export default class SharedPool<K, T> {
  constructor(
    protected transition: Transition<K, T>,
    protected pool: Map<K, Entry<T>> = new Map(),
  ) {}

  // getter, not init
  acquire(key: K, ref: symbol): T {
    const create = !this.pool.has(key)
    if (create) {
      const references = {
        value: this.transition('creating', key, {} as T),
        references: new Set<symbol>(),
      }
      this.pool.set(key, references)
    }
    // there is no way pool/usage.get(item) can be undefined due to using has
    // above hence we use ! to avoid typescript
    const item = this.pool.get(key)!
    if (!create) {
      this.transition('acquiring', key, item.value)
    }
    item.references.add(ref)
    return item.value
  }

  // deleter
  release(key: K, ref: symbol) {
    if (this.pool.has(key)) {
      // there is no way pool/usage.get(item) can be undefined due to using has
      // above hence we use ! to avoid typescript
      const item = this.pool.get(key)!
      item.references.delete(ref)
      if (item.references.size === 0) {
        this.pool.delete(key)
        this.transition('destroying', key, item.value)
      } else {
        this.transition('releasing', key, item.value)
      }
    }
  }

  destroy() {
    Array.from(this.pool.entries()).forEach(([key, item]) => {
      Array.from(item.references).forEach((ref) => {
        this.release(key, ref)
      })
    })
  }
}
