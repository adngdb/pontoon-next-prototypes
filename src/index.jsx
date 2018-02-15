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
    branches: [
        {
            id: getUID(),
            name: 'test branch',
            user: 'Adrian',
            avatar: 'https://avatars1.githubusercontent.com/u/328790?s=56&v=4',
            open: true,
            merged: false,
            comments: [],
            suggestions: [
                {
                    locale: 'fr',
                    entity: e2,
                    string: '"Mon nom est Ozymandias, Roi des Rios.',
                    comments: [
                        {
                            comment: 'There\'s a typo, "Rois" instead of "Rios". Otherwise, looks good!',
                            created_at: new Date('2018-02-15T14:01:40.500Z'),
                            user: 'Matjaz',
                            avatar: 'https://avatars0.githubusercontent.com/u/626716?s=56&v=4',
                        },
                    ],
                },
                {
                    locale: 'fr',
                    entity: e1,
                    string: 'Et sur le piédestal on pouvait lire ces mots :',
                    comments: [
                        {
                            comment: 'This is not what Wikipedia says is the actual translation: https://fr.wikipedia.org/wiki/Ozymandias_(po%C3%A8me,_Percy_Bysshe_Shelley)',
                            created_at: new Date('2018-02-15T14:50:40.500Z'),
                            user: 'flod',
                            avatar: 'https://avatars0.githubusercontent.com/u/3644868?s=56&v=4',
                        },
                        {
                            comment: 'Yes, but I think this sounds a lot better in French. Also, there have been multiple translations of that poem, and Wikipedia\'s is only one of them.',
                            created_at: new Date(),
                            user: 'Adrian',
                            avatar: 'https://avatars0.githubusercontent.com/u/328790?s=56&v=4',
                        },
                    ],
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
