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
  }, [])
  const handleClickStartVoteRegistration = async () => {
    await instance.methods.tallyVotes().send({from: address})
    .on('receipt', (receipt) => {
      dispatch(addOneEvent(receipt.events.WinnerSet));
    });
  }

  return (
    <div className={styles.voteResult}>
      <div>
        <h2>Vote Result</h2>

        {isAdmin && 
          <button onClick={handleClickStartVoteRegistration}>Get winner</button>
        }
        {isVoter &&
        <div>
          <h3>Winner is :</h3>
          <p>{winner.desc}</p>
          <p>{winner.voteCount} votes</p>   
        </div>
          
        }
        
      </div>

      
    </div>
  )
}

export default VoteResult
