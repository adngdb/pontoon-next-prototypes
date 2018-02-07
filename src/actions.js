export const ADD_ENTITY = 'ADD_ENTITY';
export function addEntity(id, string) {
    return {
        type: ADD_ENTITY,
        id,
        string,
    };
}

export const ADD_TRANSLATION = 'ADD_TRANSLATION';
export function addTranslation(entity, locale, string) {
    return {
        type: ADD_TRANSLATION,
        entity,
        locale,
        string,
    };
}

export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export function addSuggestion(entity, locale, branch, string) {
    return {
        type: ADD_SUGGESTION,
        entity,
        locale,
        branch,
        string,
    };
}

export const UPDATE_SUGGESTION = 'UPDATE_SUGGESTION';
export function updateSuggestion(entity, locale, branch, string) {
    return {
        type: UPDATE_SUGGESTION,
        entity,
        locale,
        branch,
        string,
    };
}

export function approveSuggestion(suggestion) {
    return function (dispatch) {
        dispatch(addTranslation(suggestion.entity, suggestion.locale, suggestion.string));
        dispatch(rejectSuggestion(suggestion));
    };
}

export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
export function rejectSuggestion(suggestion) {
    return {
        type: REMOVE_SUGGESTION,
        entity: suggestion.entity,
        locale: suggestion.locale,
    };
}

export const ADD_COMMENT = 'ADD_COMMENT';
export function addComment(entity, locale, comment) {
    return {
        type: ADD_COMMENT,
        entity,
        locale,
        comment,
    };
}

export const CREATE_BRANCH = 'CREATE_BRANCH';
export function createBranch(id, name) {
    return {
        type: CREATE_BRANCH,
        id,
        name,
    };
}

export const DELETE_BRANCH = 'DELETE_BRANCH';
export function deleteBranch(id) {
    return {
        type: DELETE_BRANCH,
        id,
    };
}

export const SELECT_BRANCH = 'SELECT_BRANCH';
export function selectBranch(branchId) {
    return {
        type: SELECT_BRANCH,
        branchId,
    };
}
