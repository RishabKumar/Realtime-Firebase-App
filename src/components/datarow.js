import React from "react";
import CylinderView from './cylinderview';

export default class DataRow extends React.Component {
    
    constructor(props){
        super(props);    
        this.state = {
            customerdata : this.props.customerdata,
            readOnly: true
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.customerdata.datemodified > this.props.customerdata.datemodified)
        {
           // console.log('componentWillReceiveProps');
          //  console.log(nextProps);
        //    console.log(nextProps.customerdata.name);
            
            this.setState({
                customerdata : nextProps.customerdata,
                readOnly: true
            });
        }
    }
    
    handleNameChange(e) {
        this.updateCustomerData(e.target.value, null, null);
    }
    
    updateCustomerData(name, hascylobj, retcylobj) {
        let customerdata = this.state.customerdata;
        if(name != null) {
            customerdata.name = name;
        }
        if(hascylobj != null) {
            customerdata.hascyl.data[hascylobj['key']] = hascylobj['has'];
        } 
        if(retcylobj != null) {
            customerdata.retcyl.data[retcylobj['key']] = retcylobj['ret'];
        }
        customerdata.datemodified = new Date().getTime();
        this.setState({customerdata : customerdata,
                       readOnly : this.state.readOnly 
                    });
    }
    
    getCylinderView() {
        let tmpid = 1001;
        const haskeys = Object.keys(this.state.customerdata.hascyl.data);
        return haskeys.map((key) => {
                                    const tmp = {
                                                    'key':key,
                                                    'has':this.state.customerdata.hascyl.data[key],
                                                    'ret':this.state.customerdata.retcyl.data[key]
                                                };
                                    tmpid++;
                                    return (
                                    <CylinderView cylinderdata={tmp} 
                                        key={this.state.customerdata.id+tmpid.toString()} handleUpdate={this.updateCustomerData.bind(this)} readOnly={this.state.readOnly}/>);
                            });
    }
    
    toggleReadOnly(e) {
        e.target.parentElement.parentElement.parentElement.className = 'row highlight';
        if(!this.state.readOnly) {
            console.log('saveToDatabase');
            delete this.state.customerdata['balance'];
            console.log(this.state.customerdata);
            this.props.datacontroller.updateById(this.state.customerdata['id'], this.state.customerdata);
            e.target.parentElement.parentElement.parentElement.className = 'row';
        }
        this.setState({
                        customerdata: this.state.customerdata,
                        readOnly:!this.state.readOnly   
                      });
    }

    removeData(e) {
        const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-recordid');
        this.props.datacontroller.deleteById(id);
        this.setState({});
        this.forceUpdate();
    }
    
    render() {
      //  console.log('Painting: ');
    //    console.log(this.state.customerdata);
        const balanceClass = this.props.showBalance ? 'column col-3' : 'column col-3 hide';
        return (
            <div className='row' data-recordid={this.state.customerdata.id}>
                <div>
                    <span><input type='button' onClick={this.toggleReadOnly.bind(this)} value={this.state.readOnly?'Modify':'Save'}/></span>
                    <span><input type='button' onClick={this.removeData.bind(this)} value='Delete'/></span>
                </div>
                <div className='column col-3'>
                    <span className='customer-name'><input type='text' onChange={this.handleNameChange.bind(this)} value={this.state.customerdata.name} readOnly={this.state.readOnly}/></span>
                </div>
                 <div className={balanceClass}>
                    <span>{this.state.customerdata.balance}</span>
                </div>
                <div className='column col-3'>
                    <span>{new Date(this.state.customerdata.datecreated).toDateString()}</span>
                </div>

                    {this.getCylinderView()}
                
                
            </div>
        );
    }
    
}