import React  from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const Break_page = props => {

  let content = (
    <React.Fragment>
        <div className = "main">
            <h1>Break Time</h1>
                <div className = "section">
                    <Button component={Link} to='/experiment2' variant="contained" color="primary" className = "button" style={{fontSize: '15px'}} size="large">Continue Experiment</Button>
                </div>
        </div>
    </React.Fragment>
  );

  return content;
};







export default Break_page;