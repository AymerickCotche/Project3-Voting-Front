import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { connectMetamask, checkMetamaskInstall, checkMetamaskInit, saveChainId, saveAccountAddress, saveWeb3, saveInstance } from '../../app/actions/web3';
import { getRegisteredVoterEvents, setIsUnRegistered, getRegisteredProposalEvents, getCurrentVotePhase, getAllEvents } from '../../app/actions/voting';
import { setIsAdmin, setIsVoter } from '../../app/actions/voting';
import Link from 'next/link';
import Web3 from 'web3';

import Voting from '../../contracts/Voting.json';
import styles from './Header.module.scss';

const Header = () => {

  const dispatch = useDispatch();

  const mmInstalled = useSelector((state) => state.web3.metamask.isInstalled);
  const mmIninitialized = useSelector((state) => state.web3.metamask.isInitialized);
  const errorMessage = useSelector((state) => state.web3.metamask.errorMessage);
  const userAddress = useSelector((state) => state.web3.address);
  const mmConnected = useSelector((state) => state.web3.metamask.isConnected);

  const accountType = useSelector((state) => state.voting.accountType);
  const isAdmin = useSelector((state) => state.voting.isAdmin);
  const isVoter = useSelector((state) => state.voting.isVoter);
  const registeredVoterEvents = useSelector((state) => state.voting.registeredVoterEvents);


  useEffect(() => {
    dispatch(checkMetamaskInstall());
  }, [])

  useEffect(() => {
    if (mmConnected) {
      window.ethereum.on("accountsChanged", () => {
        dispatch(saveAccountAddress());
      });
      window.ethereum.on("chainChanged", () => {
        dispatch(saveChainId(window.ethereum.chainId));
        dispatch(saveAccountAddress());
      });
    }
  }, [mmConnected]);

  useEffect(() => {
    if(userAddress === process.env.ownerAddress.toLocaleLowerCase()) {
      
      dispatch(setIsAdmin(true));
      dispatch(setIsVoter(false));
    } else {
      if (isAdmin) dispatch(setIsAdmin(false));
      const findVoter = registeredVoterEvents.find((registeredVoterEvent) => (
        registeredVoterEvent.returnValues.voterAddress.toLocaleLowerCase() === userAddress
      ))
      if (findVoter) {

        dispatch(setIsVoter(true))
      } else {
        if (isAdmin) dispatch(setIsAdmin(false));
        if (isVoter) dispatch(setIsVoter(false));
        dispatch(setIsUnRegistered());
      } ;
    }
  }, [userAddress, registeredVoterEvents])

  
  const handleClick = () => {
    dispatch(checkMetamaskInit());
    dispatch(connectMetamask());
    dispatch(saveChainId(window.ethereum.chainId));
    const web3 = new Web3(window.ethereum);
    const instance = new web3.eth.Contract(Voting.abi, Voting.networks[3].address);
    dispatch(saveWeb3(web3));
    dispatch(saveInstance(instance));
    dispatch(getRegisteredVoterEvents());
    dispatch(getRegisteredProposalEvents());
    dispatch(getCurrentVotePhase());
    dispatch(getAllEvents());
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__infos}>
        <h1 className={styles.header__infos__title}>VOTING</h1>
        <nav className={styles.header__infos__nav}>
          <ul className={styles.header__infos__navlist}>
            <li className={styles.header__infos__nav__item}>
              <Link href="/">
                <a>Accueil</a>
              </Link>
            </li>
            <li className={styles.header__infos__nav__item}>
              <Link href="/event">
                <a>Evenement</a>
              </Link>
            </li>
            <li className={styles.header__infos__nav__item}>
              <Link href="/admin">
                <a>Admin</a>
              </Link>
            </li>                                                          
          </ul>
        </nav>
      </div>
      <div>
        {mmInstalled && !mmConnected &&
          <button
            className={styles.header__btn__connect}
            onClick={handleClick}
          >
            Connect Wallet
          </button>
        }
        {!mmInstalled &&
          <Link  href="https://metamask.io/download/">
            <a className={styles.header__btn__connect}>Click here to install Metamask</a>
          </Link>
        }
        {mmInstalled && mmConnected &&
          <div>
            <p>{`Address : ${userAddress.slice(0,6)}...${userAddress.slice(-5)}`}</p>
            <p>{isAdmin ? 'Account type : Administrator': ''}</p>
            <p>{isVoter ? 'Account type : Voter': ''}</p>
            <p>{!isAdmin && !isVoter ? 'Account type : Not Registered': ''}</p>
          </div>
          
        }
        {!mmIninitialized && <p>{errorMessage}</p>}
      </div>
      
    </header>
  )
}

export default Header
