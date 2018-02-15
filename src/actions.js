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
    return dispatch => {
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

export const ADD_TRANSLATION_COMMENT = 'ADD_TRANSLATION_COMMENT';
export function addTranslationComment(branch, entity, locale, comment) {
    return {
        type: ADD_TRANSLATION_COMMENT,
        branch,
        entity,
        locale,
        comment,
    };
}

export const ADD_BRANCH_COMMENT = 'ADD_BRANCH_COMMENT';
export function addBranchComment(branch, comment) {
    return {
        type: ADD_BRANCH_COMMENT,
        branch,
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

export const OPEN_BRANCH = 'OPEN_BRANCH';
export function sendBranchForReview(id) {
    return {
        type: OPEN_BRANCH,
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

export const CLOSE_BRANCH = 'CLOSE_BRANCH';
export function closeBranch(branchId) {
    return {
        type: CLOSE_BRANCH,
        id: branchId,
    };
}

export const MARK_BRANCH_AS_MERGED = 'MARK_BRANCH_AS_MERGED';
function markBranchAsMerged(branchId) {
    return {
        type: MARK_BRANCH_AS_MERGED,
        id: branchId,
    };
}

export function mergeBranch(branch) {
    return dispatch => {
        for (const translation of branch.suggestions) {
            dispatch(addTranslation(
                translation.entity,
                translation.locale,
                translation.string
            ));
        }
        dispatch(markBranchAsMerged(branch.id));
        dispatch(closeBranch(branch.id));
    };
}
