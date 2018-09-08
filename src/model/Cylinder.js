export default class Cylinder {
    constructor(cyl5, cyl10, cyl60) {
        this.data = {
            "5": cyl5,
            "10": cyl10,
            "60": cyl60
        }
    }

    update(count, type) {
        this.data[type] = count;
    }
}