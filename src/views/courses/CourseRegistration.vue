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
            const userId = this.$route.params.id;
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
            this.registerCourse(basePath, userId, courseData)
                .then((response) => {
                    this.$store.commit('courses/addCourse', 
                        {
                            ...courseData,
                            athleteId: userId,
                            id: response.data.name
                        });
                })
                // .catch(error => {
                //     this.error = error.message || '¡Algo ha salido mal!';
                //     this.$router.replace('/register');
                // })
                .finally(() => {
                    this.isLoading = false;
                    this.$router.replace(`/athletes/${userId}/courses`);
                });
        },
        // handleError(){
        //     this.error = null;
        // }
    }
}
</script>
