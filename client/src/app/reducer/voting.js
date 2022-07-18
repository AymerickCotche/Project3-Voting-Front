import { createReducer } from '@reduxjs/toolkit';

import {
  setIsAdmin,
  setIsVoter,
  setIsUnRegistered,
  setDisplayId,
  setAddVoterInput,
  getRegisteredVoterEvents,
  addRegisteredVoterEvents,
  setAddProposalInput,
  getAllEvents,
  addOneEvent,
  getRegisteredProposalEvents,
  addRegisteredProposalEvents,
  startProposalsRegistration,
  endProposalRegistration,
  getCurrentVotePhase,
  getProposal,
  startVoteRegistration,
  endVoteRegistration,
  formateEvents,
  setWinner,
  setEventsLoading,
  cleanAllEvents,
  cleanDisplayedEvents,
  toggleStartFormateEvents,
} from '../actions/voting';

const initialState = {
  isAdmin: false,
  isVoter: false,
  accountType: 'Not registered',
  workflowStatus: [
    {
      id: "0",
      name: 'Voters registration',
    },
    {
      id: "1",
      name: 'Proposals registration',
    },
    {
      id: "3",
      name: 'Votes registration',
    },
    {
      id: "5",
      name: 'Vote result',
    }
  ],
  currentVotePhase: "",
  currentDisplay : "0",
  allEvents: [],
  displayedEvents: [],
  eventLoading: false,
  addVoterInput: '',
  registeredVoterEvents: [],
  addProposalInput: '',
  registeredProposalEvents: [],
  proposals: [],
  winner: {},
  startFormateEvents: false
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
  .addCase(addRegisteredVoterEvents, (state, action) => {
    state.registeredVoterEvents = [...state.registeredVoterEvents, action.payload];
  })
  .addCase(getAllEvents.pending, (state) => {
    console.log('pending');
  })
  .addCase(getAllEvents.fulfilled, (state, action) => {
    state.allEvents = [];
    state.allEvents = action.payload;
    state.startFormateEvents = true;
  })
  .addCase(getAllEvents.rejected, (state) => {
    console.log('error');
  })
  .addCase(addOneEvent, (state) => {
    state.allEvents = [...state.allEvents, action.payload];
  })
  .addCase(getRegisteredVoterEvents.pending, (state) => {
    console.log('pending');
  })
  .addCase(getRegisteredVoterEvents.fulfilled, (state, action) => {
    state.registeredVoterEvents = action.payload;
  })
  .addCase(getRegisteredVoterEvents.rejected, (state) => {
    console.log('error');
  })
  .addCase(setAddProposalInput, (state, action) => {
    state.addProposalInput = action.payload;
  })
  .addCase(getRegisteredProposalEvents.pending, (state) => {
    console.log('pending');
  })
  .addCase(getRegisteredProposalEvents.fulfilled, (state, action) => {
    state.registeredProposalEvents = action.payload;
  })
  .addCase(getRegisteredProposalEvents.rejected, (state) => {
    console.log('error');
  })
  .addCase(addRegisteredProposalEvents, (state, action) => {
    state.registeredProposalEvents = [...state.registeredProposalEvents, action.payload];
  })
  .addCase(getCurrentVotePhase.rejected, (state) => {
    console.log('error');
  })
  .addCase(getCurrentVotePhase.fulfilled, (state, action) => {
    state.currentVotePhase = action.payload;
  })
  .addCase(getCurrentVotePhase.pending, (state) => {
    console.log('pending');
  })
  .addCase(startProposalsRegistration, (state) => {
    state.currentVotePhase = "1";
  })
  .addCase(endProposalRegistration, (state) => {
    state.currentVotePhase = "2";
  })
  .addCase(startVoteRegistration, (state) => {
    state.currentVotePhase = "3";
  })
  .addCase(endVoteRegistration, (state) => {
    state.currentVotePhase = "4";
  })
  .addCase(getProposal, (state, action) => {
    state.proposals = [];
    state.proposals = action.payload;
  })
  .addCase(formateEvents, (state, action) => {
    state.displayedEvents = [...state.displayedEvents, action.payload];
  })
  .addCase(cleanAllEvents, (state) => {
    state.allEvents = [];
  })
  .addCase(cleanDisplayedEvents, (state) => {
    state.displayedEvents = [];
  })
  .addCase(setWinner, (state, action) => {
    state.winner = action.payload;
  })
  .addCase(setEventsLoading, (state, action) => {
    state.eventLoading = action.payload;
  })
  .addCase(toggleStartFormateEvents, (state, action) => {
    state.startFormateEvents = action.payload;
  });
});

export default votingReducer;