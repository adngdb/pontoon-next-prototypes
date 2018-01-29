import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import nextApp from './reducers';
import { addEntity } from './actions';
import { getUID } from './utils';

import App from './App';


const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const e1 = getUID();
const e2 = getUID();

const store = createStoreWithMiddleware(nextApp, {
    status: {
        currentLocale: 'fr',
    },
    entities: [
        {
            id: e1,
            string: 'hello',
        },
        {
            id: e2,
            string: 'world',
        },
        {
            id: getUID(),
            string: 'what is up?',
        },
    ],
    translations: [
        {
            entity: e1,
            locale: 'fr',
            string: 'bonjour',
        },
    ],
    suggestions: [
        {
            locale: 'fr',
            entity: e2,
            string: 'le monde',
            comments: [
                'I think this lacks consistency with the rest of the content...',
            ],
        }
    ],
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
