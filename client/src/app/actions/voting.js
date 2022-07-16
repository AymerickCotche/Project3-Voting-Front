import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';

import Voting from '../../contracts/Voting.json';

export const setIsAdmin = createAction('voting/setIsAdmin');
export const setIsVoter = createAction('voting/setIsVoter');
export const setIsUnRegistered = createAction('voting/setIsUnRegistered');

export const setDisplayId = createAction('voting/setDisplayId');
export const getCurrentVotePhase = createAsyncThunk('voting/getCurrentVotePhase', async () => {
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(Voting.abi, Voting.networks[3].address);
  const currentVotePhase = await instance.methods.workflowStatus().call();
  return currentVotePhase;
});
export const toggleWorkflowPhases = createAction('voting/toggleWorkflowPhases');

export const setAddVoterInput = createAction('voting/setAddVoterInput');
export const addRegisteredVoterEvents = createAction('voting/addRegisteredVoterEvents');

export const getRegisteredVoterEvents = createAsyncThunk('voting/getRegisteredVoterEvents', async () => {
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(Voting.abi, Voting.networks[3].address);
  const registeredVotersEvents = await instance.getPastEvents('VoterRegistered', { fromBlock: 12549297, toBlock: 'latest'});
  return registeredVotersEvents;
});

export const getAllEvents = createAsyncThunk('voting/getAllEvents', async () => {
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(Voting.abi, Voting.networks[3].address);
  const workflowStatusChangeEvents = await instance.getPastEvents('WorkflowStatusChange', { fromBlock: 12549297, toBlock: 'latest'});
  const registeredVotersEvents = await instance.getPastEvents('VoterRegistered', { fromBlock: 12549297, toBlock: 'latest'});
  const registeredProposalEvents = await instance.getPastEvents('ProposalRegistered', { fromBlock: 12549297, toBlock: 'latest'});
  const registeredvoteEvents = await instance.getPastEvents('Voted', { fromBlock: 12549297, toBlock: 'latest'});
  const winnerSetEvent = await instance.getPastEvents('WinnerSet', { fromBlock: 12549297, toBlock: 'latest'});

  return [...workflowStatusChangeEvents, ...registeredVotersEvents, ...registeredProposalEvents, ...registeredvoteEvents, ...winnerSetEvent];
});
export const addOneEvent = createAction('voting/addOneEvent');
export const formateEvents = createAction('voting/formateEvents');

export const startProposalRegistration = createAction('voting/startProposalRegistration');
export const endProposalRegistration = createAction('voting/endProposalRegistration');
export const startVoteRegistration = createAction('voting/startVoteRegistration');
export const endVoteRegistration = createAction('voting/endVoteRegistration');

export const setAddProposalInput = createAction('voting/setAddProposalInput');
export const addRegisteredProposalEvents = createAction('voting/addRegisteredProposalEvents');
export const getRegisteredProposalEvents = createAsyncThunk('voting/getRegisteredProposalEvents', async () => {
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(Voting.abi, Voting.networks[3].address);
  const registeredProposalEvents = await instance.getPastEvents('ProposalRegistered', { fromBlock: 12549297, toBlock: 'latest'});
  return registeredProposalEvents;
});

export const setEventsLoading = createAction('voting/setEventsLoading');
export const getProposal = createAction('voting/getProposal');
export const setWinner = createAction('voting/setWinner');
