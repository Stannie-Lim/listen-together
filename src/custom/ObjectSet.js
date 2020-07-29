export default class ObjectSet {
    constructor() {
      this.objectSet = {};
    }
    add(value) {
      for(const val in this.objectSet) {
        if(val === value.track.id) return true;
      }
      this.objectSet[value.track.id] = true
      return false;
    }
}