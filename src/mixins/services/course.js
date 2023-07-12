import courseService from '../../api/athlete/services/CourseService';

export default {

    methods: {
        registerCourse(basePath, userId, body){
            // const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            return courseService.registerCourse(/*tokenApi,*/ basePath, userId, body)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    const errorApp = new Error(error.message || 'Error al registrar la competición');
                    throw errorApp;
                   });
        },
        loadCoursesList(basePath, userId){            
            return courseService.loadCoursesList(basePath, userId)
                .then(response => {
                    let checkCourse = false;
                    for(const key in response.data){
                        const course = {
                            id: key,
                            courseDate: response.data[key].courseDate,
                            distance: response.data[key].distance,
                            edition: response.data[key].edition,
                            name: response.data[key].name,
                            netTime: response.data[key].netTime,
                            officialTime: response.data[key].officialTime,
                            type: response.data[key].type,
                            athleteId: userId
                        }
                        checkCourse = this.$store.getters['courses/hasCourses'] &&
                            this.$store.getters['courses/getCourses'].some(c => c.id === course.id)
                        if(!checkCourse){
                            this.$store.commit('courses/addCourse', course);
                        }
                        
                    }
                    
                })
                .catch((error) => 
                    {
                     const errorApp = new Error(error.message || 'Error al recuperar el listado de competiciones');
                     throw errorApp;
                    });
        }
    }

}