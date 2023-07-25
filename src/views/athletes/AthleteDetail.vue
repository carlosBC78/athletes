<template>
    <div class="athlete-detail">
        <section>
            <base-card>
                <h2>{{ fullName }}</h2>
                <h3>{{ age }}</h3>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="typeCourse in typeCourses" :key="typeCourse"
                    :type="typeCourse"
                    :title="typeCourse">
                </base-badge>
                <p>{{ description }}</p>
            </base-card>
        </section>
        <section v-if="isRegister">
            <base-card>
                    <h3>Acceso al listado de carreras</h3>
                    <base-button link :to="courseListLink">Listado</base-button>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h3>¿Interesado? ¡Contacte con el/la atleta!</h3>
                    <base-button link :to="contactLink">Contacto</base-button>
                </header>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        id: {
                type: String,
                default: undefined
            }
    },
    data(){
        return {
            selectedAthlete: undefined
        }
    },
    computed: {
        fullName(){
            return `${this.selectedAthlete.firstName} ${this.selectedAthlete.lastName}`;
        },
        age(){
            return this.selectedAthlete.age;
        },
        contactLink(){
            // return `${this.$route.path}/contact`;
            return `${this.$route.path}/contact`;
        },
        typeCourses(){
            return this.selectedAthlete.typeCourses;
        },
        description(){
            return this.selectedAthlete.description;
        },
        courseListLink(){
            return `${this.$route.path}/courses`;
        },
        isRegister(){
            return !!this.$store.getters['auth/getUserId'];
        }
    },
    created(){
        this.selectedAthlete = 
            this.$store.getters['athletes/getAthletesList'].find(ath => ath.id === this.id);
    }
}
</script>