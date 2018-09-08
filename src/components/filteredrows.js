import React from "react";
import DataRow from './datarow.js'; 
import CylinderView from './cylinderview.js';

import DatePicker from 'react-date-picker';

export default class FilteredRows extends React.Component {
    
    constructor(props) {
        super(props);
        let now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        const lb = now;
        now = new Date();
        now.setHours(23);
        now.setMinutes(23);
        now.setSeconds(23);
        const ub = now
        this.state = {
                        filterdata : [], 
                        name : '',
                        lb : lb,
                        ub : ub
                    };
    }
    
    handleBtnClick(e) {
        //remove all filter data
        this.setState({ 
                        filterdata : [],
                        name : this.state.name,
                        lb : this.state.lb,
                        ub : this.state.ub
                    });
        //now search for data
        this.props.datacontroller.fuzzyFind('name', this.state.name.toLowerCase()).then((x) => {
            const lb = this.state.lb;
            const ub = this.state.ub;
            console.log('filter');
            let y = Object.values(x).filter((data) => { 
                    console.log(data.datecreated);
                    console.log(new Date(data.datecreated));
                    return data.datecreated > lb.getTime() && data.datecreated < ub.getTime() 
                });
                
            //sort all data by name
                y = y.sort((x,y) => x.name > y.name); 
                
            //this.setState({ filterdata : y });
            
            //create array of (array having common names).  
                let arr = [];
                for( let i = 0; i < y.length; i++ ) {
                    let temparr = [];
                    y.forEach((b, index) => {
                        if(b.name == y[i].name){
                            temparr.push(b);
                            i = index;
                        }     
                    });
                    arr.push(temparr);
                }
            
                //calculate balance for individual set of names.
                console.log('Array');
                console.log(arr);
                arr.forEach((b) => {
                    let individualbal = b.map((a) => Object.keys(a.hascyl.data).map((key) => a.hascyl.data[key] - a.retcyl.data[key]));
                    let balarr = [];
                    balarr = individualbal.reduce((acc, cur) => {
                       // debugger;
                            return [cur[0] + acc[0], cur[1] + acc[1], cur[2] + acc[2]]
                    }, [0,0,0]);
                    console.log('balance for '+b[0].name);
                    console.log(balarr);          
                    const index = y.findIndex((d) => d.name == b[0].name);
                    y[index].balance = balarr.join(', ');
                    console.log('balance set for '+y[index].name+' is : '+y[index].balance);
                });
                this.setState({ 
                        filterdata : y,
                        name : this.state.name,
                        lb : this.state.lb,
                        ub : this.state.ub
                    });
                console.log('filterdata=>');
                console.log(y);
        });
    } 
    
    
    handleNameChange(e) {
        this.setState({
                        filterdata : this.state.filterdata, 
                        name : e.target.value,
                        lb : this.state.lb,
                        ub : this.state.ub
                      });
    }
    
    handleLBChange(e) {
        e.setHours(0);
        e.setMinutes(0);
        e.setSeconds(0);
        this.setState({
                        filterdata : this.state.filterdata, 
                        name : this.state.name,
                        lb : e,
                        ub : this.state.ub
                      });
    }
    
    handleUBChange(e) {
        e.setHours(23);
        e.setMinutes(59);
        e.setSeconds(59);
        this.setState({
                        filterdata : this.state.filterdata, 
                        name : this.state.name,
                        lb : this.state.lb,
                        ub : e
                      });
    }
    
    render() {
        let data = this.state.filterdata;
        
             
            
    //    });
        const rows = data.map((data) => <DataRow datacontroller={this.props.datacontroller} showBalance={true} customerdata={data} key={data.id}/>); 
                        
         return (
            <section>
                <fieldset>
                    <legend>Filter Section</legend>
                    <div><span className='col-1' style={{display:'inline-block'}}>Name </span><input placeholder='Enter name to search' type='text' value={this.state.name} onChange={this.handleNameChange.bind(this)}/></div>
                    <div><span className='col-1' style={{display:'inline-block'}}>Start Date</span><DatePicker value={this.state.lb} onChange={this.handleLBChange.bind(this)}/></div>
                    <div><span className='col-1' style={{display:'inline-block'}}>End Date</span><DatePicker value={this.state.ub} onChange={this.handleUBChange.bind(this)}/></div>
                    <div><input type='button' onClick={this.handleBtnClick.bind(this)} value='Search'/></div>
                    <div className='row data-heading'>
                        <div>Options</div>
                        <div className='col-3'>Name</div>
                        <div className='col-3'>Balance</div>
                        <div className='col-3'>Date Created</div>
                        <div className='col-3'>5kg</div>
                        <div className='col-3'>10kg</div>
                        <div className='col-3'>60kg</div>
                    </div>
                    <div>{rows}</div>
                </fieldset>
            </section>
        );
        
    }
}