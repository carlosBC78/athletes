const requestsStore = {

    namespaced: true,

    state: () => ({
       requests: []
    }),

    mutations: {
        /**
         * set request
         * @param {Object} state requests list state
         * @param {Object} value request
         */
        addRequest(state, value){
            state.requests.push(value);
        }
    },
    getters: {
        getRequests: (state, _, _2, rootGetters) => {
            const userId = rootGetters.getUserId;
            return state.requests.filter(req => req.athleteId === userId);
        },
        hasRequests: (_, getters) => {
            return getters.getRequests && getters.getRequests.length > 0
        }
    }
};

export default requestsStore;