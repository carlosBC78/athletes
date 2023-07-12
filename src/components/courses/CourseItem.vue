<template>
    <div class="course-item">
        <li>
            <h3>{{ courseEdition }} {{ courseName }}</h3>
            <h4>{{ courseDateComp }}</h4>
            <h4>Marca: {{ courseTime }}</h4>
            <div class="course-item--actions">
                <base-button link :to="courseDetailLink">Ver detalle</base-button>
            </div>
        </li>
    </div>
</template>

<script>
import {days, months} from '../../helpers/dateHelpers';
    export default {
        name: 'CourseItem',
        props: {
            course: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            courseEdition(){
                return `${this.course.edition}`;
            },
            courseName(){
                return `${this.course.name.trim()}`;
            },
            courseType(){
                return `${this.course.type.trim()}`;
            },
            courseDateComp(){
                return this.formatDate(this.course.courseDate);
            },
            courseDetailLink(){
                return `${this.$route.path}/${this.course.id}`;
            },
            courseTime(){
                return `${this.course.netTime.trim()}`;
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

<style scoped>
li {
  margin: 10px 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 4px;
}

h3 {
  font-size: 18px;
}

h3,
h4 {
  margin: 10px 0;
}

div {
  margin: 10px 0;
}

.course-item--actions{
    display: flex;
    justify-content: flex-end;
}
</style>