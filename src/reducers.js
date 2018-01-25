import { combineReducers } from 'redux';

import {
    ADD_ENTITY,
    ADD_TRANSLATION,
    SELECT_ENTITY,
    UPDATE_TRANSLATION,
} from './actions';


const initialStatus = {
    selectedEntity: null,
    currentLocale: 'fr',
    lastEntityId: 0,
}
function status(state = initialStatus, action) {
    switch (action.type) {
        case SELECT_ENTITY:
            return Object.assign({}, state, {
                selectedEntity: action.entity,
            });
        default:
            return state;
    }
}


function entities(state = [], action) {
    switch (action.type) {
        case ADD_ENTITY:
            return [
                ...state,
                {
                    id: action.id,
                    string: action.string,
                },
            ];
        default:
            return state;
    }
}


function translations(state = [], action) {
    switch (action.type) {
        case ADD_TRANSLATION:
            return [
                ...state,
                {
                    locale: action.locale,
                    entity: action.entity,
                    string: action.string,
                },
            ]
        case UPDATE_TRANSLATION:
            return state.map((item, i) => {
                if (
                    item.entity === action.entity
                    && item.locale === action.locale
                ) {
                    return Object.assign({}, item, {
                        string: action.string,
                    });
                }

                return item;
            })
        default:
            return state;
    }
}

export function getTranslationsForLocale(translations, currentLocale) {
    return translations.filter(item => item.locale === currentLocale);
}


// function suggestions(state = [], action) {
//     switch (action.type) {
//         case ADD_SUGGESTION:
//             return [
//                 ...state,
//                 {
//                     locale: action.locale,
//                     entity: action.entity,
//                     string: action.string,
//                 }
//             ]
//             break;
//         case UPDATE_SUGGESTION:
//             return state.map((item, i) => {
//                 if (
//                     item.entity === action.entity
//                     && item.locale === action.locale
//                 ) {
//                     return Object.assign({}, item, {
//                         string: action.string,
//                     });
//                 }
//
//                 return item;
//             })
//         default:
//
//     }
// }


const nextApp = combineReducers({
    status,
    entities,
    translations,
    // suggestions,
});

export default nextApp;
