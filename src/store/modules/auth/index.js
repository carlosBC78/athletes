const authStore = {

    namespaced: true,

    state: () => ({
        token: null,
        userId: null,
        email: null
     }),

    mutations: {
        /**
         * set login
         * @param {Object} state course list state
         * @param {Object} value course
         */
        setUser(state, value){
            state.token = value.token;
            state.userId = value.userId;
            state.email = value.email;
        }
    },
    getters: {
        getUserId: state => state.userId,
        getToken: state => state.token,
        getEmail: state => state.email,
        isAuthenticated: state => !!state.token
    }
};

export default authStore;