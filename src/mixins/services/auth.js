import authService from '../../api/athlete/services/AuthService';

export default {
    methods: {
        signup(body){
            const API_KEY = 'AIzaSyCKG3SUMkzLShYMz3StwOzQgvtm3Tpb1Hc';
            const basePath = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
            
            return authService.signup(/*tokenApi,*/ basePath, body)
                .then(response => {
                    // console.log(response);
                    return response;
                })
                .catch(error => {
                    const errorApp = new Error(error.message);
                    throw errorApp;
                   });
        },
        login(body){
            // console.log('body', body);
            const API_KEY = 'AIzaSyCKG3SUMkzLShYMz3StwOzQgvtm3Tpb1Hc';
            const basePath = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
            
            return authService.login(basePath, body)
                .then(response => {
                    // console.log(response);
                    return response;
                })
                .catch(error => {
                    const errorApp = new Error(error.message);
                    throw errorApp;
                   });
        },
        tryLogin(){
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const tokenExpiration = localStorage.getItem('tokenExpiration');

            const expiresIn = +tokenExpiration - new Date().getTime();

            if(expiresIn < 0){
                return;
            }
            setTimeout(() => {
                const logoutObj = {
                    token: null,
                    userId: null,
                    // tokenExpiration: null
                }
                //Borramos del local storage el token
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('tokenExpiration');

                this.$store.commit('auth/setUser', logoutObj);
                this.$router.replace('/athletes');
            }, expiresIn);

            if(token && userId){
                this.$store.commit('auth/setUser', {
                    token: token,
                    userId: userId
                });
            }
        }
    }
}

