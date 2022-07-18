"use strict";
exports.id = 756;
exports.ids = [756];
exports.modules = {

/***/ 7570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$L": () => (/* binding */ addRegisteredVoterEvents),
/* harmony export */   "$Y": () => (/* binding */ startProposalRegistration),
/* harmony export */   "Di": () => (/* binding */ setAddVoterInput),
/* harmony export */   "Dp": () => (/* binding */ formateEvents),
/* harmony export */   "Hz": () => (/* binding */ setEventsLoading),
/* harmony export */   "IP": () => (/* binding */ getAllEvents),
/* harmony export */   "L8": () => (/* binding */ addRegisteredProposalEvents),
/* harmony export */   "MB": () => (/* binding */ startVoteRegistration),
/* harmony export */   "Qz": () => (/* binding */ endVoteRegistration),
/* harmony export */   "Rw": () => (/* binding */ addOneEvent),
/* harmony export */   "Vu": () => (/* binding */ setDisplayId),
/* harmony export */   "Xs": () => (/* binding */ setWinner),
/* harmony export */   "ZS": () => (/* binding */ setAddProposalInput),
/* harmony export */   "cf": () => (/* binding */ getCurrentVotePhase),
/* harmony export */   "gs": () => (/* binding */ setIsVoter),
/* harmony export */   "jL": () => (/* binding */ getRegisteredVoterEvents),
/* harmony export */   "jr": () => (/* binding */ getRegisteredProposalEvents),
/* harmony export */   "m7": () => (/* binding */ setIsUnRegistered),
/* harmony export */   "nZ": () => (/* binding */ setIsAdmin),
/* harmony export */   "pU": () => (/* binding */ getProposal),
/* harmony export */   "rn": () => (/* binding */ endProposalRegistration),
/* harmony export */   "wd": () => (/* binding */ cleanEvents)
/* harmony export */ });
/* unused harmony export toggleWorkflowPhases */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8519);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2816);




const setIsAdmin = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setIsAdmin');
const setIsVoter = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setIsVoter');
const setIsUnRegistered = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setIsUnRegistered');
const setDisplayId = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setDisplayId');
const getCurrentVotePhase = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('voting/getCurrentVotePhase', async () => {
  const web3 = new (web3__WEBPACK_IMPORTED_MODULE_1___default())(window.ethereum);
  const instance = new web3.eth.Contract(_contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .abi */ .Mt, _contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .networks[3].address */ .QW[3].Lk);
  const currentVotePhase = await instance.methods.workflowStatus().call();
  return currentVotePhase;
});
const toggleWorkflowPhases = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/toggleWorkflowPhases');
const setAddVoterInput = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setAddVoterInput');
const addRegisteredVoterEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/addRegisteredVoterEvents');
const getRegisteredVoterEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('voting/getRegisteredVoterEvents', async () => {
  const web3 = new (web3__WEBPACK_IMPORTED_MODULE_1___default())(window.ethereum);
  const instance = new web3.eth.Contract(_contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .abi */ .Mt, _contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .networks[3].address */ .QW[3].Lk);
  const registeredVotersEvents = await instance.getPastEvents('VoterRegistered', {
    fromBlock: 12549297,
    toBlock: 'latest'
  });
  return registeredVotersEvents;
});
const getAllEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('voting/getAllEvents', async () => {
  const web3 = new (web3__WEBPACK_IMPORTED_MODULE_1___default())(window.ethereum);
  const instance = new web3.eth.Contract(_contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .abi */ .Mt, _contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .networks[3].address */ .QW[3].Lk);
  const workflowStatusChangeEvents = await instance.getPastEvents('WorkflowStatusChange', {
    fromBlock: 12549297,
    toBlock: 'latest'
  });
  const registeredVotersEvents = await instance.getPastEvents('VoterRegistered', {
    fromBlock: 12549297,
    toBlock: 'latest'
  });
  const registeredProposalEvents = await instance.getPastEvents('ProposalRegistered', {
    fromBlock: 12549297,
    toBlock: 'latest'
  });
  const registeredvoteEvents = await instance.getPastEvents('Voted', {
    fromBlock: 12549297,
    toBlock: 'latest'
  });
  const winnerSetEvent = await instance.getPastEvents('WinnerSet', {
    fromBlock: 12549297,
    toBlock: 'latest'
  });
  return [...workflowStatusChangeEvents, ...registeredVotersEvents, ...registeredProposalEvents, ...registeredvoteEvents, ...winnerSetEvent];
});
const addOneEvent = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/addOneEvent');
const formateEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/formateEvents');
const startProposalRegistration = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/startProposalRegistration');
const endProposalRegistration = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/endProposalRegistration');
const startVoteRegistration = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/startVoteRegistration');
const endVoteRegistration = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/endVoteRegistration');
const setAddProposalInput = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setAddProposalInput');
const addRegisteredProposalEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/addRegisteredProposalEvents');
const getRegisteredProposalEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('voting/getRegisteredProposalEvents', async () => {
  const web3 = new (web3__WEBPACK_IMPORTED_MODULE_1___default())(window.ethereum);
  const instance = new web3.eth.Contract(_contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .abi */ .Mt, _contracts_Voting_json__WEBPACK_IMPORTED_MODULE_2__/* .networks[3].address */ .QW[3].Lk);
  const registeredProposalEvents = await instance.getPastEvents('ProposalRegistered', {
    fromBlock: 12549297,
    toBlock: 'latest'
  });
  return registeredProposalEvents;
});
const setEventsLoading = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setEventsLoading');
const getProposal = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/getProposal');
const setWinner = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/setWinner');
const cleanEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('voting/cleanEvents');

