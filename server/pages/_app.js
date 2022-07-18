"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9546:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
;// CONCATENATED MODULE: external "next-redux-wrapper"
const external_next_redux_wrapper_namespaceObject = require("next-redux-wrapper");
// EXTERNAL MODULE: ./src/app/actions/web3.js
var web3 = __webpack_require__(4836);
;// CONCATENATED MODULE: ./src/app/reducer/web3.js


const initialState = {
  metamask: {
    isInstalled: false,
    isConnected: false,
    isOnRightChain: false,
    errorMessage: ''
  },
  chainId: '',
  address: '',
  pending: false,
  error: false,
  web3: {},
  instance: {}
};
const web3Reducer = (0,toolkit_.createReducer)(initialState, builder => {
  builder.addCase(web3/* connectMetamask.pending */.gh.pending, state => {
    state.pending = true;
  }).addCase(web3/* connectMetamask.fulfilled */.gh.fulfilled, (state, action) => {
    state.pending = false;
    state.metamask.isConnected = true;
    state.address = action.payload;
  }).addCase(web3/* connectMetamask.rejected */.gh.rejected, state => {
    state.pending = false;
    state.error = true;
  }).addCase(web3/* checkChainId.pending */.sq.pending, state => {
    state.pending = true;
  }).addCase(web3/* checkChainId.fulfilled */.sq.fulfilled, state => {
    state.pending = false;
    state.metamask.isOnRightChain = true;
  }).addCase(web3/* checkChainId.rejected */.sq.rejected, state => {
    state.pending = false;
    state.error = true;
  }).addCase(web3/* checkMetamaskInstall */.Ud, state => {
    if (window.ethereum && window.ethereum.isMetaMask) state.metamask.isInstalled = true;
  }).addCase(web3/* checkMetamaskInit */.wx, state => {
    if (window.ethereum._state.initialized) {
      state.metamask.isInitialized = true;
    } else {
      setTimeout(() => window.location.reload(), 5000);
      state.metamask.isInitialized = false;
      state.metamask.errorMessage = "Metamask is not fully initialize, the page will reload in 5 seconds";
    }

    ;
  }).addCase(web3/* saveAccountAddress.rejected */.Iq.rejected, state => {
    state.pending = false;
    state.error = true;
  }).addCase(web3/* saveAccountAddress.pending */.Iq.pending, state => {
    state.pending = false;
  }).addCase(web3/* saveAccountAddress.fulfilled */.Iq.fulfilled, (state, {
    payload
  }) => {
    state.pending = false;
    state.address = payload;
  }).addCase(web3/* saveChainId */.$w, (state, {
    payload
  }) => {
    state.chainId = payload;
  }).addCase(web3/* saveWeb3 */.C7, (state, {
    payload
  }) => {
    state.web3 = payload;
  }).addCase(web3/* saveInstance */.yr, (state, {
    payload
  }) => {
    state.instance = payload;
  });
});
/* harmony default export */ const reducer_web3 = (web3Reducer);
// EXTERNAL MODULE: ./src/app/actions/voting.js
var voting = __webpack_require__(7570);
;// CONCATENATED MODULE: ./src/app/reducer/voting.js


