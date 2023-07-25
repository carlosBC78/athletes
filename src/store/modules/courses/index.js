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
        //state, getters, rootState, rootGetters
        // getCourses: (state, _, _2, rootGetters) => {
        //     const userId = rootGetters['auth/getUserId'];
        //     // console.log('store', userId);
        //     return state.courses.filter(course => course.athleteId === userId);
        // },
        getCourses: state => state.courses,
        hasCourses: (_, getters) => {
            return getters.getCourses && getters.getCourses.length > 0
        }
    }
};

export default coursesStore;