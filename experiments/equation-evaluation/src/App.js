import React from 'react';
import Surveypage from './pages/Survey_page/Survey_page';
import Finishpage from './pages/Finish_page/Finish_page';
import Experimentpage from './pages/Experiment_page/Experiment_page';
import {BrowserRouter, Route } from 'react-router-dom';
import './App.css';

const App = props => {
  let content = (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Route path="/" component={Surveypage} exact/>
          <Route path="/finish" component={Finishpage} exact/>
          <Route path ='/experiment' component = {Experimentpage} exact/>
        </div>
        </BrowserRouter>
    </React.Fragment>
  );

  return content;
};







export default App;
