import Image from 'next/image';
import styles from './Main.module.scss';
import Events from '../Events';
import VoteActions from '../VoteActions';
import Workflow from '../Workflow';

const Main = () => {
  return (
   <div className={styles.main}>
      <div className={styles.main__voteArea}>
        <Workflow/>
        <VoteActions/>
      </div>
      <div className={styles.main__eventsArea}>
        <Events/>
      </div>
   </div>
  )
}

export default Main
