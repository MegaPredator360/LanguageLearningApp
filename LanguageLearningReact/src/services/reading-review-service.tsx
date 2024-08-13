import { Environment } from "../environment/environment";
import { ReadingReview } from "../interfaces/reading-review-interface";
import { ResponseAPI } from "../interfaces/response-api-interface";

class ReadingReviewService {

    // Enlace principal
    urlApi = Environment.endpoint + "reading_review/";

    // Lista de Comentarios
    async List(id: number): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlApi}list/${id}/`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }

    // Agregar Comentario
    async Create(req: ReadingReview): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlApi}create/`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        // Se retorna la respuesta de la API
        return response.json()
    }
}

export default new ReadingReviewService;