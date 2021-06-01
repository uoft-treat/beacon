import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import {TreatService} from "../../services/impl/TreatService";
import * as queryString from "query-string";
import './Survey_page.css';

const Survey_page = props => {

  // declare variables and hooks
  const [gender, setGender] = React.useState("");
  const [year, setYear] = React.useState("");
  const [program, setProgram] = React.useState("");
  const [error, setError] = React.useState("");
  const ERROR_TEXT = `
  Invalid link, you must provide a TREAT experiment session to use this application.
  `;


  // handle each string from user input 
  function handleClick() {
    TreatService.getInstance().setSurveyData(gender, year, program);
  }

  useEffect(() => {
    const queryVars = queryString.parse(props.location.search);
    if (!queryVars.sessionId) {
        setError({error: true});
    } else {
        TreatService.getInstance().setSessionToken(queryVars.sessionId);
    }
  }, [])

  let content = (
    <React.Fragment>
        {error ? (
            <p>{ERROR_TEXT}</p>
                ) : (
                <div className = "main">

            <h1>Please fill the survey</h1>
                <div className = "string_input_field">
                    <div className = "section">
                        <TextField
                        id="standard-password-input"
                        label="Please tell us your gender"
                        margin="normal"
                        fullWidth
                        value = {gender}
                        onChange = {e => setGender(e.target.value)}
                        />
                    </div> 
                    <div className = "section">
                        <TextField
                        id="standard-password-input"
                        label="Please tell us your year of study"
                        margin="normal"
                        fullWidth
                        value = {year}
                        onChange = {e => setYear(e.target.value)}
                        />
                    </div> 
                    <div className = "section">
                        <TextField
                        id="standard-password-input"
                        label="Please tell us your Program"
                        margin="normal"
                        fullWidth
                        value = {program}
                        onChange = {e => setProgram(e.target.value)}
                        />
                    </div> 
                    <div className = "section">
                        <Button component={Link} to='/experiment1' onClick={handleClick} variant="contained" color="primary" className = "button" style={{fontSize: '15px'}} size="large">Go to Experiment</Button>
                    </div>
                </div>
        </div>
        )}
    </React.Fragment>
  );

  return content;
};




export default Survey_page;