import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { Grid } from '../../components/layout/Grid';
import styles from './PetDetails.module.css'
import { useQuery } from '@tanstack/react-query';
import { getPetById } from '../../services/pets/getPetById';
import { ImageBase64 } from '../../components/common/ImageBase64/ImageBase64';
import { Skeleton } from '../../components/common/Skeleton';
import { useShelter } from '../../hooks/useShelter';
import { Button, ButtonVariant } from '../../components/common/Button';
import logoWhatsApp from '../../assets/whatsapp.svg'

export function PetDetails() {
  const { id } = useParams()
  
  const { data: shelterData, isError: isShelterError } = useShelter()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-pet-by-id', id],
    queryFn: async () => {
      return await getPetById(id ?? '')
    } 
  })

  return (
    <Grid>
      <div className={styles.container}> 
        <Header showReturn={true} />

        <main className={styles.content}>

          {isLoading && (
            <div className={styles.skeleton}>
              <Skeleton circle={true} width={200} height={200} />
              <Skeleton width={180} height={24} style={{ margin:16 }} />
            </div>

          )}

          {!isLoading && (
            <>
              <ImageBase64 src={data?.photo} className={styles.picture} />
              {isError && (
                <> 
                  <h1>Pet não encontrado</h1>
                  <Link to="/pets/">Voltar para a listagem</Link>
                </>
              )}
              
              {!isError && (
                <> 
                  <h1>{data?.name}</h1>
                  <span>Sobre o pet:</span>
                  <p>{data?.bio}</p>

                  {!isShelterError &&
                    <a href={`https://wa.me/${shelterData?.shelterWhatsApp}?text=Olá gostaria de falar sobre ${data?.name}`} target="_blank">
                      <Button variant={ButtonVariant.Text}>
                        <span className={styles.buttonWhatsapp}>
                          <img src={logoWhatsApp} alt='logo WhatsApp'/>
                          Entre em contato com o abrigo
                        </span>
                      </Button>
                    </a>
                  }

                </>
              )}
            </>
          )}


        </main>

      </div>
    </Grid>
  )
}