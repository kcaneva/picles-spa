// import { useState } from 'react'
import { Button, ButtonVariant } from './components/common/Button'

export function App() {
  // const [count, setCount] = useState(0)

  return (
    // <Button onClick={() => setCount((count) => count + 1)}>
    //   count is {count}
    // </Button>
    <>
      <Button variant={ButtonVariant.Default}>Default</Button>  
      <Button variant={ButtonVariant.Disabled}>Disabled</Button> 
      <Button variant={ButtonVariant.Outlined}>Outlined</Button> 
      <Button variant={ButtonVariant.Text}>Text</Button> 
    </>
  )
}
