export default class CustomerDataModel {

    constructor(id, name, hascyl, retcyl) {
        this.id = id;
        this.name = name.toLowerCase();
        this.hascyl = hascyl;
        this.retcyl = retcyl;
        this.datecreated = id;
        this.datemodified = id;
    }
    
    returncyl(count, type) {
        this.retcyl.update(this.retcyl.data[type] - count, type);
    }
    
    ordercyl(count, type) {
        this.hascyl.update(this.hascyl.data[type] + count, type);
    }
}