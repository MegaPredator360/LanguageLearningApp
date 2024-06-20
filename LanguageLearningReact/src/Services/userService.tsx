import { Login } from "../Interfaces/loginInterface";
import { ResponseAPI } from "../Interfaces/responseApi";
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
}

export default new UserService