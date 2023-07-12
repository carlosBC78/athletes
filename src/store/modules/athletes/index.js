// import athletesListMock from '../../../api/mocks/resource/athlete/athletesList';

const athletesStore = {

    namespaced: true,

    state: () => ({
        lastFetch: null,
        // forceRefresh: true,
        athletesList: [],
        // athletesList: athletesListMock,
        // userIsAthlete: false //alternativa a isAthlete
    }),

    mutations: {
        /**
         * set athletes list
         * @param {Object} state athletes list state
         * @param {Object} value athletes list value
         */
        setAthletesList(state, value){
            state.athletesList.push(value);
        },
        setLastFetchTimestamp(state){
            state.lastFetch = new Date().getTime();//ms desde 01/01/1970
        }
    },
    getters: {
        getAthletesList: state => state.athletesList,
        hasAthletes: state => state.athletesList && state.athletesList.length > 0,
        // isAthlete: (_, getters, _2, rootGetters) => {
        //     const athletes = getters.getAthletesList;
        //     console.log('athletes', athletes);
        //     const userId = rootGetters.getUserId;
        //     console.log('userId', userId);
        //     return athletes.some(ath => ath.id === userId);
        // }
        // isAthlete: (state, getters, rootState, rootGetters) => {
        //     const athletes = getters.getAthletesList;
        //     const userId = rootGetters.getUserId;
        //     return athletes.some(ath => ath.id === userId);
        // }
        shouldUpdate: state => {
            const lastFetch = state.lastFetch;
            if(!lastFetch){
                return true;
            }
            else{
                const currentTimestamp = new Date().getTime();
                return (currentTimestamp - lastFetch) / 1000 > 60;
            }
        },
        // getForceRefresh: state => state.forceRefresh
    }
};

export default athletesStore;