import React from "react";
import CustomerDataModel from './../model/CustomerDataModel';
import Cylinder from './../model/Cylinder';

export default class AddCustomer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {customername : '', namesuggestion : [] };
    }
    
    handleTextChange(e) {
        console.log("Searching: "+e.target.value);
        this.props.datacontroller.fuzzyFind('name',e.target.value.toLowerCase()).then((x) => 
        {
            debugger;
            console.log(x);
            if(x != null)
            {
                this.setState({
                    customername : this.state.customername,
                    namesuggestion : Object.values(x)
                });
            }
        });
        this.setState({customername : e.target.value});
    }
    
    handleClick(e) {
        const totcyl = new Cylinder(0, 0, 0);
        const retcyl = new Cylinder(0, 0, 0);
        const id = new Date().getTime();
        const obj = new CustomerDataModel(id, this.state.customername, totcyl, retcyl);
        this.props.datacontroller.add(id, obj);
        this.setState({customername : ''});
    }
    
    selectName(e) {
        this.setState({customername : e.target.innerHTML});
    }
    
    render() {
        const namearr = this.state.namesuggestion.map((x, index) => <div onClick={this.selectName.bind(this)} key={index}>{x.name}</div>);
        
        return (
            <section>
                <fieldset>
                    <legend>Add Section</legend>
                    <div>
                        <span><input value={this.state.customername} type='text' onChange={this.handleTextChange.bind(this)}  placeholder='Enter Customer Name'/></span>
                        <span><input type='button' value='Add' onClick={this.handleClick.bind(this)}/></span>
                    </div>
                    <div className='suggestion'>
                        {namearr}
                    </div>
                </fieldset>
            </section>
            
        );
    }
    
}