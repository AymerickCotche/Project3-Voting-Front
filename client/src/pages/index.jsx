import Layout from '../components/Layout';
import Main from '../components/Main';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
     <Layout>
       <Main/>
     </Layout>
    </div>
  )
}

export default Home
