import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {TreatService} from "../../services/impl/TreatService";
import {DataSubmissionService} from "../../services/impl/DataSubmissionService";
import './Data_gather_button.css';

class Data_gather_button  extends Component{

  
  constructor() {
    super();
    this.state = {link: ""};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    if(this.props.stage === "1"){
      this.setState({link: "/break"});
    }
    else{
      this.setState({link: "/finish"});
    }
  }


  // call service to proceed to the next step 
  handleClick() {
    if(this.props.stage === "1"){
      let rate1 = this.props.correct_num / this.props.num;
      TreatService.getInstance().setExperiment1Data(rate1);
    }
    else{
      const rate2 = this.props.correct_num / this.props.num;
      const surveyData = TreatService.getInstance().getSurveyData();
      const experiment1data = TreatService.getInstance().getExperiment1Data();
      DataSubmissionService.getInstance().submitData(
              surveyData.gender,
              surveyData.year,
              surveyData.program,
              experiment1data,
              rate2
            );


    }
  }



  render(){
      return(
        <div className = "section">
            <Button onClick={this.handleClick} component={Link} to={this.state.link} variant="contained" color="primary" className = "button" style={{fontSize: '15px'}} size="large">Submit Data</Button>
        </div>
      )
    }
}; 




export default Data_gather_button;