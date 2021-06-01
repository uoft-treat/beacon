import React  from 'react';
import Guessingword from '../../components/Guessing_word_exp/Guessing_word_exp';
import './Experiment.css';

const ExperimentAfter = props => {

  const stage2 = "2";
  let content = (
    <React.Fragment>
    <Guessingword stage = {stage2} />
    </React.Fragment>
  );

  return content;
};

export default ExperimentAfter;