const voting_initialState = {
  isAdmin: false,
  isVoter: false,
  accountType: 'Not registered',
  workflowStatus: [{
    id: "0",
    name: 'Voters registration'
  }, {
    id: "1",
    name: 'Proposals registration'
  }, {
    id: "3",
    name: 'Votes registration'
  }, {
    id: "5",
    name: 'Vote result'
  }],
  currentVotePhase: "",
  currentDisplay: "0",
  allEvents: [],
  displayedEvents: [],
  eventLoading: false,
  addVoterInput: '',
  registeredVoterEvents: [],
  addProposalInput: '',
  registeredProposalEvents: [],
  proposals: [],
  winner: {}
};
const votingReducer = (0,toolkit_.createReducer)(voting_initialState, builder => {
  builder.addCase(voting/* setIsAdmin */.nZ, (state, action) => {
    state.isAdmin = action.payload;
    state.accountType = 'Administrator';
  }).addCase(voting/* setIsVoter */.gs, (state, action) => {
    state.isVoter = action.payload;
    state.accountType = 'Voter';
  }).addCase(voting/* setIsUnRegistered */.m7, state => {
    state.accountType = 'Not registered';
  }).addCase(voting/* setDisplayId */.Vu, (state, action) => {
    state.currentDisplay = action.payload;
  }).addCase(voting/* setAddVoterInput */.Di, (state, action) => {
    state.addVoterInput = action.payload;
  }).addCase(voting/* addRegisteredVoterEvents */.$L, (state, action) => {
    state.registeredVoterEvents = [...state.registeredVoterEvents, action.payload];
  }).addCase(voting/* getAllEvents.pending */.IP.pending, state => {
    console.log('pending');
  }).addCase(voting/* getAllEvents.fulfilled */.IP.fulfilled, (state, action) => {
    state.allEvents = [];
    state.allEvents = action.payload;
  }).addCase(voting/* getAllEvents.rejected */.IP.rejected, state => {
    console.log('error');
  }).addCase(voting/* addOneEvent */.Rw, state => {
    state.allEvents = [...state.allEvents, action.payload];
  }).addCase(voting/* getRegisteredVoterEvents.pending */.jL.pending, state => {
    console.log('pending');
  }).addCase(voting/* getRegisteredVoterEvents.fulfilled */.jL.fulfilled, (state, action) => {
    state.registeredVoterEvents = action.payload;
  }).addCase(voting/* getRegisteredVoterEvents.rejected */.jL.rejected, state => {
    console.log('error');
  }).addCase(voting/* setAddProposalInput */.ZS, (state, action) => {
    state.addProposalInput = action.payload;
  }).addCase(voting/* getRegisteredProposalEvents.pending */.jr.pending, state => {
    console.log('pending');
  }).addCase(voting/* getRegisteredProposalEvents.fulfilled */.jr.fulfilled, (state, action) => {
    state.registeredProposalEvents = action.payload;
  }).addCase(voting/* getRegisteredProposalEvents.rejected */.jr.rejected, state => {
    console.log('error');
  }).addCase(voting/* addRegisteredProposalEvents */.L8, (state, action) => {
    state.registeredProposalEvents = [...state.registeredProposalEvents, action.payload];
  }).addCase(voting/* getCurrentVotePhase.rejected */.cf.rejected, state => {
    console.log('error');
  }).addCase(voting/* getCurrentVotePhase.fulfilled */.cf.fulfilled, (state, action) => {
    state.currentVotePhase = action.payload;
  }).addCase(voting/* getCurrentVotePhase.pending */.cf.pending, state => {
    console.log('pending');
  }).addCase(voting/* startProposalRegistration */.$Y, state => {
    state.currentVotePhase = "1";
  }).addCase(voting/* endProposalRegistration */.rn, state => {
    state.currentVotePhase = "2";
  }).addCase(voting/* startVoteRegistration */.MB, state => {
    state.currentVotePhase = "3";
  }).addCase(voting/* endVoteRegistration */.Qz, state => {
    state.currentVotePhase = "4";
  }).addCase(voting/* getProposal */.pU, (state, action) => {
    state.proposals = [];
    state.proposals = action.payload;
  }).addCase(voting/* formateEvents */.Dp, (state, action) => {
    state.displayedEvents = [...state.displayedEvents, action.payload];
  }).addCase(voting/* cleanEvents */.wd, state => {
    state.displayedEvents = [];
  }).addCase(voting/* setWinner */.Xs, (state, action) => {
    state.winner = action.payload;
  }).addCase(voting/* setEventsLoading */.Hz, (state, action) => {
    state.eventLoading = action.payload;
  });
});
/* harmony default export */ const reducer_voting = (votingReducer);
;// CONCATENATED MODULE: ./src/app/reducer/index.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const rootReducer = (0,toolkit_.combineReducers)({
  web3: reducer_web3,
  voting: reducer_voting
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = _objectSpread(_objectSpread({}, state), action.payload);

    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

/* harmony default export */ const app_reducer = (rootReducer);
;// CONCATENATED MODULE: ./src/app/store/index.js



const makeStore = () => (0,toolkit_.configureStore)({
  reducer: app_reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});
const wrapper = (0,external_next_redux_wrapper_namespaceObject.createWrapper)(makeStore, {
  debug: true
});
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./src/pages/_app.jsx
function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _app_ownKeys(Object(source), !0).forEach(function (key) { _app_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(Component, _app_objectSpread({}, pageProps));
}

/* harmony default export */ const _app = (wrapper.withRedux(MyApp));

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 8519:
/***/ ((module) => {

module.exports = require("web3");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [756], () => (__webpack_exec__(9546)));
module.exports = __webpack_exports__;

})();