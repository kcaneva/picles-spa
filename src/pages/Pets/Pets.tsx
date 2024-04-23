import { Header } from '../../components/common/Header';
import { Grid } from '../../components/layout/Grid';
import { Card } from '../../components/common/Card';
import { Skeleton } from '../../components/common/Skeleton';
import styles from './Pets.module.css'
import { Pagination } from '../../components/common/Pagination';
import { useSearchParams } from 'react-router-dom';
import { usePetList } from '../../hooks/usePetList';
import { Select } from '../../components/common/Select';
import { Button, ButtonVariant } from '../../components/common/Button';
import { filterColumns } from './Pets.contants';
import { ChangeEvent, FormEvent, useState } from 'react';
import { GetPetsRequest } from '../../interfaces/pet';

export function Pets() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const ITEMS_PER_PAGE = 12

  const urlParams = {
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    itemsPerPage: searchParams.get('itemsPerPage') ? Number(searchParams.get('itemsPerPage')) : ITEMS_PER_PAGE,
    type: searchParams.get('type') ?? '',
    size: searchParams.get('size') ?? '',
    gender: searchParams.get('gender') ?? '',
  }
  
  const { data, isLoading } = usePetList(urlParams) 

  function checkButtonStatus(event: ChangeEvent<HTMLFormElement>) {
    const { type, size, gender } = getFormValue(event.target.form)

    setIsButtonEnabled( type !== urlParams.type || 
                        size !== urlParams.size || 
                        gender !== urlParams.gender
                      )
  }

  function changePage(page: number) {
    setSearchParams( (params) => {
      params.set('page', String(page))
      return params
    })
  }

  function changeItemsPerPage(items: number) {
    setSearchParams( (params) => {
      params.set('itemsPerPage', String(items))
      return params
    })
  }

  function getFormValue(form: HTMLFormElement) {
    const formData = new FormData(form)
    return Object.fromEntries(formData)
  }

  function updateSearchParams(urlParams: GetPetsRequest) {
    const fields: (keyof GetPetsRequest)[] = ['type', 'size', 'gender', 'itemsPerPage']
    const newParams = new URLSearchParams()

    console.log(fields)

    fields.forEach((field) => {
      if (urlParams[field]) {
        newParams.set(field, String(urlParams[field]))
      }
    })
    newParams.set('page', '1')
    console.log(newParams)
    return newParams
  }

  function applyFilters(event: FormEvent) {
    event.preventDefault()

    const formValues = getFormValue(event.target as HTMLFormElement)
    const newSearchParams = updateSearchParams(formValues)

    setSearchParams(newSearchParams)
  }

  return (
    <Grid>
      <div className={styles.container}> 
        <Header />

        <form className={styles.filters} 
          onSubmit={applyFilters}
          onChange={checkButtonStatus}
        >
          <div className={styles.columns}>

            {filterColumns.map( (filter) => (
              <div key={filter.name} className={styles.column}>
                  <Select 
                    label={filter.title}
                    defaultValue={urlParams[filter.name]}
                    name={filter.name}
                    options={filter.options}
                  />
              </div>
            ))}

          </div>       

          <Button 
            type="submit"
            variant={
              isButtonEnabled ? ButtonVariant.Default : ButtonVariant.Disabled
            }
          >
            Buscar
          </Button>
        </form>


        {isLoading  && (<Skeleton count={urlParams.itemsPerPage} containerClassName={styles.skeleton} />)}

        <main className={styles.list}>
          {data?.items.map( (pet) => (
            <Card 
              key={pet.id} 
              href={`/pets/${pet.id}`} 
              text={pet.name} 
              thumb={pet.photo} />
          ))}         
        </main>

        {data?.currentPage &&
          <Pagination 
            currentPage={data.currentPage} 
            totalPages={data.totalPages} 
            itemsPerPage={urlParams.itemsPerPage}
            onPageChange={(number) => changePage(number)}
            onItemsPerPageChange={(number) => changeItemsPerPage(number)}
          />
        }

      </div>
    </Grid>
  )
}