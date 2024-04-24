import { InputHTMLAttributes, Ref, forwardRef } from 'react'
import styles from './Input.module.css'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

function ForwardInput({ label, name, ...rest }: IInput, ref: Ref<HTMLInputElement>) {
        
    return (                      
        <aside className={styles.inputGroup}>
          <label htmlFor={name}>{label}</label>
          <input ref={ref} {...rest} id={name} name={name} >
          </input>
        </aside>                
    )
}

export const Input = forwardRef(ForwardInput)