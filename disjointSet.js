class DisjointSet {
    constructor (length) {
        this.tree = Array(length).fill(-1)
    }
    join (a, b) {
        a = this.search(a)
        b = this.search(b)
        if (a === b) return
        if (this.tree[a] < this.tree[b]) {
            this.tree[a] += this.tree[b]
            this.tree[b] = a
        } else {
            this.tree[b] += this.tree[a]
            this.tree[a] = b
        }
    }
    search (val) {
        if (this.tree[val] >= 0) {
            return this.tree[val] = this.search(this.tree[val])
        }
        return val
    }
    count (val) {
        if (this.tree[val] >= 0) {
            return this.count(this.tree[val])
        }
        return -this.tree[val]
    }
    compare (a, b) {
        return this.search(a) === this.search(b)
    }
}
