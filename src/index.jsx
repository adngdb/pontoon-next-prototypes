import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import nextApp from './reducers';
import { addEntity } from './actions';
import App from './App';


const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(nextApp, {
    status: {
        currentLocale: 'fr',
    },
    entities: [
        {
            id: 1,
            string: 'hello',
        },
        {
            id: 2,
            string: 'world',
        },
    ],
    translations: [
        {
            entity: 1,
            locale: 'fr',
            string: 'bonjour',
        },
    ],
    // suggestions: [
    //     {
    //         locale: 'fr',
    //         entity: 2,
    //         string: 'le monde',
    //         comments: [
    //             'I think this lacks consistency with the rest of the content...',
    //         ],
    //     }
    // ],
});

const root = document.getElementById('root');
const load = () => render((
    <AppContainer>
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </AppContainer>
), root);

// This is needed for Hot Module Replacement
if (module.hot) {
    module.hot.accept('./App', load);
}

load();
