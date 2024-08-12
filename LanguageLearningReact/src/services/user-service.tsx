import { Login } from "../interfaces/login-interface";
import { ResponseAPI } from "../interfaces/response-api-interface";
import { User } from "../interfaces/user-interface";
import { Environment } from "../environment/environment";

class UserService {
    urlApi = Environment.endpoint + "user/";

    async Login(req: Login): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlApi}login/`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return response.json()
    }

    async Logged(token: string): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlApi}logged/`, {
            method: 'POST',
            body: JSON.stringify({
                "jwt": token
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return response.json()
    }

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
}

export default new UserService