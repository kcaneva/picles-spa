import { Link } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import styles from './Pets.module.css'
import { Grid } from '../../components/layout/Grid';

export function Pets() {
  return (
    <Grid>
      <div className={styles.container}> 
        <Header />

        <h1>Listagem de pets</h1>

        <Link to="/pets/20"> Ir para detalhes</Link>
      </div>
    </Grid>

  )
}