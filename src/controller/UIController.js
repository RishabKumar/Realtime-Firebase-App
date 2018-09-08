import customerdata from "./../components/customer-data";
import DataController from './DataController';

export default class UIController {
    
    constructor() {

    }
    
    init() {
        let dataobj = new DataController();
        
        (new customerdata(dataobj)).init();
    }
    
}
