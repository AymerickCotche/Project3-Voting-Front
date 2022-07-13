import { useDispatch, useSelector } from 'react-redux';

import styles from './VoteActions.module.scss';
import VotersRegistration from './VotersRegistration';
import ProposalsRegistration from './ProposalsRegistration';
import VotesRegistration from './VotesRegistration';
import VoteResult from './VoteResult';

const VoteActions = () => {
  const currentDisplay = useSelector((state) => state.voting.currentDisplay);
  return (
    <div className={styles.voteActions}>
      {
        currentDisplay === "0" &&
        <VotersRegistration/>
      }
      {
        currentDisplay === "1" &&
        <ProposalsRegistration/>
      }
      {
        currentDisplay === "3" &&
        <VotesRegistration/>
      }
      {
        currentDisplay === "5" &&
        <VoteResult/>
      }
    </div>
  )
}

export default VoteActions
