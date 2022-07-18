import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProposal, setAddProposalInput, addRegisteredProposalEvents, startProposalsRegistration, endProposalRegistration } from '../../../app/actions/voting';
import styles from './ProposalsRegistration.module.scss';

const ProposalsRegistration = () => {

  const dispatch = useDispatch();

  const address = useSelector((state) => state.web3.address);
  const instance = useSelector((state) => state.web3.instance);

  const isAdmin = useSelector((state) => state.voting.isAdmin);
  const isVoter = useSelector((state) => state.voting.isVoter);
  const accountType= useSelector((state) => state.voting.accountType);
  const proposalInputValue = useSelector((state) => state.voting.addProposalInput);
  const registeredProposalEvents = useSelector((state) => state.voting.registeredProposalEvents);
  const proposals = useSelector((state) => state.voting.proposals);


  useEffect(() => {
      const getProposals = async () => {
      let tempProposals = [];
      for(const element of registeredProposalEvents) {
        let proposal = await instance.methods.getOneProposal(element.returnValues.proposalId).call({from: address});
        tempProposals.push(proposal);
      }
      dispatch(getProposal(tempProposals));
    }
    if(isVoter) {
      getProposals();
    }
    
    
  }, [registeredProposalEvents])

  const handleChangeAddProposal = (e) => {
    dispatch(setAddProposalInput(e.target.value));
  }

  const handleClickAddProposal = async () => {
    
    await instance.methods.addProposal(proposalInputValue).send({from: address})
    .on('receipt', (receipt) => {
      dispatch(setAddProposalInput(''));
      dispatch(addRegisteredProposalEvents(receipt.events.ProposalRegistered));
    });
    
  }

  const handleClickStartProposalRegistration = async () => {
    await instance.methods.startProposalsRegistering().send({from: address});
    dispatch(startProposalsRegistration());
  }

  const handleClickEndProposalRegistration = async () => {
    await instance.methods.endProposalsRegistering().send({from: address});
    dispatch(endProposalRegistration());
  }

  const ejsProposalsList = proposals.map((proposal, index) => (
    <li key={index} className={styles.proposalsRegistration__list__item}>
      {index + 1}. {proposal[0]}
    </li>
  ))

  return (
    <div className={styles.proposalsRegistration}>
      
      <div>
        <h2 className={styles.proposalsRegistration__title}>Proposals Registration</h2>
        <div className={styles.proposalsRegistration__content}>
          {isAdmin && 
            <button onClick={handleClickStartProposalRegistration}>Start proposals registration</button>
          }
          {isVoter &&
            <div>
              <h3>Add proposal to the list</h3>

              <div className={styles.proposalsRegistration__addForm}>
                <input
                  type="text"
                  placeholder="description"
                  onChange={handleChangeAddProposal}
                  value={proposalInputValue}
                />
                <button onClick={handleClickAddProposal}>add proposal</button>
              </div>
              <div>
                <h3>Proposal list :</h3>
                <ol className={styles.proposalsRegistration__list}>
                  {ejsProposalsList}
                </ol>
              </div>
            </div>
          }
          {accountType === 'Not registered' && 
            <p>Only administrator or voter can access to this page.
              Please connect with an administrator or a voter account
            </p>
          }
        </div>

        {isAdmin && 
          <button className={styles.proposalsRegistration__endBtn} onClick={handleClickEndProposalRegistration}>End proposals registration</button>
        }
      </div>
        
      
    </div>
  )
}

export default ProposalsRegistration
