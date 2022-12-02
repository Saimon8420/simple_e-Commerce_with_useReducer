import React, { useEffect, useReducer, useState } from 'react';
import './Home.css';

const initialState = {
    added: []
};

const reduce = (state, action) => {
    const matched = state.added.find(exist => exist.id === action.id);
    if (action.type === 'addToCart' || action.type === 'increase') {
        if (matched) {
            const exist = state.added.map(eachMatch => eachMatch.id === action.id ? { ...matched, quantity: matched.quantity + 1 } : eachMatch);

            return { added: [...exist] };
        }
        else {
            return { added: [...state.added, { ...action.value, quantity: 1 }] }
        }
    }
    else if (action.type === 'decrease') {
        if (matched) {
            const exist = state.added.map(eachMatch => eachMatch.id === action.id ? { ...matched, quantity: matched.quantity - 1 } : eachMatch);
            if (matched.quantity <= 1) {
                console.log('quantity is 0');
                const exist = state.added.filter(eachMatch => eachMatch.id !== action.id)
                return { added: [...exist] };
            }
            return { added: [...exist] };
        }
    }
}

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, dispatch] = useReducer(reduce, initialState);

    useEffect(() => {
        fetch('fakeData.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const calcTotal = cart.added.map(eachItem => eachItem.price * eachItem.quantity);

    const reducer = (x, y) => x + y;
    const grandTotal = calcTotal.reduce(reducer, 0);
    return (
        <div>
            <h2>Simple E-commerce with useReducer</h2>
            <div id='all-products'>
                <div>
                    {
                        products.map(product => <div id='product' key={product.id}>
                            <h4>Name: {product.name}</h4>
                            <p>Price: ${product.price}</p>
                            <p>
                                <span style={{
                                    'backgroundColor': 'red', 'color': 'white',
                                    'padding': '2px',
                                    'borderRadius': '5px'
                                }}>id:{product.id}</span>
                            </p>
                            <button
                                onClick={() => dispatch({ type: 'addToCart', value: product, id: product.id })}
                            >Add to cart</button>
                        </div>)
                    }
                </div>
                <div id='cart'>
                    <h4>{cart.added.length ? 'Added Items' : 'Added Items 0'}</h4>
                    {
                        cart.added.map(product => <div id='product' key={product.id} >
                            <h4>Name: {product.name}</h4>
                            <p>
                                <button onClick={() => dispatch({
                                    type: 'increase',
                                    id: product.id,
                                    value: product.quantity,
                                })}
                                >+</button>
                                quantity:{product.quantity}
                                <button onClick={() => dispatch({
                                    type: 'decrease',
                                    id: product.id,
                                    value: product.quantity,
                                })}
                                >-</button>
                            </p>
                            <p>Price: ${(product.price * product.quantity)}
                            </p>
                        </div>)
                    }
                    <hr />
                    <h4>Grant-total: ${grandTotal}</h4>
                </div>
            </div>
        </div>
    );
};

export default Home;