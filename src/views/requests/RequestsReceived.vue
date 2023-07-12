<template>
    <div class="request-received">
        <base-dialog :show="!!error" title="¡Ha sucedido un error!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <header>
                <h2>Mensajes Recibidos</h2>
            </header>
            <div v-if="isLoading">        
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasRequests && !isLoading">
                <RequestItem v-for="req in receivedRequests" 
                    :key="req.id" 
                    :email="req.userEmail" 
                    :message="req.message">
                </RequestItem>
            </ul>
            <h3 v-else>No tiene mensajes</h3>
        </base-card>
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import requestService from '../../mixins/services/request.js';

export default {
    name: 'RequestsReceived',
    mixins: [requestService],
    components: {
        RequestItem
    },
    data(){
        return {
            isLoading: false,
            error: null
        }
    },
    created(){
        this.getRequestList();
    },
    computed: {
        receivedRequests(){
            return this.$store.getters['requests/getRequests'];
        },
        hasRequests(){
            return this.$store.getters['requests/hasRequests'];
        }
    },
    methods: {
        getRequestList(){
            //Llamada al servicio back para recuperar el listado de mensajes      
            const basePath = 'https://pj-vue-athlete-back-default-rtdb.europe-west1.firebasedatabase.app/';
            const athleteId = this.$store.getters['getUserId'];
            this.isLoading = true;
            this.loadRequestList(basePath, athleteId)
                .catch(error => {
                    this.error = error.message || '¡Algo ha salido mal!';
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        handleError(){
            this.error = null;
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 8px auto;
  padding: 0;
  max-width: 350px;
}

h3 {
  text-align: center;
}
</style>