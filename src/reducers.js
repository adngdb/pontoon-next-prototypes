import { combineReducers } from 'redux';

import {
    ADD_ENTITY,
    ADD_SUGGESTION,
    ADD_TRANSLATION,
    SELECT_ENTITY,
    REMOVE_SUGGESTION,
    UPDATE_SUGGESTION,
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

export function getEntitiesWithSuggestion(entities, locale, suggestions) {
    const suggestionsForLocale = getSuggestionsForLocale(suggestions, locale);
    const entityIds = suggestionsForLocale.map(o => o.entity);
    return entities.filter(o => entityIds.indexOf(o.id) >= 0);
}


function translations(state = [], action) {
    switch (action.type) {
        case ADD_TRANSLATION:
            const translation = state.find(
                o => o.entity === action.entity && o.locale === action.locale
            );
            if (!translation) {
                return [
                    ...state,
                    {
                        locale: action.locale,
                        entity: action.entity,
                        string: action.string,
                    },
                ];
            }
            else {
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
                });
            }
        default:
            return state;
    }
}

export function getTranslationsForLocale(translations, locale) {
    return translations.filter(item => item.locale === locale);
}


function suggestions(state = [], action) {
    switch (action.type) {
        case ADD_SUGGESTION:
            return [
                ...state,
                {
                    locale: action.locale,
                    entity: action.entity,
                    string: action.string,
                }
            ];
            break;
        case UPDATE_SUGGESTION:
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
            });
        case REMOVE_SUGGESTION:
            return state.filter(
                item => !(item.entity === action.entity && item.locale === action.locale)
            );
        default:
            return state;
    }
}

export function getSuggestionsForLocale(suggestions, locale) {
    return suggestions.filter(item => item.locale === locale);
}


const nextApp = combineReducers({
    status,
    entities,
    translations,
    suggestions,
});

export default nextApp;
