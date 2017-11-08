// basics of redux
// ACTIONS describe the fact that **something happened**
// but don't specify how the app state changes in response
//
// this is the job of REDUCERS

/*
 * action types
 */

export const INITIAL_LOAD = 'INITIAL_LOAD'


/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    // SHOW_COMPLETED: 'SHOW_COMPLETED',
    // SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(text) {
    return { type: INITIAL_LOAD, text }
}