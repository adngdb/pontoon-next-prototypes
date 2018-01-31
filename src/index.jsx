import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';

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
            string: 'And on the pedestal these words appear:',
        },
        {
            id: e2,
            string: "'My name is Ozymandias, king of kings;",
        },
        {
            id: getUID(),
            string: "Look on my works, ye Mighty, and despair!'",
        },
        {
            id: getUID(),
            string: "Nothing beside remains. Round the decay",
        },
        {
            id: getUID(),
            string: "Of that colossal wreck, boundless and bare",
        },
        {
            id: getUID(),
            string: "The lone and level sands stretch far away.",
        },
    ],
    translations: [
        {
            entity: e1,
            locale: 'fr',
            string: 'Et sur le piédestal il y a ces mots :',
        },
    ],
    suggestions: [
        {
            locale: 'fr',
            entity: e2,
            string: '"Mon nom est Ozymandias, Roi des Rios.',
            comments: [
                {
                    comment: 'There\'s a typo, "Rois" instead of "Rios". Otherwise, looks good!',
                    created_at: new Date(),
                },
            ],
        }
    ],
});

const root = document.getElementById('root');
const load = () => render((
    <AppContainer>
        <Provider store={ store }>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </AppContainer>
), root);

// This is needed for Hot Module Replacement
if (module.hot) {
    module.hot.accept('./App', load);
}

load();
