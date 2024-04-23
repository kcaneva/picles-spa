import { Select } from '../Select'
import styles from './Pagination.module.css'

interface IPagination {
  currentPage: number, 
  totalPages: number, 
  itemsPerPage?: number,
  onPageChange: (page: number) => void,
  onItemsPerPageChange?: (items: number) => void,
}

export function Pagination({ currentPage, totalPages, itemsPerPage = 12, onPageChange, onItemsPerPageChange }: IPagination) {

  const pageNumber = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
      <div className={styles.container}> 
         <Select
          defaultValue={String(itemsPerPage)}
          options={[
                    {value: '4', text: '4'},
                    {value: '8', text: '8'},
                    {value: '12', text: '12'},
                   ]}
                   onChange={(e) => (onItemsPerPageChange && onItemsPerPageChange(parseInt(e.currentTarget.value))) }
          />

        <nav>
          <ul className={styles.pagination}>
            {pageNumber.map( (number) => ( 
                <li key={number} className={`${currentPage === number ? styles.active : null}`}>
                  <button onClick={() => onPageChange(number)}>{number}</button>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
  )
}