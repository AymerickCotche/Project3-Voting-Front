import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addOneEvent, setWinner } from '../../../app/actions/voting';

import styles from './VoteResult.module.scss';

const VoteResult = () => {

  const dispatch = useDispatch();
  
  const address = useSelector((state) => state.web3.address);
  const instance = useSelector((state) => state.web3.instance);

  const isAdmin = useSelector((state) => state.voting.isAdmin);
  const isVoter = useSelector((state) => state.voting.isVoter);
  const accountType= useSelector((state) => state.voting.accountType);
  const allEvents = useSelector((state) => state.voting.allEvents);
  const winner = useSelector((state) => state.voting.winner);

  useEffect(() => {
    if (isVoter) {
      const getWinner = async () => {
        const winnerEvent = allEvents.find((scEvent) => (
          scEvent.event === "WinnerSet"
        ))
        if(winnerEvent) {
          const winner = await instance.methods.getOneProposal(winnerEvent.returnValues.winnerId).call({from: address});
          dispatch(setWinner({
            desc: winner[0],
            voteCount: winner[1]
          }));
        }
        
      }
      getWinner();
    }
  }, [address])
  const handleClickStartVoteRegistration = async () => {
    await instance.methods.tallyVotes().send({from: address})
    .on('receipt', (receipt) => {
      dispatch(addOneEvent(receipt.events.WinnerSet));
    });
  }

  return (
    <div className={styles.voteResult}>
      
      <h2 className={styles.voteResult__title}>Vote Result</h2>

      <div className={styles.voteResult__content}>
        {isAdmin && 
          <button onClick={handleClickStartVoteRegistration}>Get winner</button>
        }
        {isVoter &&
          <div className={styles.voteResult__content__winner}>
            <h3 className={styles.voteResult__content__winner__title}>Proposal with more vote is :</h3>
            <div className={styles.voteResult__content__winner__area} >
              <p className={styles.voteResult__content__winner__area__desc}>{winner.desc}</p>
              <p className={styles.voteResult__content__winner__area__votecount}>{winner.voteCount} votes</p>   
            </div>
          </div>
          
        }
        {accountType === 'Not registered' && 
          <p>Only administrator or voter can access to this page.
            Please connect with an administrator or a voter account
          </p>
        }
      </div>      
    </div>
  )
}

export default VoteResult
