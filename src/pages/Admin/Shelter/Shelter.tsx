import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Panel } from '../../../components/layout/Panel'
import styles from './Shelter.module.css'

export function Shelter() {
  return (
    <Panel>
      <form className={styles.container} 
          // onSubmit={applyFilters}
          // onChange={checkButtonStatus}
        >
        <Input name="whatsapp" caption='WhatsApp'/>
        <Button>
          Salvar dados
        </Button>
      </form>
    </Panel>
  )

}