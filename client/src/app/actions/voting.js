import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';

import Voting from '../../contracts/Voting.json';

export const setIsAdmin = createAction('voting/setIsAdmin');
export const setIsVoter = createAction('voting/setIsVoter');
export const setIsUnRegistered = createAction('voting/setIsUnRegistered');



export const setDisplayId = createAction('voting/setDisplayId');

export const setAddVoterInput = createAction('voting/setAddVoterInput');
export const getRegisteredVoterEvents = createAction('voting/getRegisteredVoterEvents');
export const addRegisteredVoterEvents = createAction('voting/addRegisteredVoterEvents');

export const testGetVoters = createAsyncThunk('voting/testGetVoters', async () => {
  const web3 = new Web3(window.ethereum);
  const instance = new web3.eth.Contract(Voting.abi, Voting.networks[3].address);
  const registeredVotersEvents = await instance.getPastEvents('VoterRegistered', { fromBlock: 12549297, toBlock: 'latest'});
  return registeredVotersEvents;
});
