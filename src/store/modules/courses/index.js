// import coursesListMock from '../../../api/mocks/resource/course/courseList.js';

const coursesStore = {

    namespaced: true,

    state: () => ({
       courses: []
        // courses: coursesListMock
    }),

    mutations: {
        /**
         * set course
         * @param {Object} state course list state
         * @param {Object} value course
         */
        addCourse(state, value){
            state.courses.push(value);
        }
    },
    getters: {
        getCourses: (state, _, _2, rootGetters) => {
            const userId = rootGetters.getUserId;
            return state.courses.filter(course => course.athleteId === userId);
        },
        hasCourses: (_, getters) => {
            return getters.getCourses && getters.getCourses.length > 0
        }
    }
};

export default coursesStore;