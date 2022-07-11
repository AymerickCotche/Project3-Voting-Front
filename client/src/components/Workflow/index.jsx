import { useDispatch, useSelector } from 'react-redux';
import { setDisplayId } from '../../app/actions/voting';
import styles from './Workflow.module.scss';

const Workflow = () => {
  const dispatch = useDispatch();
  const workflowStatus = useSelector((state) => state.voting.workflowStatus);
  const changeCurrentDisplay = (index) => {
    dispatch(setDisplayId(index));
  }
  const ejsWorkFlow = workflowStatus.map((workflow) => (
    <li
      key={workflow.id}
      onClick={() => changeCurrentDisplay(workflow.id)}
      className={
        workflow.status === "Open"
        ? `${styles.workflow__list__item} ${styles.workflow__list__item__active} ${styles.workflow__list__item__active}`
        : `${styles.workflow__list__item} ${styles.workflow__list__item__border}` }>
        <p>{workflow.name}</p>
        <p>{workflow.status}</p>
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
