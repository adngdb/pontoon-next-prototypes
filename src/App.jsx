import { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import TranslatePage from './pages/TranslatePage';
import ReviewPage from './pages/ReviewPage';


const App = () => {
    return (
        <div className="App">
            <Route exact path='/' component={TranslatePage} />
            <Route exact path='/review' component={ReviewPage} />
        </div>
    );
}

export default App;
