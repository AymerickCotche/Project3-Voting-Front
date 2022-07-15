import { createReducer } from '@reduxjs/toolkit';

import {
  checkMetamaskInstall,
  checkMetamaskInit,
  connectMetamask,
  checkChainId,
  saveAccountAddress,
  saveChainId,
  saveWeb3,
  saveInstance,
} from '../actions/web3';

const initialState = {
  metamask: {
    isInstalled: false,
    isConnected: false,
    isOnRightChain : false,
    errorMessage: ''
  },
  chainId: '',
  address: '',
  pending: false,
  error: false,
  web3: {},
  instance: {},
};

export const web3Reducer = createReducer(initialState, (builder) => {
  builder
  .addCase(connectMetamask.pending, (state) => {
    state.pending = true;
  })
  .addCase(connectMetamask.fulfilled, (state, action) => {
    state.pending = false;
    state.metamask.isConnected = true;
    state.address = action.payload;
  })
  .addCase(connectMetamask.rejected, (state) => {
    state.pending = false;
    state.error = true;
  })
  .addCase(checkChainId.pending, (state) => {
    state.pending = true;
  })
  .addCase(checkChainId.fulfilled, (state) => {
    state.pending = false;
    state.metamask.isOnRightChain = true;
  })
  .addCase(checkChainId.rejected, (state) => {
    state.pending = false;
    state.error = true;
  })
  .addCase(checkMetamaskInstall, (state) => {
    if (window.ethereum && window.ethereum.isMetaMask) state.metamask.isInstalled = true;
  })
  .addCase(checkMetamaskInit, (state) => {
    if (window.ethereum._state.initialized) {
      state.metamask.isInitialized = true;
    } else {
      setTimeout(() => window.location.reload(), 5000);
      state.metamask.isInitialized = false;
      state.metamask.errorMessage = "Metamask is not fully initialize, the page will reload in 5 seconds";
    };
  })
  .addCase(saveAccountAddress.rejected, (state) => {
    state.pending = false;
    state.error = true;
  })
  .addCase(saveAccountAddress.pending, (state) => {
    state.pending = false;
  })
  .addCase(saveAccountAddress.fulfilled, (state, {payload}) => {
    state.pending = false;
    state.address = payload;
  })
  .addCase(saveChainId, (state, {payload}) => {
    state.chainId = payload;
  }).addCase(saveWeb3, (state, {payload}) => {
    state.web3 = payload;
  }).addCase(saveInstance, (state, {payload}) => {
    state.instance = payload;
  });
});

export default web3Reducer;