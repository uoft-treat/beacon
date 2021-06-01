import React  from 'react';
import Guessingword from '../../components/Guessing_word_exp/Guessing_word_exp';
import './Experiment.css';

const ExperimentBefore = props => {

  const stage1 = "1";
  let content = (
    <React.Fragment>
    <Guessingword stage = {stage1} />
    </React.Fragment>
  );

  return content;
};

export default ExperimentBefore;