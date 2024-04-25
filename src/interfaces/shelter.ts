export interface IShelter {
  shelterName: string
  shelterEmail: string
  shelterWhatsApp: string
  shelterPhone: string
}


export interface IUpdateShelterRequest {
  name: string
  email: string
  whatsApp: string
  phone: string
}

export interface IUpdateShelterResponse extends IUpdateShelterRequest {

}