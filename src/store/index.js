import { createStore } from "vuex";

import athletesModule from './modules/athletes/index.js';
import requestsModule from './modules/requests/index.js';
import coursesModule from './modules/courses/index.js'

export default createStore({
    modules: {
        athletes: athletesModule,
        requests: requestsModule,
        courses: coursesModule
    },
    state: () => ({
       userId: 'a3'
    }),
    getters: {
        getUserId: state => state.userId
    }
});