/***/ }),

/***/ 4836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$w": () => (/* binding */ saveChainId),
/* harmony export */   "C7": () => (/* binding */ saveWeb3),
/* harmony export */   "Iq": () => (/* binding */ saveAccountAddress),
/* harmony export */   "Ud": () => (/* binding */ checkMetamaskInstall),
/* harmony export */   "gh": () => (/* binding */ connectMetamask),
/* harmony export */   "sq": () => (/* binding */ checkChainId),
/* harmony export */   "wx": () => (/* binding */ checkMetamaskInit),
/* harmony export */   "yr": () => (/* binding */ saveInstance)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);


const checkMetamaskInstall = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('web3/checkMetamaskInstall');
const checkMetamaskInit = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('web3/checkMetamaskInit');
const saveChainId = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('web3/saveChainId');
const saveWeb3 = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('web3/saveWeb3');
const saveInstance = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)('web3/saveInstance');
const saveAccountAddress = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('web3/saveAccountAddress', async () => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });
  return accounts[0];
});
const connectMetamask = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('web3/connectMetamask', async () => {
  const provider = window.ethereum;
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });
  const chainId = await provider.request({
    method: 'eth_chainId'
  });

  if (chainId === '0x3') {
    return accounts[0];
  } else {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x3'
        }]
      });
      return accounts[0];
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        console.log("This network is not available in your metamask, please add it");
      }

      console.log("Failed to switch to the network");
    }
  }
});
const checkChainId = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('web3/checkChainId', async () => {
  const provider = window.ethereum;
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });
  const chainId = await provider.request({
    method: 'eth_chainId'
  });

  if (chainId === '0x3') {
    return accounts[0];
  } else {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x3'
        }]
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        console.log("This network is not available in your metamask, please add it");
      }

      console.log("Failed to switch to the network");
    }
  }
});

/***/ }),

/***/ 2816:
/***/ ((module) => {

module.exports = JSON.parse('{"Mt":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"ProposalRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"voter","type":"address"},{"indexed":false,"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"voterAddress","type":"address"}],"name":"VoterRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"winnerId","type":"uint256"}],"name":"WinnerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum Voting.WorkflowStatus","name":"previousStatus","type":"uint8"},{"indexed":false,"internalType":"enum Voting.WorkflowStatus","name":"newStatus","type":"uint8"}],"name":"WorkflowStatusChange","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"winningProposalID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"workflowStatus","outputs":[{"internalType":"enum Voting.WorkflowStatus","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getVoter","outputs":[{"components":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"hasVoted","type":"bool"},{"internalType":"uint256","name":"votedProposalId","type":"uint256"}],"internalType":"struct Voting.Voter","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getOneProposal","outputs":[{"components":[{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"internalType":"struct Voting.Proposal","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"addVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_desc","type":"string"}],"name":"addProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"setVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startProposalsRegistering","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endProposalsRegistering","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startVotingSession","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endVotingSession","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tallyVotes","outputs":[],"stateMutability":"nonpayable","type":"function"}],"QW":{"3":{"Lk":"0xA0537BdF098311B62Df0c585ce10Bbe6B0ceFd3a"}}}');

/***/ })

};
;