import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import {TreatService} from "../../services/impl/TreatService";
import {requireTreatSession} from "../../pages/hocs/requireTreatSession";
import Formula from '..//Formula_generator/Formula_generator';
import './Text_canvas.css'

const Text_canvas = props => {
    
  const [newSwtich, setNewswitch] = React.useState(true);
  const [currentColor, setCurrentcolor] = React.useState('red');
  const [currentBackground, setCurrentbackground] = React.useState('white');
  const [exportitem, setExportitem] = React.useState(null);
  const [count, setCount] = React.useState(5);
  var temp;

  function callbackFunction(childData){
    setExportitem(childData);
    console.log(exportitem);
  }


  function handleClick() {
    temp = count;
    if(count == 5){
        setCurrentcolor('blue');
        setCurrentbackground('red');
    }
    else if(count == 4){
        setCurrentcolor('yellow');
        setCurrentbackground('blue');
    }
    else if(count == 3){
        setCurrentcolor('blue');
        setCurrentbackground('yellow');
    }
    else if(count == 2){
        setCurrentcolor('red');
        setCurrentbackground('blue');
    }
    else if(count == 1){
        setCurrentcolor('red');
        setCurrentbackground('yellow');
    }
    temp--;
    setCount(temp);
  }


  let content = (
    <React.Fragment>
        <div className = "main">
            <div className = "section">
                Please give the correct answer to the following formula
            </div>
            <div>
                <Formula color = {currentColor} background = {currentBackground} callbackFunction = {callbackFunction}/>
            </div>
                <Button  onClick={handleClick} variant="contained" color="primary" className = "button" style={{fontSize: '40px'}} size="large">Confirm</Button>

        </div>
    </React.Fragment>
  );

  return content;
};




export default Text_canvas;