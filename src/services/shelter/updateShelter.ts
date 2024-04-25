import { IUpdateShelterRequest, IUpdateShelterResponse } from "../../interfaces/shelter";
import httpClient from "../api/httpClient";

export async function updateShelter(params: IUpdateShelterRequest): Promise<IUpdateShelterResponse> {
  try {
    const response = await httpClient.put( `/shelter`, params ) 

    return response.data

  } catch (error) {
    console.log(`Erro ao atualizar Abrigo`, error)
    throw error
  }
} 