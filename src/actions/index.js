import * as types from '../constants/ActionTypes'

// export const errorLogin = text => ({ type: types.ERROR_LOGIN, text })
// login section
export const errorLogin = (text) => ({ type: types.INVALID_LOGIN, text })
export const validLogin = (text) => ({ type: types.VALID_LOGIN, text })

export const setUser = (user) => ({ type: types.SET_USER, user })
export const getUser = () => ({ type: types.GET_USER })
export const isLogin = () => ({ type: types.IS_LOGIN })

export const setAuth = (auth) => ({ type: types.SET_AUTH, auth })
export const getAuth = () => ({ type: types.GET_AUTH })
export const getType = () => ({ type: types.GET_AUTH_TYPE })
export const isLog = () => ({ type: types.IS_LOGIN })

export const logout = () => ({ type: types.LOGOUT })

// export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
// export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
// export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS })
// export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
// export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
