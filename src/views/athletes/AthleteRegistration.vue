<template>
    <div class="athlete-registration">
        <base-dialog :show="!!error" title="¡Error!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <h2>Registrar atleta</h2>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <AthleteForm v-else @save-data="saveData"></AthleteForm>
        </base-card>
    </div>
</template>

<script>
import AthleteForm from '../../components/athletes/AthleteForm.vue';
import athleteService from '../../mixins/services/athlete.js';

export default {
    name: 'AthleteRegistration',
    mixins: [athleteService],
    data(){
        return {
            isLoading: false,
            error: null
        }
    },
    components: {
        AthleteForm
    },
    methods: {
        saveData(data){
            const userId = this.$store.getters['getUserId'];
            const athleteData = {
                firstName: data.first,
                lastName: data.last,
                typeCourses: data.typeCourses,
                description:data.desc,
                age: data.age
            };
            //Llamada al servicio back para registrar el athleta
            const basePath = 'https://pj-vue-athlete-back-default-rtdb.europe-west1.firebasedatabase.app/'
            this.isLoading = true;
            this.registerAthlete(basePath, userId, athleteData)
                .then(() => {
                    // console.log('respuesta al registrar', response);
                    this.$store.commit('athletes/setAthletesList', 
                        {
                            ...athleteData,
                            id: userId
                        });
                })
                .catch(error => {
                    this.error = error.message || '¡Algo ha salido mal!';
                    this.$router.replace('/register');
                })
                .finally(() => {
                    this.isLoading = false;
                    //Volvemos a la página principal
                    // this.$router.push('/athletes');
                    this.$router.replace('/athletes');//no permite volver
                });
            // await fetch(`${basePath}athletes/${userId}.json`, {
            //     method: 'PUT',
            //     body: JSON.stringify(athleteData)
            // });
        },
        handleError(){
            this.error = null;
        }
    }
}
</script>
