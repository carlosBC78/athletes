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
            const email = rootGetters['auth/getEmail'];
            const athletesList = rootGetters['athletes/getAthletesList'];
            const athleteId = email ? athletesList.find(ath => ath.email === email).id : '';
            return email ? state.requests.filter(req => req.athleteId === athleteId) : [];
        },
        hasRequests: (_, getters) => {
            return getters.getRequests && getters.getRequests.length > 0
        }
    }
};

export default requestsStore;