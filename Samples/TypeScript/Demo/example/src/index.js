import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import App from './App';
import Other from './Other';

function Main(){
    return (
        <Router>
            <Route path="/" exact component={App} />
            <Route path="/Other" exact component={Other} />
        </Router>
    )
}
export default Main

ReactDOM.render(
    <Main />,
  document.getElementById('root')
);
