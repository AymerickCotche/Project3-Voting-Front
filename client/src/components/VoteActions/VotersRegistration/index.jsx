import { useDispatch, useSelector } from 'react-redux';
import { setAddVoterInput, getRegisteredVoterEvents, addRegisteredVoterEvents } from '../../../app/actions/voting';

import styles from './VotersRegistration.module.scss';

const VotersRegistration = () => {

  const dispatch = useDispatch();

  const address = useSelector((state) => state.web3.address);
  const instance = useSelector((state) => state.web3.instance);

  const isAdmin = useSelector((state) => state.voting.isAdmin);
  const voterInputValue = useSelector((state) => state.voting.addVoterInput);
  const registeredVoterEvents = useSelector((state) => state.voting.registeredVoterEvents);

  const handleChangeAddVoter = (e) => {
    dispatch(setAddVoterInput(e.target.value));
  }

  const handleClickSetVoter = async () => {
    await instance.methods.addVoter(voterInputValue).send({from: address})
    .on('receipt', (receipt) => {
      console.log(receipt);
      dispatch(addRegisteredVoterEvents(receipt.events.VoterRegistered));
    });
    dispatch(setAddVoterInput(''));
  }

  const ejsVotersList = registeredVoterEvents.map((registeredVoterEvent, index) => (
    <li key={registeredVoterEvent.id}>
      {index + 1}. {registeredVoterEvent.returnValues.voterAddress}
    </li>
  ))

  return (
    <div className={styles.votersRegistration}>
      {isAdmin &&
      <div>
        <h3>Add addresses to the list of voters</h3>
        <div>
          <input
            type="text"
            placeholder="add voter's address"
            onChange={handleChangeAddVoter}
            value={voterInputValue}
          />
          <button onClick={handleClickSetVoter}>add voter</button>
        </div>
        <div>
          <h3>Voters list :</h3>
          <ol>
            {ejsVotersList}
          </ol>
        </div>
        <button>End voters registration</button>
      </div>
        

      }
      {!isAdmin &&
       <div>
        <p>Only administrator can access to this action.</p>
        <p>Please connect with admin account, or wait untill administrator start the next voting step.</p>
       </div>
        
      }
    </div>
  )
}

export default VotersRegistration
