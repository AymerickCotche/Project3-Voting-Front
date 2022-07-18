import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProposal, startVoteRegistration, endVoteRegistration } from '../../../app/actions/voting';

import styles from './VotesRegistration.module.scss';

const VotesRegistration = () => {

  const dispatch = useDispatch();
  
  const address = useSelector((state) => state.web3.address);
  const instance = useSelector((state) => state.web3.instance);

  const isAdmin = useSelector((state) => state.voting.isAdmin);
  const isVoter = useSelector((state) => state.voting.isVoter);
  const accountType= useSelector((state) => state.voting.accountType);
  const registeredProposalEvents = useSelector((state) => state.voting.registeredProposalEvents);
  const proposals = useSelector((state) => state.voting.proposals);

  useEffect(() => {
      if(isVoter) {
      const getProposals = async () => {
      let tempProposals = [];
      for(const element of registeredProposalEvents) {
        let proposal = await instance.methods.getOneProposal(element.returnValues.proposalId).call({from: address});
        tempProposals.push(proposal);
      }
      dispatch(getProposal(tempProposals));
    }
    getProposals();
    }
  }, [])
  

  const handleClickStartVoteRegistration = async () => {
    await instance.methods.startVotingSession().send({from: address});
    dispatch(startVoteRegistration());
  }

  const handleClickEndVoteRegistration = async () => {
    await instance.methods.endVotingSession().send({from: address});
    dispatch(endVoteRegistration());
  }

  const handleClickVote = async (id) => {
    await instance.methods.setVote(id).send({from:address});
  }

  const ejsProposalsList = proposals.map((proposal, index) => (
    <li key={index} className={styles.votesRegistration__list__item}>
      {index + 1}. {proposal[0]} - <button onClick={() => handleClickVote(index)}>Vote</button>
    </li>
  ))
  return (
    <div className={styles.votesRegistration}>
      <div>
        <h2 className={styles.votesRegistration__title}>Vote Registration</h2>
        <div className={styles.votesRegistration__content}>
          {isAdmin && 
            <button onClick={handleClickStartVoteRegistration}>Start vote registration</button>
          }
          {isVoter &&
            <div>
              <h3>Proposals list :</h3>
              <ol className={styles.votesRegistration__list}>
                {ejsProposalsList}
              </ol>
            </div>
          }
          {accountType === 'Not registered' && 
            <p>Only administrator or voter can access to this page.
              Please connect with an administrator or a voter account
            </p>
          }
        </div>

        {isAdmin && 
          <button className={styles.votesRegistration__endBtn} onClick={handleClickEndVoteRegistration}>End vote registration</button>
        }
        
      </div>
        
    </div>
  )
}

export default VotesRegistration
