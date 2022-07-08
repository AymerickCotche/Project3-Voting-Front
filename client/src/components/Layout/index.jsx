import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.scss';

const Layout = (props) => {
  return (
    <div>
      <Header/>
      <main className={styles.main}>{props.children}</main>
      <Footer/>
    </div>
    
  )
}

export default Layout
