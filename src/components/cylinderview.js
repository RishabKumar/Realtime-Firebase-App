import React from "react";

export default class CylinderView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cylinderdata : this.props.cylinderdata
        }
     //   console.log(this.props);
    }
    
    componentWillReceiveProps(nextProps){
      //  console.log('componentWillReceiveProps');
      //  console.log(nextProps);
        this.setState({
            cylinderdata : nextProps.cylinderdata
        });
    }
    
    updateHasValue(e) {
         
        let cylinderdata = this.state.cylinderdata;
        cylinderdata['has'] = e.target.value;
        this.setState({
            cylinderdata : cylinderdata
        });
        this.props.handleUpdate(null, cylinderdata, null);
    }
    
    updateRetValue(e) {
         
        let cylinderdata = this.state.cylinderdata;
        cylinderdata['ret'] = e.target.value;
        this.setState({
            cylinderdata : cylinderdata
        });
        this.props.handleUpdate(null, null, cylinderdata);
    }
    
    render() {                                     
        return (
                    <div className='column col-3'>
                                    <div className='row'>
                                        <div className='column'>
                                            <span><input type='number' value={this.state.cylinderdata['has']} onChange={this.updateHasValue.bind(this)} readOnly={this.props.readOnly}/>
                                                <img width='15%' src='/static/icons/up-arrow.png'/>
                                            </span>
                                        </div>
                                        <div className='column'>
                                            <span><input type='number' value={this.state.cylinderdata['ret']} onChange={this.updateRetValue.bind(this)} readOnly={this.props.readOnly}/><img width='15%' src='/static/icons/down-arrow.png'/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
        );
 
    }
}
