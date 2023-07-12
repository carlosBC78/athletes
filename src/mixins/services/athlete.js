import athleteService from '../../api/athlete/services/AthleteService'; 
import Athlete from '../../model/athlete/Athlete';

export default {

    methods: {
        registerAthlete(basePath, userId, body){
            // const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            return athleteService.registerAthlete(/*tokenApi,*/ basePath, userId, body)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    const errorApp = new Error(error.message || 'Error al registrar el atleta');
                    throw errorApp;
                   });
        },
        loadAthletesList(basePath){            
            return athleteService.loadAthletesList(basePath)
                .then(response => {
                    const respData = response.data;
                    let checkUser = false;
                    for(const key in respData){
                        const athlete = new Athlete(key, respData[key]);
                        checkUser = this.$store.getters['athletes/hasAthletes'] && 
                            this.$store.getters['athletes/getAthletesList'].some(ath => ath.id === athlete.id);
                        if(!checkUser){
                            this.$store.commit('athletes/setAthletesList', athlete);
                        }
                    }
                    this.$store.commit('athletes/setLastFetchTimestamp');
                })
                .catch((error) => 
                    {
                     const errorApp = new Error(error.message || 'Error al recuperar el listado de atletas');
                     throw errorApp;
                    });
        }
    }

}