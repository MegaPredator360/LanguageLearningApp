import { Environment } from "../environment/environment";
import { ResponseAPI } from "../interfaces/response-api-interface";

class LanguageService {

    // Enlace principal
    urlApi = Environment.endpoint + "language/";

    // Lista de Idiomas
    async List(): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlApi}list/`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }
}

export default new LanguageService;