import { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';

import TranslatePage from './pages/TranslatePage';
import ReviewPage from './pages/ReviewPage';


const App = () => {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li><Link to='/'>Translate</Link></li>
                    <li><Link to='/review'>Review</Link></li>
                </ul>
            </nav>
            <main>
                <Route exact path='/' component={TranslatePage} />
                <Route exact path='/review' component={ReviewPage} />
            </main>
        </div>
    );
}

export default App;
