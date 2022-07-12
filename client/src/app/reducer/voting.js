import { createReducer } from '@reduxjs/toolkit';

import {
  setIsAdmin,
  setIsVoter,
  setIsUnRegistered,
  setDisplayId,
  setAddVoterInput,
  getRegisteredVoterEvents,
  addRegisteredVoterEvents,
  testGetVoters
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
  currentDisplay : 0,
  addVoterInput: '',
  registeredVoterEvents: [],
};

export const votingReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setIsAdmin, (state, action) => {
    state.isAdmin = action.payload;
    state.accountType = 'Administrator';
  })
  .addCase(setIsVoter, (state, action) => {
    state.isVoter = action.payload;
    state.accountType = 'Voter';
  })
  .addCase(setIsUnRegistered, (state) => {
    state.accountType = 'Not registered';
  })
  .addCase(setDisplayId, (state, action) => {
    state.currentDisplay = action.payload;
  })
  .addCase(setAddVoterInput, (state, action) => {
    state.addVoterInput = action.payload;
  })
  .addCase(getRegisteredVoterEvents, (state, action) => {
    state.registeredVoterEvents = action.payload;
  })
  .addCase(addRegisteredVoterEvents, (state, action) => {
    state.registeredVoterEvents = [...state.registeredVoterEvents, action.payload];
  })
  .addCase(testGetVoters.pending, (state) => {
    console.log('pending');
  })
  .addCase(testGetVoters.fulfilled, (state, action) => {
    state.registeredVoterEvents = action.payload;
  })
  .addCase(testGetVoters.rejected, (state) => {
    console.log('error');
  });
});

export default votingReducer;