<template>
    <div class="course-registration">
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <base-card v-else>
            <h2>Registrar carrera</h2>
            <CourseForm @save-data="saveData"></CourseForm>
        </base-card>
    </div>
</template>

<script>
import CourseForm from '../../components/courses/CourseForm.vue';
import courseService from '../../mixins/services/course.js';

export default {
    name: 'CourseRegistration',
    mixins: [courseService],
    data(){
        return {
            isLoading: false,
            // error: null
        }
    },
    components: {
        CourseForm
    },
    methods: {
        saveData(data){
            const athleteId = this.$route.params.id;
            const courseData = {
                edition: data.edition,
                name: data.name,
                type: data.type,
                distance: data.distance,
                courseDate: data.courseDate,
                netTime: data.netTime,
                officialTime: data.officialTime
            };
            //Llamada al servicio back para registrar el athleta
            const basePath = 'https://pj-vue-athlete-back-default-rtdb.europe-west1.firebasedatabase.app/'
            this.isLoading = true;
            const token = this.$store.getters['auth/getToken'];
            this.registerCourse(token, basePath, athleteId, courseData)
                .then((response) => {
                    this.$store.commit('courses/addCourse', 
                        {
                            ...courseData,
                            athleteId: athleteId,
                            id: response.data.name
                        });
                })
                // .catch(error => {
                //     this.error = error.message || '¡Algo ha salido mal!';
                //     this.$router.replace('/register');
                // })
                .finally(() => {
                    this.isLoading = false;
                    this.$router.replace(`/athletes/${athleteId}/courses`);
                });
        },
        // handleError(){
        //     this.error = null;
        // }
    }
}
</script>
