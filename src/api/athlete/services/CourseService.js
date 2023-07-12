import api from '../call/ApiCall';

/**
 * Clase que representa la llamada a los servicios disponibles de una competición
 * @exports
 * @class CourseService
 */
export default class CourseService {

    /**
     * Servicio para registrar una competición en la aplicación para un atleta
     * @param {String} basePath
     * @return {Promise} Promise
     * @memberof CourseService
     */
    static registerCourse(/*tokenAPI,*/ basePath, userId, body){
        const url = `${basePath}courses/${userId}.json`;
        // console.log(url);
        const queryParams = {};
        return api.post(/*tokenAPI,*/ url, queryParams, body)
    }
    /**
     * Servicio para recuperar el listado de competiciones
     * @param {String} basePath
     * @return {Promise} Promise
     * @memberof CourseService
     */
    static loadCoursesList(/*tokenAPI,*/ basePath, userId){
        const url = `${basePath}courses/${userId}.json`;
        return api.get(/*tokenAPI,*/ url, undefined);
    }

}