import { Environment } from "../environment/environment";
import { Reading } from "../interfaces/reading-interface";
import { ResponseAPI } from "../interfaces/response-api-interface";

class ReadingService {

    // Enlace principal
    urlApi = Environment.endpoint + "reading/";

    // Lista de Lecturas
    async List(): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlApi}list/`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }

    // Crear lecturas
    async Create(req: Reading): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlApi}create/`, {
            method: 'POST',
            body: JSON.stringify(req),
            credentials: 'include',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        return response.json()
    }

    // Actualizar vistas de lectura
    async UpdateViews(req: Reading): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlApi}update_views/`, {
            method: 'PUT',
            body: JSON.stringify(req),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })

        // Se retorna la respuesta de la API
        return response.json()
    }
}

export default new ReadingService;