import { useEffect, useState } from 'react';
import { Header } from '../../components/common/Header';
import styles from './Pets.module.css'
import { Grid } from '../../components/layout/Grid';
import { Card } from '../../components/common/Card';
import { getPets } from '../../services/pets/getPets';
import { Skeleton } from '../../components/common/Skeleton';

export function Pets() {
  const [pets, setPets] = useState([])

  useEffect( () => {
    async function loadData() {
      const data = await getPets({})
      console.log( data )
      setPets(data.items)
    } 

    loadData()
  }, [])

  return (
    <Grid>
      <div className={styles.container}> 
        <Header />
        <main className={styles.list}>
          <Skeleton count={3} containerClassName={styles.skeleton} />
          {pets.map( (pet) => (
            <Card key={pet.id} href={`pet/{$pet.id}`} text={pet.name} thumb={pet.photo} />
          ))}         
        </main>
      </div>
    </Grid>
  )
}