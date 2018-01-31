import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './App.css';

import TranslatePage from './pages/TranslatePage';
import ReviewPage from './pages/ReviewPage';


const App = () => {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li><Link to='/translate'>Translate</Link></li>
                    <li><Link to='/review'>Review</Link></li>
                </ul>
            </nav>
            <main>
                <Switch>
                    <Route path='/review/:entityId' component={ReviewPage} />
                    <Route exact path='/review' component={ReviewPage} />
                    <Route path='/translate/:entityId' component={TranslatePage} />
                    <Route exact path='/translate' component={TranslatePage} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
