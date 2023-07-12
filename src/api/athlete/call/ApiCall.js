import CallBase from './CallBase';
/**
 * Class that is used to encapsulate calls to the api
 *
 * @class ApiCall
 */
export default class ApiCall extends CallBase {
/**
 * Set up the default header with which the call is set up
 *
 * @static
 * @param {String} tokenAPI api access token
 * @return {Object} Initial configuration object
 * @memberof ApiCall
 */
  static _generateHeader(tokenAPI) {
    const headers = {
    //   'Accept'       : 'application/json, application/x-ndjson',
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json'
    };
    if (tokenAPI) {
      headers.Authorization = `Bearer ${tokenAPI}`;
    }

    return headers;
  }

  /**
   * Method representing a GET call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof ApiCall
   */
  static get(/*tokenAPI,*/ path, queryParams) {
    return ApiCall._innerCall('GET', path, queryParams, undefined/*, ApiCall._generateHeader(tokenAPI)*/);
  }

  /**
   * Method representing a POST call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @param {Object} body = Object containing the key pairs value of the request body
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof ApiCall
   */
  static post(/*tokenAPI,*/ path, queryParams, body) {
    return ApiCall._innerCall('POST', path, queryParams, body/*, ApiCall._generateHeader(tokenAPI)*/);
  }

  /**
   * Method representing a PUT call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @param {Object} body = Object containing the key pairs value of the request body
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof ApiCall
   */
  static put(/*tokenAPI,*/ path, queryParams, body) {
    return ApiCall._innerCall('PUT', path, queryParams, body/*, ApiCall._generateHeader(tokenAPI)*/);
  }

  /**
   * Method representing a PATCH call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @param {Object} body = Object containing the key pairs value of the request body
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof ApiCall
   */
  static patch(/*tokenAPI,*/ path, queryParams, body) {
    return ApiCall._innerCall('PATCH', path, queryParams, body/*, ApiCall._generateHeader(tokenAPI)*/);
  }

  /**
   * Method representing a DELETE call to the Api
   *
   * @param {String} tokenAPI api access token
   * @param {String} path Url destination of the call
   * @param {Object} queryParams Object with the key pairs value of the parameters of the querystring
   * @return {Promise} Returns the result of the Ajax call promise
   * @memberof ApiCall
   */
  static delete(tokenAPI, path, queryParams) {
    return ApiCall._innerCall('DELETE', path, queryParams, undefined, ApiCall._generateHeader(tokenAPI));
  }
}

