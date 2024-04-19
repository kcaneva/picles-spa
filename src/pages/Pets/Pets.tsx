import { Header } from '../../components/common/Header';
import { Grid } from '../../components/layout/Grid';
import { Card } from '../../components/common/Card';
import { Skeleton } from '../../components/common/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { getPets } from '../../services/pets/getPets';
import styles from './Pets.module.css'
import { Pagination } from '../../components/common/Pagination';
import { useSearchParams } from 'react-router-dom';
import { usePetList } from '../../hooks/usePetList';

export function Pets() {
  const [searchParams, setSearchParams] = useSearchParams()

  const ITEMS_PER_PAGE = 12

  const urlParams = {
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    itemsPerPage: ITEMS_PER_PAGE,
  }
  
  const { data, isLoading } = usePetList(urlParams) 

  function changePage(page: number) {
    setSearchParams( (params) => {
      params.set('page', String(page))
      return params
    })
  }

  return (
    <Grid>
      <div className={styles.container}> 
        <Header />
        {isLoading  && (<Skeleton count={ITEMS_PER_PAGE} containerClassName={styles.skeleton} />)}

        <main className={styles.list}>
          {data?.items.map( (pet) => (
            <Card 
              key={pet.id} 
              href={`/pet/${pet.id}`} 
              text={pet.name} 
              thumb={pet.photo} />
          ))}         
        </main>

        {data?.currentPage &&
          <Pagination 
            currentPage={data.currentPage} 
            totalPages={data.totalPages} 
            onPageChange={(number) => changePage(number)} />
        }

      </div>
    </Grid>
  )
}