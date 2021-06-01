import React from 'react';
import './App.scss';
import {Container} from "./components/Container";
import {Route, Switch} from "react-router-dom";
import {WelcomePage} from "./pages/WelcomePage";
import {ExperimentPage} from "./pages/ExperimentPage";
import {ResultPage} from "./pages/ResultPage";
import {SurveyPage} from "./pages/SurveyPage";

function App() {
    return (
        <Container>
            <Switch>
                <Route exact path="/" component={WelcomePage}/>
                <Route exact path="/survey" component={SurveyPage}/>
                <Route exact path="/experiment" component={ExperimentPage}/>
                <Route exact path="/result" component={ResultPage}/>
            </Switch>
        </Container>
    );
}

export default App;
