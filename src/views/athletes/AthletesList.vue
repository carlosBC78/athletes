<template>
  <div class="athletes-list">
    <base-dialog :show="!!error" title="¡Error!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div>
      <AthleteFilter @change-filter="setFilter"></AthleteFilter>
    </div>
    <base-card>
      <div class="athletes-list--controls">
        <base-button mode="outline" @click="initAthletesList(true)">Refrescar</base-button>
        <base-button v-if="!isAthleteRegister && !isLoading" link to="/register">Registrar</base-button>
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
        const userId = this.$store.getters['getUserId'];
        return this.athletesList.some(ath => ath.id === userId)
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
      
      this.isLoading = true;
      this.loadAthletesList(basePath)
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