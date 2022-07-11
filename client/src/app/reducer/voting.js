import { createReducer } from '@reduxjs/toolkit';

import {
  setIsAdmin
} from '../actions/voting';

const initialState = {
  isAdmin: false,
  isVoter: false,
  accountType: 'Not registered',
  workflowStatus: [
    {
      name: 'Voters registration',
      isOpen: false
    },
    {
      name: 'Proposals registration',
      isOpen: false
    },
    {
      name: 'Votes registration',
      isOpen: false
    },
    {
      name: 'Vote result',
      isOpen: false
    }
  ]
};

export const votingReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setIsAdmin, (state) => {
    console.log('la3');
    state.isAdmin = true;
    state.accountType = 'administrator';
  });
});

export default votingReducer;