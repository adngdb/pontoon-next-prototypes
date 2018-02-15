import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './lib/pure/base.css';
import './lib/pure/buttons.css';
import './lib/pure/forms.css';
import './lib/pure/grids.css';
import './lib/pure/grids-responsive.css';
import './lib/pure/menus.css';
import './App.css';

import TranslatePage from './pages/TranslatePage';
import ReviewPage from './pages/ReviewPage';
import ReviewsListPage from './pages/ReviewsListPage';


const App = () => {
    return (
        <div className='App pure-g'>
            <nav className='pure-u-1 pure-menu-horizontal'>
                <p className='pure-menu-heading pure-menu-link'>Translate.Next ~ Branch Demo</p>
                <ul className='pure-menu-list'>
                    <li className="pure-menu-item">
                        <Link to='/translate' className="pure-menu-link">Translate</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to='/reviews' className="pure-menu-link">Review</Link>
                    </li>
                </ul>
            </nav>
            <main className='pure-u-1'>
                <Switch>
                    <Route path='/review/:branchId' component={ReviewPage} />
                    <Route exact path='/reviews' component={ReviewsListPage} />
                    <Route path='/translate/:entityId' component={TranslatePage} />
                    <Route exact path='/translate' component={TranslatePage} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
