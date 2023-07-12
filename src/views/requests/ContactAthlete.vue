<template>
    <div class="contact-athlete">
      <base-dialog :show="!!error" title="¡Error!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <form v-else @submit.prevent="submitForm">
          <h3>Mensaje para {{ athleteName }}</h3>
          <div class="contact-athlete--form-control">
              <label for="email">Correo electrónico</label>
              <input type="email" id="email" v-model.trim="email"/>
          </div>
          <div class="contact-athlete--form-control">
              <label for="message">Mensaje</label>
              <textarea rows="5" id="message" v-model.trim="message"></textarea>
          </div>
          <p class="contact-athlete--errors" v-if="!formIsValid">
              Por favor, introduzca un email válido y un mensaje.
          </p>
          <div class="contact-athlete--actions">
              <base-button>Enviar mensaje</base-button>
          </div>
        </form>
        </base-card>
    </div>
</template>

<script>
import requestService from '../../mixins/services/request.js';

export default {
  name: 'ContactAthlete',
  mixins: [requestService],
  data(){
      return {
          email: '',
          message: '',
          formIsValid: true,
          isLoading: false,
          error: null
      }
  },
  computed: {
    athleteName(){
      const athleteId = this.$route.params.id;
      const athlete = this.$store.getters['athletes/getAthletesList']
                        .find(a => a.id === athleteId);
      return `${athlete.firstName} ${athlete.lastName}`;
    }
  },
  methods: {
      submitForm(){
          this.formIsValid = true;
          if(this.email === '' || !this.email.includes('@') 
          || this.message === ''){
              this.formIsValid = false;
              return;
          }
          this.contactAthlete();
      },
      contactAthlete(){
          const newRequest = {
              // id: new Date().toISOString(),//id ficticia, el servidor generará una
              // athleteId: this.$route.params.id,
              userEmail: this.email,
              message: this.message
          };
          //Llamada al servicio back para recuperar el listado de athletas      
          const basePath = 'https://pj-vue-athlete-back-default-rtdb.europe-west1.firebasedatabase.app/'
          
          this.isLoading = true;
          this.registerRequest(basePath, this.$route.params.id, newRequest)
            .then((response) => {
                // console.log('registro de mensaje', response);
                newRequest.id = response.data.name;
                newRequest.athleteId = this.$route.params.id
                this.$store.commit('requests/addRequest', newRequest);
                //Volvemos a la página principal
                // this.$router.push('/athletes');
                this.$router.replace('/athletes');//no permite volver
            })
            .catch(error => {
              this.error = error.message || '¡Algo ha salido mal!';
            })
            .finally(() => {
              this.isLoading = false;
            });
      },
      handleError(){
        this.error = null;
        //Volvemos a la página principal
        // this.$router.push('/athletes');
        this.$router.replace('/athletes');//no permite volver
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

.contact-athlete {
  margin: 4px 0;
}

label {
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 2px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.contact-athlete--errors {
  font-weight: bold;
  color: red;
  font-size: 8px;
}

.contact-athlete--actions {
  text-align: center;
  margin: 8px 0px;
}
</style>