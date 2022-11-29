import React, { useReducer } from 'react';

const initialState = {
    count: 0,
    count2: 0
};
const reducer = (state, action) => {
    if (action.type === 'increment') {
        return { count: state.count + 1, count2: state.count2 };
    }
    else if (action.type === 'decrement') {
        return { count: state.count - 1, count2: state.count2 };
    }
    else if (action.type === 'increment2') {
        return { count2: state.count2 + 1, count: state.count };
    }
    else if (action.type === 'decrement2') {
        return { count2: state.count2 - 1, count: state.count };
    }
    else {
        return state;
    }
}

const UseReducer = () => {
    const [count, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <hr />
            <h3>Example of useReducer</h3>
            <p>Here, both the count dispatching same function, with different action type and here initial state is an object with two object keys which is(count,count2)</p>
            <h4>[Count1]---[{count.count}]</h4>

            <button
                onClick={() => dispatch({
                    type: 'increment'
                })}
            >Increase(+)</button>

            <button
                onClick={() => dispatch({
                    type: 'decrement'
                })}
            >Decrease(-)</button>

            <h4>[Count2]---[{count.count2}]</h4>

            <button
                onClick={() => dispatch({
                    type: 'increment2'
                })}
            >Increase(+)</button>

            <button
                onClick={() => dispatch({
                    type: 'decrement2'
                })}
            >Decrease(-)</button>
            <hr />
        </div>
    );
};

export default UseReducer;