<template>
  <div class="athletes-list">
    <base-dialog :show="!!error" title="¡Error!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div>
      <AthleteFilter @change-filter="setFilter"></AthleteFilter>
    </div>
    <div class="athletes-list--container">
      <base-card>
        <div class="athletes-list--controls">
          <base-button mode="outline" @click="initAthletesList(true)">Refrescar</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn && registerAthletes">Entrar para registrarse como atleta</base-button>
          <base-button v-if="!isAthleteRegister && !isLoading && isLoggedIn && registerAthletes" link to="/register">Registrarse como atleta</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasAthletes">
            <AthleteItem v-for="athlete in athletesListComp" :key="athlete.id" 
              :id="athlete.id" 
              :first-name="athlete.firstName"
              :last-name="athlete.lastName"
              :age="athlete.age"
              :type-courses="athlete.typeCourses">
            </AthleteItem>
        </ul>
        <p v-else>No hay atletas registrados.</p>      
    </base-card>
    </div>
  </div>
</template>

<script>
import AthleteItem from '@/components/athletes/AthleteItem.vue';
import AthleteFilter from '../../components/athletes/AthleteFilter.vue';
import athleteService from '../../mixins/services/athlete.js';

export default {
  name: 'AthletesList',
  mixins: [athleteService],
  components: {
    AthleteItem,
    AthleteFilter
  },
  data(){    
      return {
        athletesList: [],
        activeFilters: {
            ruta: true,
            trail: true,
            cross: true
        },
        isLoading: false,
        error: null
      }
  },  
  computed: {
    isLoggedIn(){
      return this.$store.getters['auth/isAuthenticated'];
    },
    athletesListComp(){
      return this.athletesList.filter(ath => {
        if(this.activeFilters.ruta && ath.typeCourses && ath.typeCourses.includes('ruta')){
          return true;
        }
        if(this.activeFilters.cross && ath.typeCourses && ath.typeCourses.includes('cross')){
          return true;
        }
        if(this.activeFilters.trail && ath.typeCourses && ath.typeCourses.includes('trail')){
          return true;
        }
        return false;
      });
    },
    hasAthletes(){
      return !this.isLoading && this.$store.getters['athletes/hasAthletes'];
    },
    isAthleteRegister(){
        const email = this.$store.getters['auth/getEmail'];
        // console.log(email, this.athletesList);
        return this.athletesList.some(ath => ath.email === email);
    },
    registerAthletes(){
      //Cambiar a valor true en el caso que activemos darse de alta a otros atletas
      return false;
    }
  },
  created(){
    this.initAthletesList();
  },
  methods: {
    //recibo un objeto
    setFilter(filtro){
      this.activeFilters = filtro;
    },
    // async initAthletesList(){
    initAthletesList(refresh = false){
      if (!refresh && 
            !this.$store.getters['athletes/shouldUpdate']) {
        this.athletesList = this.$store.getters['athletes/getAthletesList'];
        return;
      }
      //Llamada al servicio back para recuperar el listado de athletas      
      const basePath = 'https://pj-vue-athlete-back-default-rtdb.europe-west1.firebasedatabase.app/'
  
      // const response = await fetch(`${basePath}athletes.json`);
      // const responseData = await response.json();
      
      // const userId = this.$store.getters['auth/getUserId'];
      // const token = this.$store.getters['auth/getToken'];
      this.isLoading = true;
      this.loadAthletesList(null, basePath/*, userId*/)
        .then(() => {
          this.athletesList = this.$store.getters['athletes/getAthletesList'];
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
    }
  }
}
</script>

<style scoped>
.athletes-list{
  /* height: calc(100% - 90px); */
  width: 100%;
}

.athletes-list--container{
  margin: 0px 10px;
}

ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

.athletes-list--controls{
  display: flex;
  justify-content: space-between;
}
</style>