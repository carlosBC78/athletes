/**
 * POJO Athlete
 * 
 * @param {String} id - id
 * @param {String} firstName - firstName
 * @param {String} lastName - lastName
 * @param {Number} age - age
 * @param {String} description - description
 * @param {TypeCourses} typeCourses - typeCourses
 * 
 */

export default class Athlete{
    /**
     * Class constructor
     * @constructor
     * @param {Object} serverData - serverData
     */
    constructor(id, serverData){
        this.id = id;
        this.firstName = serverData.firstName;
        this.lastName = serverData.lastName;
        this.age = serverData.age;
        this.description = serverData.description;
        this.typeCourses = serverData.typeCourses;
    }
}