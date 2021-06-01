import React from 'react';
import Button from '@material-ui/core/Button';
import Randomwords from 'random-words';
import Stringinput from '../String_input/String_input';
import ReactCountdownClock from 'react-countdown-clock';
import './Guessing_word_exp.css';

/**** capital */
const Guessing_word = props => {


    // declare variables and hooks
    const num = 10;
    const [mystringlist, setMystringlist] = React.useState({
        stringlist: [],
      });

    const [generatestring, setGeneratestring] = React.useState({
        strings: '',
      });
    
    const [displayclock, setDisplayclock] = React.useState({
        isdisplay: false,
      });

    const [displayinput, setDisplayinput] = React.useState({
        isdisplay: false,
      });

    // basically convert an array to comma sperated string
    //****** change tostring */
    function convertList(words_array){
        var result = '';
        for(let i = 0;  i < num-1; i++){
            result += words_array[i];
            result += ', '
        }
        result += words_array[num-1];
        setGeneratestring(oldValues => ({
            ...oldValues,
            strings: result,
        }));
    }

    // turn on and off on different blocks of components and set value from hooks
    function guessstring(){
        setDisplayclock(oldValues => ({
            ...oldValues,
            isdisplay: false,
        })); 
        setGeneratestring(oldValues => ({
            ...oldValues,
            strings: '',
        }));
        setDisplayinput(oldValues => ({
            ...oldValues,
            isdisplay: true,
        })); 
    }

    // start the program, strings will be generated and clock will start as well
    function handleClick() {
        if(displayclock.isdisplay === false){

            setDisplayinput(oldValues => ({
                ...oldValues,
                isdisplay: false,
            }));
            setDisplayclock(oldValues => ({
                ...oldValues,
                isdisplay: true,
            }));
            var new_string = Randomwords(10);
            setMystringlist(oldValues => ({
                ...oldValues,
                stringlist: new_string,
            }));
            convertList(new_string);  
        }
    }


  let content = (
    <React.Fragment>
        <div className = "main">
            <h1>Click Begin to start</h1>
            <div className = "section"> 
                {!displayclock.isdisplay && <Button onClick={handleClick} variant="contained" color="primary" className = "button" style={{fontSize: '16px'}} size="large">Begin</Button>}
            </div>
            <div className = "section">
                {!displayclock.isdisplay && displayinput.isdisplay && <Stringinput actual_string = {mystringlist.stringlist} num = {num} stage = {props.stage}/>}
            </div>
            <div className = "string_section">
                {generatestring.strings}
            </div>
            <div className = "section">
                {displayclock.isdisplay && !displayinput.isdisplay && <ReactCountdownClock seconds={num} 
                        color="#000"
                        alpha={0.9}
                        size={150}
                        onComplete = {guessstring}/>}
            </div>
            

        </div>
    </React.Fragment>
  );

  return content;
};





export default Guessing_word;