<template>
    <div class="course-form">
        <form @submit.prevent="submitForm">
            <div class="course-form--control"
              :class="{'course-form--control-invalid' : !edition.isValid}">
              <label for="edition">Edición</label>
              <input type="number" id="edition" v-model.number="edition.val"
                @blur="clearValidity('edition')" />
              <p class="course-form--control-invalid--message" v-if="!edition.isValid">El campo 'Edición' debe ser mayor que 0.</p>
            </div>
            <div class="course-form--control" 
              :class="{'course-form--control-invalid' : !name.isValid}">
                <label for="name">Nombre</label>
                <input type="text" id="name" v-model.trim="name.val" 
                  @blur="clearValidity('name')"/>
                <p class="course-form--control-invalid--message" v-if="!name.isValid">El campo 'Nombre' no puede estar vacío.</p>
            </div>
            <div class="course-form--control"
              :class="{'course-form--control-invalid' : !type.isValid}">
                <label for="type">Tipo</label>
                <input type="text" id="type" v-model.trim="type.val"
                  @blur="clearValidity('type')"/>
                <p class="course-form--control-invalid--message" v-if="!type.isValid">El campo 'Tipo' no puede estar vacío.</p>
            </div>
            <div class="course-form--control"
              :class="{'course-form--control-invalid' : !distance.isValid}">
                <label for="distance">Distancia</label>
                <input type="number" id="distance" v-model.number="distance.val" 
                  @blur="clearValidity('distance')" />
                <p class="course-form--control-invalid--message" v-if="!distance.isValid">El campo 'Distancia' debe ser mayor que 0.</p>
            </div>
            <div class="course-form--control"
              :class="{'course-form--control-invalid' : !courseDate.isValid}">
                <label for="courseDate">Fecha de la competición</label>
                <input type="date" id="courseDate" v-model.trim="courseDate.val" 
                  @blur="clearValidity('courseDate')" />
                <p class="course-form--control-invalid--message" v-if="!courseDate.isValid">El campo 'Fecha' debe tener algún valor.</p>
            </div>
            <div class="course-form--control"
              :class="{'course-form--control-invalid' : !netTime.isValid}">
                <label for="netTime">Tiempo neto</label>
                <input type="text" id="netTime" placeholder="hh:mm.ss" v-model.trim="netTime.val" 
                  @blur="clearValidity('netTime')" />
                <p class="course-form--control-invalid--message" v-if="!netTime.isValid">El campo 'Tiempo neto' debe tener algún valor válido.</p>
            </div>
            <div class="course-form--control">
              <!-- :class="{'course-form--control-invalid' : !officialTime.isValid}" -->
                <label for="officialTime">Tiempo oficial</label>
                <input type="text" id="officialTime" placeholder="hh:mm.ss" v-model.trim="officialTime.val"/>
                <!-- @blur="clearValidity('officialTime')" -->
                <!-- <p class="course-form--control-invalid--message" v-if="!officialTime.isValid">El campo 'Tiempo neto' debe tener algún valor válido.</p> -->
            </div>                                
            <p class="course-form--control-invalid--message" v-if="!formIsValid">Por favor, revise los campos del formulario.</p>
            <base-button>Grabar carrera</base-button>
            <base-button link :to="goBackLink">Volver</base-button>
        </form>
    </div>
</template>

<script>
export default {
    emits: ['save-data'],
    data(){
        return {
            edition: {
              val: null, isValid: true
            },
            name: {
              val: '', isValid: true
            },
            type: {
              val: '', isValid: true
            },
            distance: {
              val: null, isValid: true
            },
            courseDate: {
              val: '', isValid: true
            },            
            netTime: {
              val: '', isValid: true
            },
            officialTime: {
              val: '', isValid: true
            },
            formIsValid: true
        }
    },
    computed: {
        goBackLink(){
            const route = this.$route.path.replace('/register', '');
            return route;
        }
    },
    methods: {
      clearValidity(input){
        this[input].isValid = true;
      },
      validateForm(){
        this.formIsValid = true;
        if(this.edition.val === null || this.edition.val <= 0){
          this.edition.isValid = false;
          this.formIsValid = false;
        }
        if(this.name.val === ''){
          this.name.isValid = false;
          this.formIsValid = false;
        }
        if(this.type.val === ''){
          this.type.isValid = false;
          this.formIsValid = false;
        }
        if(this.distance.val === null || this.distance.val <= 0){
          this.distance.isValid = false;
          this.formIsValid = false;
        }
        if(this.courseDate.val === ''){
          this.courseDate.isValid = false;
          this.formIsValid = false;
        }
        if(this.netTime.val === '' || !this.validateTime(this.netTime.val)){
          this.netTime.isValid = false;
          this.formIsValid = false;
        }
      },
      // formato del tiempo hh:mm:ss
      validateTime(time){
        let isValid = false;
        if(time !== '' || time.length === 8 && time.contains(':')){
          const arrTime = time.split(':');
          const hour = arrTime[0];
          const minutes = arrTime[1];
          const seconds = arrTime[2];
          isValid = parseInt(hour) >= 0 &&
            parseInt(minutes) < 60 && parseInt(minutes) >= 0 &&
            parseInt(seconds) < 60 && parseInt(seconds) >= 0;          
        }
        return isValid;
      },
      submitForm(){
        this.validateForm();

        if(!this.formIsValid){
          return;
        }
        const formData = {
            edition: this.edition.val,
            name: this.name.val,
            type: this.type.val,
            distance: this.distance.val,
            courseDate: this.courseDate.val,
            netTime: this.netTime.val,
            officialTime: this.officialTime.val

        };
        // console.log("Formulario", formData);
        this.$emit('save-data', formData);
      }
    }
}
</script>

<style scoped>
.course-form--control {
  margin: 8px 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 8px;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 8px 0;
  font-size: 16px;
}

.course-form--control-invalid label {
  color: red;
}

.course-form--control-invalid input,
.course-form--control-invalid textarea {
  border: 1px solid red;
}

.course-form--control-invalid--message{
  font-size: 8px;
}
</style>