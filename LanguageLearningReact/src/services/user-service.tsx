import { Login } from "../interfaces/login-interface";
import { ResponseAPI } from "../interfaces/response-api-interface";
import { User } from "../interfaces/user-interface";
import { Environment } from "../environment/environment";

class UserService {
    urlApi = Environment.endpoint + "user/";

    // Solicitud para iniciar sesion
    async Login(req: Login): Promise<ResponseAPI> {

        // Se realizar la peticion
        const response = await fetch(`${this.urlApi}login/`, {
            method: 'POST',
            body: JSON.stringify(req),
            credentials: 'include',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        return response.json()
    }

    // Solicitud para verificar la sesion
    async Logged(): Promise<ResponseAPI> {

        // Se realiza la peticion
        const response = await fetch(`${this.urlApi}logged/`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })

        return response.json()
    }

    // Solicitud para eliminar / cerrar la sesion
    async Logout(): Promise<ResponseAPI> {

        // Se realiza la peticion
        const response = await fetch(`${this.urlApi}logout/`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })

        return response.json()
    }

    // Registrar usuarios
    async Register(req: User): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlApi}create/`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return response.json()
    }

    // Actualizar usuarios
    async Update(req: User): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlApi}update/`, {
            method: 'PUT',
            body: JSON.stringify(req),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return response.json()
    }

    // Eliminar usuarios
    async Delete(): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlApi}delete/`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return response.json()
    }
}

export default new UserService