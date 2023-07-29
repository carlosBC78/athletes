/**
 * Class to normalize text
 * 
 * @export
 * @class Normalize
 */

export default class Normalize {
    static removeAccents(text){
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}