import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import web3Reducer from './web3';
import votingReducer from './voting';

const rootReducer = combineReducers({
  web3: web3Reducer,
  voting: votingReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export default rootReducer;
