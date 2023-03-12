
const redux = require("redux")
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware
//----------thunk middleware---------------
const thunkMiddleware = require("redux-thunk").default
const axios = require("axios")

const initialState={
    loading:false,
    data:[],
    err :""
}

const FETCH_USERS_REQ = "FETCH_USERS_REQ"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

const fatchUserRequest = ()=>{
    return {
        type:FETCH_USERS_REQ
    }
}
const fatchUserSuccess = (users)=>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fatchUserFailure = (error)=>{
    return {
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_USERS_REQ:
            return{
                ...state,
                loading : true 
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading:false,
                data:action.payload,
                err:""
            }
        case FETCH_USERS_FAILURE:
            return{
                loading:false,
                data:[],
                err:action.payload
            }
    }
}

//action thunk middleware use

//thunc middle ware used to make asyncronous task
const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fatchUserRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((response)=>{
            //resposnse.data
            dispatch(fatchUserSuccess(response.data))
        })
        .catch((err)=>{
            //err
            dispatch(fatchUserFailure(err.message))
        })
    }
}

const store = createStore(reducer, applyMiddleWare(thunkMiddleware))
store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers())
