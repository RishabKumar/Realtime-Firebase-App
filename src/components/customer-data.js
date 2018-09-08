import React from "react";
import ReactDOM from "react-dom";
import DataRows from "./datarows";
import FilteredRows from "./filteredrows";
import AddCustomer from './addcustomer';
import CustomerDataModel from './../model/CustomerDataModel';
import Cylinder from './../model/Cylinder';

export default class CustomerData {

    constructor(datacontroller) {
        /*/const totcyl = new Cylinder(1, 2, 5);
        const retcyl = new Cylinder(0, 1, 2);
        const obj = new CustomerDataModel(1, 'Jack', totcyl, retcyl);
        const obj1 = new CustomerDataModel(2, 'Milo', totcyl, retcyl);
        /*/
        this.datacontroller = datacontroller;
        
    /*/
        console.log("aync=>");
         datacontroller.findById(2).then((x) => {console.log(x);} );
         datacontroller.find('name','Jack').then((x) => {console.log(x);} );/*/
    }
    
    bindWindowEvents() {

    }

    bindComponentEvents() {

    }

    init() {
        //    this.storage = firebaseStorage;
        this.bindWindowEvents();
        this.bindComponentEvents();

        ReactDOM.render(
            <div>
                <div className='customeradd col-12'>
                    <AddCustomer datacontroller={this.datacontroller}/>
                </div>    
                <div className='customerfilter col-12'>
                    <FilteredRows datacontroller={this.datacontroller}/>
                </div>
                <div className='allcustomers col-12'>
                    <DataRows datacontroller={this.datacontroller}/> 
                </div>
            </div>
            , document.getElementById('customer-data-container'));
            
            
    }

}
/*/
<FilteredRows datacontroller={this.datacontroller}/>
                <DataRows datacontroller={this.datacontroller}/> 

/*/