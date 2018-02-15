import { combineReducers } from 'redux';

import {
    ADD_TRANSLATION_COMMENT,
    ADD_BRANCH_COMMENT,
    ADD_ENTITY,
    ADD_SUGGESTION,
    ADD_TRANSLATION,
    CLOSE_BRANCH,
    CREATE_BRANCH,
    MARK_BRANCH_AS_MERGED,
    OPEN_BRANCH,
    REMOVE_SUGGESTION,
    SELECT_BRANCH,
    UPDATE_SUGGESTION,
} from './actions';


const initialStatus = {
    currentLocale: 'fr',
    currentBranch: null,
}
function status(state = initialStatus, action) {
    switch (action.type) {
        case SELECT_BRANCH:
            return Object.assign({}, state, {
                currentBranch: action.branchId,
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


function comments(state=[], action) {
    switch (action.type) {
        case ADD_TRANSLATION_COMMENT:
        case ADD_BRANCH_COMMENT:
            return [
                ...state,
                {
                    comment: action.comment,
                    created_at: new Date(),
                    user: 'UnknownUser',
                    avatar: 'http://www.auriflama.sp.gov.br/app/webroot/img/avatar-user.png',
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
        case ADD_TRANSLATION_COMMENT:
            return state.map((item) => {
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

function branches(state = [], action) {
    switch (action.type) {
        case CREATE_BRANCH:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    user: 'UnknownUser',
                    avatar: 'http://www.auriflama.sp.gov.br/app/webroot/img/avatar-user.png',
                    merged: false,
                    open: false,
                    suggestions: [],
                    comments: [],
                },
            ];
        case OPEN_BRANCH:
            return state.map(item => {
                if (item.id === action.id) {
                    return Object.assign({}, item, {
                        open: true,
                    });
                }
                return item;
            });
        case CLOSE_BRANCH:
            return state.map(item => {
                if (item.id === action.id) {
                    return Object.assign({}, item, {
                        open: false,
                    });
                }
                return item;
            });
        case MARK_BRANCH_AS_MERGED:
            return state.map(item => {
                if (item.id === action.id) {
                    return Object.assign({}, item, {
                        merged: true,
                    });
                }
                return item;
            });
        case ADD_BRANCH_COMMENT:
            return state.map(item => {
                if (item.id === action.branch) {
                    return Object.assign({}, item, {
                        comments: comments(item.comments, action),
                    });
                }
                return item;
            });
        case ADD_SUGGESTION:
        case UPDATE_SUGGESTION:
        case REMOVE_SUGGESTION:
        case ADD_TRANSLATION_COMMENT:
            return state.map(item => {
                if (item.id === action.branch) {
                    return Object.assign({}, item, {
                        suggestions: suggestions(item.suggestions, action),
                    });
                }
                return item;
            });
        default:
            return state;
    }
}

export function getBranchesToReview(branches) {
    return branches.filter(o => o.open);
}

export function getWorkingBranches(branches) {
    return branches.filter(o => !o.merged);
}

export function getSuggestionsForBranch(branches, branchId) {
    const branch = branches.find(o => o.id === branchId);
    if (branch) {
        return branch.suggestions;
    }
    return [];
}


const nextApp = combineReducers({
    status,
    entities,
    translations,
    branches,
});

export default nextApp;
