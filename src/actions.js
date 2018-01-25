
export const SELECT_ENTITY = 'SELECT_ENTITY';
export function selectEntity(entity) {
    return {
        type: SELECT_ENTITY,
        entity,
    };
}


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


export const UPDATE_TRANSLATION = 'UPDATE_TRANSLATION';
export function updateTranslation(entity, locale, string) {
    return {
        type: UPDATE_TRANSLATION,
        entity,
        locale,
        string,
    };
}
