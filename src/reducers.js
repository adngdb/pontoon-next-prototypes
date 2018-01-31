import { combineReducers } from 'redux';

import {
    ADD_COMMENT,
    ADD_ENTITY,
    ADD_SUGGESTION,
    ADD_TRANSLATION,
    REMOVE_SUGGESTION,
    UPDATE_SUGGESTION,
} from './actions';


const initialStatus = {
    currentLocale: 'fr',
    lastEntityId: 0,
}
function status(state = initialStatus, action) {
    switch (action.type) {
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


function comments(state=[], action) {
    switch (action.type) {
        case ADD_COMMENT:
            return [
                ...state,
                {
                    comment: action.comment,
                    created_at: new Date(),
                },
            ];
        default:
            return state;
    }
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
                    comments: [],
                }
            ];
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
        case ADD_COMMENT:
            return state.map((item, i) => {
                if (
                    item.entity === action.entity
                    && item.locale === action.locale
                ) {
                    return Object.assign({}, item, {
                        comments: comments(item.comments, action),
                    });
                }

                return item;
            });
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
