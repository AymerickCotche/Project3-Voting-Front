import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formateEvents } from '../../app/actions/voting';
import styles from './Events.module.scss';




const Events = () => {

  const dispatch = useDispatch();

  const web3 = useSelector((state) => state.web3.web3);
  const instance = useSelector((state) => state.web3.instance);
  const address = useSelector((state) => state.web3.address);
  const allEvents = useSelector((state) => state.voting.allEvents);
  const displayedEvents = useSelector((state) => state.voting.displayedEvents);
  const isVoter = useSelector((state) => state.voting.isVoter);
  const eventIsLoading = useSelector((state) => state.voting.eventIsLoading);

  
  const sortedEvents = _.orderBy(displayedEvents, ['timestamp'],['desc']) 
  
  useEffect(() => {
    if (isVoter) {
      
      const executeFormateEvents = async () => {
        for(const scEvent of allEvents) {
          const {timestamp} = await web3.eth.getBlock(scEvent.blockNumber);
          switch (scEvent.event) {
            case 'WorkflowStatusChange':
              if(scEvent.returnValues.previousStatus === '0') {
                dispatch(formateEvents({
                  timestamp,
                  infos: [`Previous Status: Registering Voters`, `New Status: Proposals Registration Started`]
                }))
              }
              if(scEvent.returnValues.previousStatus === '1') {
                dispatch(formateEvents({
                  timestamp,
                  infos: [`Previous Status: Proposals Registration Started`, `New Status: Proposals Registration Ended`]
                }))
              }
              if(scEvent.returnValues.previousStatus === '1') {
                dispatch(formateEvents({
                  timestamp,
                  infos: [`Previous Status: Proposals Registration Ended`, `New Status: Voting Session Started`]
                }))
              }
              if(scEvent.returnValues.previousStatus === '1') {
                dispatch(formateEvents({
                  timestamp,
                  infos: [`Previous Status: Voting Session Started`, `New Status: Voting Session Endedd`]
                }))
              }
              if(scEvent.returnValues.previousStatus === '1') {
                dispatch(formateEvents({
                  timestamp,
                  infos: [`Previous Status: Voting Session Endedd`, `New Status: Votes Tallied`]
                }))
              }
              
              break;
            case 'VoterRegistered':
              dispatch(formateEvents({
                timestamp,
                infos: [`Voter Registered: ${scEvent.returnValues.voterAddress}`]
              }))
              break;
            case 'ProposalRegistered':
              const proposalRegistered = await instance.methods.getOneProposal(scEvent.returnValues.proposalId).call({from: address});
              dispatch(formateEvents({
                timestamp,
                infos: [`Proposal Registered: ${proposalRegistered[0]}`]
              }))
              break;
            case 'Voted':
              const proposalVoted = await instance.methods.getOneProposal(scEvent.returnValues.proposalId).call({from: address});
              dispatch(formateEvents({
                timestamp,
                infos: [`Voter: ${scEvent.returnValues.voter}`, `Proposal Voted: ${proposalVoted[0]}`]
              }))
              break;
          
            default:
              break;
          }
        }
      }
    executeFormateEvents();
    }
    
  }, [allEvents])

  const getDate = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return date.getDate()+
    "/"+(date.getMonth()+1)+
    "/"+date.getFullYear()+
    " "+date.getHours()+
    ":"+date.getMinutes()+
    ":"+date.getSeconds();
  }
  const ejsdisplayedEvents = sortedEvents.map((displayedEvent) => (
    <div className={styles.events__event}>
      <p className={styles.events__event__time}>{getDate(displayedEvent.timestamp)}</p>
      <ul className={styles.events__event__infos}>
        {displayedEvent.infos.map((info) => (
          <li>{info}</li>
        ))}
      </ul>
    </div>
  ))
  return (
    
    <div className={styles.events}>
      <h2>Lastest events</h2>
      {eventIsLoading && 
        <p>Loading events</p>
      }
      {!eventIsLoading &&
      <div>
        {ejsdisplayedEvents}
      </div>
        
      }
    </div>
  )
}

export default Events
