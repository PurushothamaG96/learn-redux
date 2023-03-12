const redux = require("redux")
const reduxLogger = require("redux-logger")
const {createStore} = redux;
const {combineReducers} = redux
// middle ware use in redux-------------
const applyMiddleWare = redux.applyMiddleware

//redux-logger--------------------------------------------
//this logger function for log all content so we must be use middleware for this.
const logger = reduxLogger.createLogger()


//---------action--------------
const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAME = "BUY_ICECREAME"
function buycake(){
    return {
        type:BUY_CAKE,
        info :"first redux action"
    }
}

function buyIceCreame(){
    return{
        type:BUY_ICECREAME,
        info :"first redux action"
    }
}

//------------reducer---------------

const initialCakeState = {
    noOfCake:10
}
const initialIceCreameState = {
    noOfIceCreame:20
}

function cakeReducer(state=initialCakeState, action){
    switch(action.type){
        case "BUY_CAKE":
            return{
                ...state, 
               noOfCake: state.noOfCake-1
            }
        default : return state
    }
}

function iceCreameReducer(state=initialIceCreameState, action){
    switch(action.type){
        case "BUY_ICECREAME":
            return{
                ...state, 
               noOfIceCreame: state.noOfIceCreame-1
            }
        default : return state
    }
}


//---combine reducers---------
const reducer = combineReducers({
    cake:cakeReducer,
    iceCreame:iceCreameReducer
})
//--------------store---------------
//note appply midle ware used-------------
const store = createStore(reducer, applyMiddleWare(logger))

// console.log("initial state", store.getState())
// const unsubscribe = store.subscribe(()=>console.log(store.getState()))
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buyIceCreame())
// unsubscribe()


//redux-logger------------------


