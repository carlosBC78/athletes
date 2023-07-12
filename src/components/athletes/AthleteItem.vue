<template>
    <div class="athlete-item">
        <li>
            <h3>{{ fullName }}</h3>
            <h4>{{ age }}</h4>
            <div>
                <base-badge v-for="typeCourse in typeCourses" :key="typeCourse" 
                    :type="typeCourse"
                    :title="typeCourse">
                </base-badge>
            </div>
            <div class="athlete-item--actions">
                <base-button mode="outline" link :to="athleteContactLink">Contacto</base-button>
                <base-button link :to="athleteDetailLink">Ver detalle</base-button>
            </div>
        </li>
    </div>
</template>

<script>
    export default {
        name: 'AthleteItem',
        props: {
            id: {
                type: String,
                default: undefined
            },
            firstName: {
                type: String,
                default: undefined
            },
            lastName: {
                type: String,
                default: undefined
            },
            age: {
                type: Number,
                default: undefined
            },
            typeCourses: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            fullName(){
                return `${this.firstName.trim()} ${this.lastName.trim()}`;
            },
            athleteContactLink(){
                return `${this.$route.path}/${this.id}/contact`;
            },
            athleteDetailLink(){
                return `${this.$route.path}/${this.id}`;
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

.athlete-item--actions{
    display: flex;
    justify-content: flex-end;
}
</style>