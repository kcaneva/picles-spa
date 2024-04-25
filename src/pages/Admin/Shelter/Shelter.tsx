import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Panel } from '../../../components/layout/Panel'
import styles from './Shelter.module.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useHookFormMask } from 'use-mask-input'
import { updateShelter } from '../../../services/shelter/updateShelter'
import { toast } from 'sonner'
import { useShelter } from '../../../hooks/useShelter'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const shelterSchema = z.object({
  name: 
    z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres.')
    .max(30, 'Nome deve ter no máximo 30 caracteres.'),

  email:
    z.string()
    .email('Campo deve ser um email'),

  phone: 
    z.string()
    .refine((value) => {
      const digits = value.replace(/\D/g, '').length
      return digits >= 10  && digits <= 11
    }),
    
  whatsApp: 
    z.string()
    .refine((value) => {
      const digits = value.replace(/\D/g, '').length
      return digits >= 10  && digits <= 11
    }),
}) 

type ShelterSchema = z.infer<typeof shelterSchema>

export function Shelter() {
  const { handleSubmit, register, formState } = useForm<ShelterSchema>({
    resolver: zodResolver(shelterSchema)
  }) 
  const registerWithMask = useHookFormMask(register);
  const queryClient = useQueryClient()
  
  let { data, isLoading } = useShelter()

  async function submit({ name, email, phone, whatsApp }: ShelterSchema) {
      const toastId = toast.loading('Salvando dados')
      try{

        await updateShelter( { 
          name, 
          email, 
          phone: phone.replace(/\D/g, ''), 
          whatsApp: whatsApp.replace(/\D/g, '')
        } )
        queryClient.invalidateQueries({ queryKey: ['get-shelter'] })

        toast.success('Dados salvos com sucesso', {
          id: toastId
        })
      } catch {
          toast.error('Não foi possível salvar os dados', {
            id: toastId
          })
      }
  }

  return (
    <Panel>
      {!isLoading &&
        <form className={styles.container} onSubmit={handleSubmit(submit)}>
            <div>
              <Input label='Nome' defaultValue={data?.shelterName} {...register('name') } />        
              { formState.errors?.name && 
                <p className={styles.formError}>
                  {formState.errors.name.message}
                </p>
              }

              <Input label='E-mail' defaultValue={data?.shelterEmail} {...register('email')} />
              { formState.errors?.email && 
                <p className={styles.formError}>
                  {formState.errors.email.message}
                </p>
              }

              <Input label='Fone' defaultValue={data?.shelterPhone} {...registerWithMask('phone', ['99 9999-9999', '19 99999-9999'])} />
              { formState.errors?.phone && 
                <p className={styles.formError}>
                  {formState.errors.phone.message}
                </p>
              }

              <Input label='WhatsApp' defaultValue={data?.shelterWhatsApp} {...registerWithMask('whatsApp', ['99 9999-9999', '19 99999-9999'])} />
              { formState.errors?.whatsApp && 
                <p className={styles.formError}>
                  {formState.errors.whatsApp.message}
                </p>
              }

            </div>
          <Button>
            Salvar dados
          </Button>
        </form>
      }
    </Panel>
  )

}