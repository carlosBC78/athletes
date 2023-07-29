<template>
    <div class="course-filter">
        <base-card>
            <h2>Filtrar tipo de carrera</h2>
            <span class="course-filter--option">
                <input type="checkbox" id="fiveK" checked @change="setFilter"/>
                <label for="fiveK">5.000</label>
            </span>
            <span class="course-filter--option">
                <input type="checkbox" id="tenK" checked @change="setFilter"/>
                <label for="tenK">10.000</label>
            </span>
            <span class="course-filter--option">
                <input type="checkbox" id="marathon" checked @change="setFilter"/>
                <label for="marathon">Maratón</label>
            </span>
            <span class="course-filter--option">
                <input type="checkbox" id="halfMarathon" checked @change="setFilter"/>
                <label for="halfMarathon">Media Maratón</label>
            </span>
            <span class="course-filter--option">
                <input type="checkbox" id="other" checked @change="setFilter"/>
                <label for="other">Otras</label>
            </span>
            <div class="course-filter--search">
                <label for="filter">Buscar</label>
                <input type="text" id="filter" v-on:input="search"/>
            </div>
        </base-card>
    </div>
</template>

<script>
export default {
    name: 'CourseFilter',
    emits: ['change-filter', 'advanced-search'],
    data(){
        return {
            filters: {
                fiveK: true,
                tenK: true,
                marathon: true,
                halfMarathon: true,
                other: true
            }
        }
    },
    methods: {
        setFilter(event){
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const updatedFilters = {
                ...this.filters,
                [inputId]: isActive
            };
            this.filters = updatedFilters;
            this.$emit('change-filter', this.filters);
        },
        search(event){
            this.$emit('advanced-search', event.target.value);
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 8px 0;
}

.course-filter--option {
  margin-right: 4px;
}

.course-filter--option label,
.course-filter--option input {
  vertical-align: middle;
}

.course-filter--option label {
  margin-left: 2px;
}

.course-filter--option label {
  font-weight: bold;
}

.course-filter--search{
    margin: 8px;
    padding: 4px;
    display: flex;
    align-items: center;
}

.course-filter--search label{
    margin-right: 8px;
}
.course-filter--search input{
    padding: 4px;
}
</style>