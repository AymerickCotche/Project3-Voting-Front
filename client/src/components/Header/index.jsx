import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { connectMetamask, checkMetamaskInstall, checkMetamaskInit, saveChainId, saveAccountAddress, saveWeb3, saveInstance } from '../../app/actions/web3';
import Link from 'next/link';
import Web3 from 'web3';

import Voting from '../../contracts/Voting.json';
import styles from './Header.module.scss';

const Header = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkMetamaskInstall());
  }, [])

  const mmInstalled = useSelector((state) => state.web3.metamask.isInstalled);
  const mmIninitialized = useSelector((state) => state.web3.metamask.isInitialized);
  const errorMessage = useSelector((state) => state.web3.metamask.errorMessage);
  const userAddress = useSelector((state) => state.web3.address);
  const mmConnected = useSelector((state) => state.web3.metamask.isConnected);
  
  const handleClick = async () => {
    dispatch(checkMetamaskInit());
    await dispatch(connectMetamask());
    dispatch(saveChainId(window.ethereum.chainId));
    await dispatch(saveAccountAddress());
    const web3 = new Web3(window.ethereum);
    const instance = new web3.eth.Contract(Voting.abi, Voting.networks[3].address);
    await dispatch(saveWeb3(web3));
    await dispatch(saveInstance(instance));
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
          <p>{`Address : ${userAddress.slice(0,6)}...${userAddress.slice(-5)}`}</p>
        }
        {!mmIninitialized && <p>{errorMessage}</p>}
      </div>
      
    </header>
  )
}

export default Header
