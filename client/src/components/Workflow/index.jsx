import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayId } from '../../app/actions/voting';
import styles from './Workflow.module.scss';

const Workflow = () => {

  const dispatch = useDispatch();

  const currentVotePhase = useSelector((state) => state.voting.currentVotePhase);
  const workflowStatus = useSelector((state) => state.voting.workflowStatus);
  const currentDisplay = useSelector((state) => state.voting.currentDisplay);


  const changeCurrentDisplay = (index) => {
    dispatch(setDisplayId(index));
  }

  const ejsWorkFlow = workflowStatus.map((workflow) => (
    <li
      key={workflow.id}
      onClick={() => changeCurrentDisplay(workflow.id)}
      className={`
        ${workflow.id === currentVotePhase
        ? `${styles.workflow__list__item} ${styles.workflow__list__item__open} ${styles.workflow__list__item__open}`
        : `${styles.workflow__list__item} ${styles.workflow__list__item__border}`}
        ${workflow.id === currentDisplay
        ? `${styles.workflow__list__item__active}`
        : ``} `}>
        <p>{workflow.name}</p>
        <p>
          {
            workflow.id === currentVotePhase
            ? 'Open'
            : 'Close'
          }
        </p>
    </li>
  ))

  return (
    <nav className={styles.workflow}>
      <ul className={`${styles.workflow__list} ${styles.workflow__list__border}`}>
        {ejsWorkFlow}
      </ul>
      
    </nav>
  )
}

export default Workflow
