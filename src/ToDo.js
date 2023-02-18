
function todo (state = [], action) {
    if (action.type === 'ADD_TODO') {

        return state.conact([action.todo])
    }
    return state
}


function createStore() {
    // the state should have four parts
    // 1. the state
    // 2. get the state
    // 3. listen to the state
    // 4. update the state

    let state
    let listeners = []
    

    const getState = ()=> state

    const subscribe = (listener)=>{
        listeners.push(listener)
        return listeners
    }


    return {
        getState,
        subscribe
    }
}


const store = new createStore();

store.subscribe()