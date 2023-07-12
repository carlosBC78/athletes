import api from '../call/ApiCall';

/**
 * Clase que representa la llamada a los servicios disponibles del Athleta
 * @exports
 * @class AthleteService
 */
export default class RequestService {

    /**
     * Servicio para registrar un mensaje para un athleta
     * @param {String} basePath
     * @return {Promise} Promise
     * @memberof RequestService
     */
    static registerRequest(/*tokenAPI,*/ basePath, userId, body){
        const url = `${basePath}requests/${userId}.json`;
        // console.log(url);
        const queryParams = {};
        return api.post(/*tokenAPI,*/ url, queryParams, body)
    }
    /**
     * Servicio para recuperar el listado de mensajes de un athleta
     * @param {String} basePath
     * @return {Promise} Promise
     * @memberof RequestService
     */
    static loadRequestList(/*tokenAPI,*/ basePath, userId){
        const url = `${basePath}requests/${userId}.json`;
        return api.get(/*tokenAPI,*/ url, undefined);
    }

}