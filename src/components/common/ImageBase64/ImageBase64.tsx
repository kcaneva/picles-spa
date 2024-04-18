import { ImgHTMLAttributes } from "react"
import thumbDefault from '../../../assets/thumb-default.jpg';

interface IImageBase64 extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
}

export function ImageBase64( { src, onError, ...rest }: IImageBase64) {

  const thumb = src ? `data:image/*;base64,{$src}` : thumbDefault
  
  return <img 
            src={thumb}
            onError={(e) => {
              onError && onError(e)
              e.currentTarget.src = thumbDefault
            }}
            {...rest} 
          />
}