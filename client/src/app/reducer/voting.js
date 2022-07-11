import { createReducer } from '@reduxjs/toolkit';

import {
  setIsAdmin,
  setDisplayId
} from '../actions/voting';

const initialState = {
  isAdmin: false,
  isVoter: false,
  accountType: 'Not registered',
  workflowStatus: [
    {
      id: 0,
      name: 'Voters registration',
      status: 'Open'
    },
    {
      id: 1,
      name: 'Proposals registration',
      status: 'Close'
    },
    {
      id: 2,
      name: 'Votes registration',
      status: 'Close'
    },
    {
      id: 3,
      name: 'Vote result',
      status: 'Close'
    }
  ],
  currentDisplay : 0
};

export const votingReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setIsAdmin, (state) => {
    state.isAdmin = true;
    state.accountType = 'administrator';
  }).addCase(setDisplayId, (state, action) => {
    state.currentDisplay = action.payload;
  });
});

export default votingReducer;