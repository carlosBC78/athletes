import api from '../call/ApiCall';

/**
 * Clase que representa la llamada a los servicios de autenticación
 * @exports
 * @class AuthService
 */
export default class AuthService {

    /**
     * Servicio para registrar un usuario en la aplicación
     * @param {String} basePath
     * @param {String} body
     * @return {Promise} Promise
     * @memberof AuthService
     */
    static signup(basePath, body){
        const url = `${basePath}`;
        const queryParams = {};
        return api.post(null, url, queryParams, body)
    }
    /**
     * Servicio para hacer login de usuario en la aplicación
     * @param {String} basePath
     * @param {String} body
     * @return {Promise} Promise
     * @memberof AuthService
     */
    static login(basePath, body){
        // console.log(basePath, body);
        const url = `${basePath}`;
        const queryParams = {};
        return api.post(null ,url, queryParams, body)
    }
}