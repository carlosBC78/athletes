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
        loadRequestList(basePath, userId){
            return requestService.loadRequestList(basePath, userId)
                .then(response => {
                    const respData = response.data;
                    let checkRequest = false;
                    for(const key in respData){
                        const request = {
                            id: key,
                            athleteId: userId,
                            message: respData[key].message,
                            userEmail: respData[key].userEmail
                        };
                        // console.log(respData[key].message);
                        // console.log(respData[key].userEmail);
                        checkRequest = this.$store.getters['requests/hasRequests'] && 
                            this.$store.getters['requests/getRequests'].some(req => req.id === request.id);
                        if(!checkRequest){
                            this.$store.commit('requests/addRequest', request);
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