import React from "react";
import DataRow from './datarow'; 

export default class DataRows extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {customersdata : []};
         
        this.props.datacontroller.getAll().then((x) => {
          //  console.log(x); 
            (this.updateCustomersData.bind(this))(x);
        });
         
    }
    
    componentDidMount() {
        console.log('attaching listeners');
        this.props.datacontroller.onCreate((val) => {
            let customersdata = this.state.customersdata;
            customersdata.push(val);
            this.updateCustomersData(customersdata);
        });
        this.props.datacontroller.onRemove((val) => {
            this.props.datacontroller.getAll().then((x) => {
                (this.updateCustomersData.bind(this))(x);
            });
        });
        this.props.datacontroller.onChange((val) => {
            let customersdata = this.state.customersdata;
            const data = customersdata.map((data)=> {
                if(data.id == val.id) {
                    data = val;
                }
                return data;
            });
            //console.log(customersdata);
            this.updateCustomersData(data);
        });
    }
    
    updateCustomersData(customersdata) {
        if(customersdata != null) {
            console.log(Object.values(customersdata));
            const data = (Object.values(customersdata).sort((x,y) => y.datecreated - x.datecreated));
            this.setState({customersdata : data});
        }
    }
    
    
    
    render() {
        //console.log('Re Render=>');
       // console.log(this.state.customersdata);
         const rows = this.state.customersdata.map((data) => <DataRow showBalance={false} datacontroller={this.props.datacontroller} customerdata={data} key={data.id}/>); 
       
         return (
            <section>
                <fieldset>
                    <legend>Realtime Customer Data</legend>
                    <div className='row data-heading'>
                        <div>Options</div>
                        <div className='col-3'>Name</div>
                        <div className='col-3'>Date Created</div>
                        <div className='col-3'>5kg</div>
                        <div className='col-3'>10kg</div>
                        <div className='col-3'>60kg</div>
                         
                    </div>
                    <div>
                        {rows}
                    </div>
                </fieldset>
            </section>
        );
         
    }
}