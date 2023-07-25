<template>
    <div class="user-auth">
        <base-dialog :show="!!error" title="¡Error!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Autenticando ..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="user-auth-form-control">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" v-model.trim="email" />
                </div>
                <div class="user-auth-form-control">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" v-model.trim="password" />
                </div>
                <p class="user-auth-invalid-message" v-if="!formIsValid">Introducir un email válido y una password (mínimo 8 caracteres)</p>
                <div class="user-auth-buttons">
                    <base-button>
                        {{submitButtonCaption}}
                    </base-button>
                    <base-button v-if="registerAthletes" type="button" mode="flat" @click="switchAuthMode">
                        {{submitModeButtonCaption}}
                    </base-button>
                </div>
                
            </form>
        </base-card>
    </div>
</template>

<script>
import BaseDialog from '@/components/base/BaseDialog.vue';
import authService from '../../mixins/services/auth';


export default {
  components: { BaseDialog },
    name: 'UserAuth',
    mixins: [authService],
    data(){
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
            timer: null
        }
    },
    computed: {
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Iniciar sesión';
            } else {
                return 'Crear una cuenta';
            }
        },
        submitModeButtonCaption(){
            if(this.mode === 'login'){
                return 'ó regístrese en su lugar';
            } else {
                return 'ó inicie sesión en su lugar';
            }
        },
        registerAthletes(){
        //Cambiar a valor true en el caso que activemos darse de alta a otros atletas
            return false;
        }
    },
    methods: {
        submitForm(){
            this.formIsValid = true;
            if(this.email === '' || !this.email.includes('@') ||
                this.password.length < 8){
                this.formIsValid = false;
                return;
            }

            if(this.mode === 'login'){
                //...
                this.loginUser();
            } else {
                //Enviar usuario y contraseña al servidor de back end
                this.registerUser();
            }
        },
        switchAuthMode(){
            if(this.mode === 'login'){
                this.mode = 'signup';
            }
            else{
                this.mode = 'login';
            }
        },
        registerUser(){
            const userData = {
              email: this.email,
              password: this.password,
              returnSecureToken: true
            };
            this.isLoading = true;
            this.signup(userData)
                .then((response) => {
                    const expiresIn = response.data.expiresIn * 1000;//3600 * 1000 ms
                    // const expiresIn = 20000;
                    // const expirationDate = new Date().getTime() + expiresIn;

                    //Guardo el usuario en el Local Storage del navegador
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('userId', response.data.localId);
                    // localStorage.setItem('tokenExpiration', expirationDate);

                    setTimeout(() => {
                        const logoutObj = {
                            token: null,
                            userId: null,
                            // tokenExpiration: null
                        }
                        //Borramos del local storage el token
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        // localStorage.removeItem('tokenExpiration');

                        this.$store.commit('auth/setUser', logoutObj);
                        this.$router.replace('/athletes');
                    }, expiresIn);

                    // console.log('registro de usuario', response);   
                    this.$store.commit('auth/setUser', {
                        token: response.data.idToken,
                        userId: response.data.localId,
                        // tokenExpiration: response.data.expiresIn
                        email: response.data.email
                    });
                    const action = `/${this.$route.query.redirect || 'athletes'}`;
                    this.$router.replace(action);
                })
                .catch(error => {
                    const errorMsgObj = JSON.parse(error.message).data.error.message;
                    this.error = errorMsgObj && errorMsgObj === 'EMAIL_EXISTS' ? 
                        `La dirección de correo '${this.email}' ya existe` : 'Error al registrarse, revise los datos.';
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        loginUser(){
            const userData = {
              email: this.email,
              password: this.password,
              returnSecureToken: true
            };
            this.isLoading = true;
            this.login(userData)
                .then((response) => {
                    // console.log('athleta registrado', response);
                    const expiresIn = response.data.expiresIn * 1000;//3600 * 1000 ms
                    // const expiresIn = 20000;
                    // const expirationDate = new Date().getTime() + expiresIn;

                    //Guardo el usuario en el Local Storage del navegador
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('userId', response.data.localId);
                    // localStorage.setItem('tokenExpiration', expirationDate);

                    setTimeout(() => {
                        const logoutObj = {
                            token: null,
                            userId: null,
                            // tokenExpiration: null
                        }
                        //Borramos del local storage el token
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        // localStorage.removeItem('tokenExpiration');

                        this.$store.commit('auth/setUser', logoutObj);
                        this.$router.replace('/athletes');
                    }, expiresIn);

                    // console.log('login de usuario', response);    
                    this.$store.commit('auth/setUser', {
                        token: response.data.idToken,
                        userId: response.data.localId,
                        // tokenExpiration: response.data.expiresIn
                        email: response.data.email
                    });
                    const action = `/${this.$route.query.redirect || 'athletes'}`;
                    this.$router.replace(action);
                })
                .catch(error => {
                    const errorMsgObj = JSON.parse(error.message).data.error.message;
                    this.error = errorMsgObj && errorMsgObj === 'INVALID_PASSWORD' ? 
                        'Contraseña incorrecta' : 
                        errorMsgObj === 'EMAIL_NOT_FOUND' ? 'Email no encontrado' :
                        'Error al hacer login, revise los datos.';
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        handleError(){
            this.error = null;
        }
    }
}
</script>

<style scoped>
form {
  margin: 8px;
  /* border: 1px solid #ccc; */
  /* border-radius: 12px; */
  padding: 8px;
}

.user-auth {
  margin: 4px 0;
}

label {
  font-weight: bold;
  margin-bottom: 4px;
  margin-top: 4px;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 2px;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.user-auth-invalid-message{
    color: red;
    font-size: 8px;
}

.user-auth-buttons{
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
}
</style>