<template>
    <div class="athlete-filter">
        <base-card>
            <h2>Filtrar atletas</h2>
            <span class="athlete-filter--option">
                <input type="checkbox" id="ruta" checked @change="setFilter"/>
                <label for="ruta">Ruta</label>
            </span>
            <span class="athlete-filter--option">
                <input type="checkbox" id="trail" checked @change="setFilter"/>
                <label for="trail">Trail</label>
            </span>
            <span class="athlete-filter--option">
                <input type="checkbox" id="cross" checked @change="setFilter"/>
                <label for="cross">Cross</label>
            </span>
        </base-card>
    </div>
</template>

<script>
export default {
    name: 'AthleteFilter',
    emits: ['change-filter'],
    data(){
        return {
            filters: {
                ruta: true,
                trail: true,
                cross: true
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
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 8px 0;
}

.athlete-filter--option {
  margin-right: 4px;
}

.athlete-filter--option label,
.athlete-filter--option input {
  vertical-align: middle;
}

.athlete-filter--option label {
  margin-left: 2px;
}

.athlete-filter--option label {
  font-weight: bold;
}
</style>