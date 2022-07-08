import Image from 'next/image';
import styles from './Main.module.scss';

const Main = () => {
  return (
   <div className={styles.main}>
     <h2 className={styles.main__title}>Voting DAPP</h2>
     <div className={styles.main__content}>       
      
       <div className={styles.main__content__text}>
         <h3>Vote Action</h3>
         <p>Please note that each phase will be unlock when the previous one will be ended by administrator.</p>
       </div>
     </div>
   </div>
  )
}

export default Main
