import React, {Component} from 'react';
import {evaluate} from 'mathjs';
import {buildTree} from './Formula_generator_helper';
import './Formula_generator.css';

class Formula_generator extends Component{

  constructor() {
    super();
    this.formula = "";
    this.solution = "";
    this.state = {exportitem: {formula:"", solution:0}, 
      textStyle:{
      background: "white",
      color:"red",
      align: "centre",
      vertical: "centre",
      height: "200px",
      }
    };
    this.num = 5;
    this.textStyle = null;
  }


  myCallback = () =>{
    this.props.callbackFunction(this.exportitem);
  }


  componentDidMount(){
      var tempstring = buildTree(this.num).toString();
      this.formula= tempstring;
      this.solution = evaluate(this.formula);
      this.setState({exportitem:{formula:this.formula, solution:this.solution}});
      this.setState({textStyle:{
        background: this.props.background,
        color:this.props.color,
        align: "centre",
        vertical: "centre",
        height: "200px",
      }});
      this.myCallback();

  }

  componentWillReceiveProps(){
    var tempstring = buildTree(this.num).toString();
    this.formula= tempstring;
    this.solution = evaluate(this.formula);
    this.setState({exportitem:{formula:this.formula, solution:this.solution}});
    this.setState({textStyle:{
      background: this.props.background,
      color:this.props.color,
      align: "centre",
      vertical: "centre",
      height: "200px",
    }});
    console.log(this.state);
    this.myCallback();
  }





  render(){
      return(
        <div className = "new_section" style = {this.state.textStyle} >
            {this.state.exportitem.formula}
        </div>
      )
    }
}; 




export default Formula_generator;