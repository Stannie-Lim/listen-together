export default class SongQueue {
    constructor(queue) {
        this.queue = [];
        if(queue) this.queue = queue;
    }
    
    peek() {
        return this.isEmpty() ? undefined : this.queue[0];
    }

    enqueue(song) {
        return this.queue.push(song);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    removeFromQueue(song) {
        let index = 0;
        for(index; index < this.queue.length; index++) {
            if(this.queue[index].id === song.id) break;
        }
        return this.queue.splice(index, 1);
    }
};