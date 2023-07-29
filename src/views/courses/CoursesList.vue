<template>
    <div class="courses-list">
        <div>
            <CourseFilter @change-filter="setFilter" @advanced-search="onAdvancedSearch"></CourseFilter>
        </div>
        <base-card>
            <div class="courses-list--controls">
                <!-- <base-button mode="outline" @click="initCourseList()">Refrescar</base-button> -->
                <base-button v-if="isAthleteRegister" link :to="courseRegistrationLink">Registrar carrera</base-button>
                <div>Total carreras: {{ numCourses }}</div>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner> 
            </div>     
            <ul v-else-if="hasCourses">
                <CourseItem v-for="course in courseListOrder" 
                        :key="course.id" 
                        :course="course">
                </CourseItem>
            </ul>
            <p v-else>No hay carreras registradas.</p>   
        </base-card>
    </div>
</template>

<script>
import CourseFilter from '../../components/courses/CourseFilter.vue';
import CourseItem from '../../components/courses/CourseItem.vue';
import courseService from '../../mixins/services/course.js';
import Normalize from '../../helpers/Normalize';

export default {
    name: 'CoursesList',
    mixins: [courseService],
    components: {
        CourseFilter,
        CourseItem
    },
    computed: {
        coursesListComp(){
            const athleteId = this.$route.params.id;
            const courseList = this.$store.getters['courses/getCourses'];
            const courseListAthleteSelected = courseList.filter(course => course.athleteId === athleteId);
            return courseListAthleteSelected.filter(course => {
                if(this.activeFilters.fiveK && course.distance && course.distance === 5000){
                    return true;
                }
                if(this.activeFilters.tenK && course.distance && course.distance === 10000){
                    return true;
                }
                if(this.activeFilters.marathon && course.distance && course.distance === 42195){
                    return true;
                }
                if(this.activeFilters.halfMarathon && course.distance && course.distance === 21097){
                    return true;
                }
                if(this.activeFilters.other && course.distance &&
                    course.distance !== 5000 && 
                    course.distance !== 10000 &&
                    course.distance !== 42195 &&
                    course.distance !== 21097){
                    return true;
                }
                return false;
            }); 
        },
        courseRegistrationLink(){
            return `${this.$route.path}/register`;
        },
        hasCourses(){
            return this.$store.getters['courses/hasCourses'];
        },
        numCourses(){
            return this.courseListOrder.length;
        },
        courseListOrder(){
            const coursesListAux = structuredClone(this.coursesListComp);
            coursesListAux.forEach((elem, index) => {
                coursesListAux[index].time = (new Date(elem.courseDate)).getTime();    
            });
            coursesListAux.sort((a,b) => b.time - a.time);//fecha más actual
            
            return this.filter !== '' ? 
                coursesListAux.filter(course => 
                    Normalize.removeAccents(course.name.toLowerCase()).includes(this.filter)) 
                : coursesListAux;
            
        },
        isAthleteRegister(){
            const userRegisterEmail = this.$store.getters['auth/getEmail'];
            const athletesList = this.$store.getters['athletes/getAthletesList'];
            const athleteRegister = athletesList.find(ath => ath.email === userRegisterEmail);
            if(athleteRegister && athleteRegister !== null){
                const athleteRegisterId = athleteRegister.id;
                return athleteRegisterId === this.$route.params.id;
            }
            return false;
        }
    },
    data(){
        return {
            coursesList: [],
            activeFilters: {
                fiveK: true,
                tenK: true,
                marathon: true,
                halfMarathon: true,
                other: true
            },
            isLoading: false,
            filter: ''
        }
    },
    created(){
        // this.coursesList = this.$store.getters['courses/getCourses'];
        this.initCourseList();
    },
    methods: {
        // initCourseList(refresh = false){
        //     if(!refresh){
        //         this.coursesList = this.$store.getters['courses/getCourses'];
        //         return;
        //     }
        initCourseList(){
            this.isLoading = true;
            const basePath = 'https://pj-vue-athlete-back-default-rtdb.europe-west1.firebasedatabase.app/';
            const athleteId = this.$route.params.id;
            const token = this.$store.getters['auth/getToken'];
            this.loadCoursesList(token, basePath, athleteId)
                .finally(() => {
                    this.isLoading = false;
                })
        },
        //recibo un objeto
        setFilter(filtro){
            this.activeFilters = filtro;
        },
        onAdvancedSearch(text){
            this.filter = Normalize.removeAccents(text.trim().toLowerCase());
            
                        //Expresión regular
                        // .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

                        //Reemplazar todos los caractéres especiales
                        // .replace(new RegExp("\\s", 'g'),"")
                        // .replace(new RegExp("[àáâãäå]", 'g'),"a")
                        // .replace(new RegExp("æ", 'g'),"ae")
                        // .replace(new RegExp("ç", 'g'),"c")
                        // .replace(new RegExp("[èéêë]", 'g'),"e")
                        // .replace(new RegExp("[ìíîï]", 'g'),"i")
                        // .replace(new RegExp("ñ", 'g'),"n")                       
                        // .replace(new RegExp("[òóôõö]", 'g'),"o")
                        // .replace(new RegExp("œ", 'g'),"oe")
                        // .replace(new RegExp("[ùúûü]", 'g'),"u")
                        // .replace(new RegExp("[ýÿ]", 'g'),"y")
                        // .replace(new RegExp("\\W", 'g'),"");
                        
                        // console.log('normalizado', this.filter);
        }
    }

}
</script>

<style scoped>
.courses-list{
  /* height: calc(100% - 90px); */
  width: 100%;
}

ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

.courses-list--controls{
  display: flex;
  justify-content: space-between;
}
</style>