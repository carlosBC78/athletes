<template>
    <div class="athlete-detail">
        <section>
            <base-card>
                <h2>{{ selectedCourse.edition}} {{ selectedCourse.name }}</h2>
                <h3>{{ courseDateComp }}</h3>
                <h3>{{ selectedCourse.type }}</h3>
                <h3>{{ selectedCourse.distance }}</h3>
                <h3>{{ selectedCourse.netTime }}</h3>
                <h3>{{ selectedCourse.officialTime }}</h3>
                <base-button link :to="goBackLink">Volver al listado de carreras</base-button>
            </base-card>
        </section>
        <!-- <section>
            <base-card>
                <header>
                    <h5>Añadir comentario a esta competición</h5>
                </header>
            </base-card>
        </section> -->
    </div>
</template>

<script>
import {days, months} from '../../helpers/dateHelpers';

export default {
    data(){
        return {
            selectedCourse: undefined
        }
    },
    created(){
        const courseId = this.$route.params.cid;
        this.selectedCourse = 
            this.$store.getters['courses/getCourses'].find(c => c.id === courseId);
    },
    computed: {
        goBackLink(){
            const route = this.$route.path.replace(`/${this.$route.params.cid}`, '');
            return route;
        },
        courseDateComp(){
            return this.formatDate(this.selectedCourse.courseDate);
        }
    },
    methods: {
        formatDate(date){
            const d = new Date(date);
            const arrD = date.split('-');
            const day = arrD[2];
            const year = arrD[0];
            const dayOfWeek = days[d.getDay()];
            const month = months[d.getMonth()];
            return `${dayOfWeek} ${day} de ${month} de ${year}`;
        }
    }
}
</script>