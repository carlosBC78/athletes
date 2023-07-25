import requestService from '../../api/athlete/services/RequestService';

export default {

    methods: {
        registerRequest(basePath, userId, body){
            // const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            return requestService.registerRequest(/*tokenApi,*/ basePath, userId, body)
                .then(response => {
                    return response;
                })
                .catch(error => {
                     const errorApp = new Error(error.message || 
                        'Error al insertar el mensaje');
                     throw errorApp;
                    });
        },
        loadRequestList(tokenApi, basePath){
            return requestService.loadRequestList(tokenApi, basePath)
                .then(response => {
                    const allMessages = response.data;
                    // console.log('Mensajes recibidos', allMessages);
                    
                    const userRegisterEmail = this.$store.getters['auth/getEmail'];
                    const athletesList = this.$store.getters['athletes/getAthletesList'];
                    const athleteRegisterId = athletesList.find(ath => ath.email === userRegisterEmail).id;
                    
                    for(const athId in allMessages){
                        let checkRequest = false;
                        const athleteId = athId;
                        const messages = allMessages[athleteId];
                        for(const msg in messages){
                            if(athleteRegisterId === athleteId){
                                const request = {
                                    id: msg,
                                    athleteId: athleteId,
                                    message: messages[msg].message,
                                    userEmail: messages[msg].userEmail,
                                };
                                checkRequest = this.$store.getters['requests/hasRequests'] && 
                                    this.$store.getters['requests/getRequests']
                                    .some(req => req.id === msg);
                                if(!checkRequest){
                                    this.$store.commit('requests/addRequest', request);
                                }
                            }
                        }
                    }
                })
                .catch(error => {
                     const errorApp = new Error(error.message || 
                        'Error al recuperar el listado de mensajes');
                     throw errorApp;
                    });
        }
    }

}