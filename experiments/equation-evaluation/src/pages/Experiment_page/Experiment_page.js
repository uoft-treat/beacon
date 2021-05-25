import React  from 'react';
import TextCanvas from '../../components/Text_canvas/Text_canvas';

const Experiment_page = props => {

  let content = (
    <React.Fragment>
        <div className = "main">
            <TextCanvas/>
        </div>
    </React.Fragment>
  );

  return content;
};







export default Experiment_page;