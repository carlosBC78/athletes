import api from '../call/ApiCall';

/**
 * Clase que representa la llamada a los servicios disponibles del Athleta
 * @exports
 * @class AthleteService
 */
export default class AthleteService {

    /**
     * Servicio para registrar un athleta en la aplicación
     * @param {String} basePath
     * @return {Promise} Promise
     * @memberof AthleteService
     */
    static registerAthlete(/*tokenAPI,*/ basePath, userId, body){
        const url = `${basePath}athletes/${userId}.json`;
        // console.log(url);
        const queryParams = {};
        return api.put(/*tokenAPI,*/ url, queryParams, body)
    }
    /**
     * Servicio para recuperar el listado de athletas
     * @param {String} basePath
     * @return {Promise} Promise
     * @memberof AthleteService
     */
    static loadAthletesList(/*tokenAPI,*/ basePath){
        const url = `${basePath}athletes.json`;
        return api.get(/*tokenAPI,*/ url, undefined);
    }

}