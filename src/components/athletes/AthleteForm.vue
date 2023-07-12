<template>
    <div class="athlete-form">
        <form @submit.prevent="submitForm">
            <div class="athlete-form--control" 
              :class="{'athlete-form--control-invalid' : !firstName.isValid}">
                <label for="firstName">Nombre</label>
                <input type="text" id="firstName" v-model.trim="firstName.val" 
                  @blur="clearValidity('firstName')"/>
                <p class="athlete-form--control-invalid--message" v-if="!firstName.isValid">El campo 'Nombre' no puede estar vacío.</p>
            </div>
            <div class="athlete-form--control"
              :class="{'athlete-form--control-invalid' : !lastName.isValid}">
                <label for="lastName">Apellidos</label>
                <input type="text" id="lastName" v-model.trim="lastName.val"
                  @blur="clearValidity('lastName')"/>
                <p class="athlete-form--control-invalid--message" v-if="!lastName.isValid">El campo 'Apellidos' no puede estar vacío.</p>
            </div>
            <div class="athlete-form--control"
              :class="{'athlete-form--control-invalid' : !description.isValid}">
                <label for="description">Descripción</label>
                <textarea id="description" rows="5" v-model.trim="description.val" 
                  @blur="clearValidity('description')"></textarea>
                <p class="athlete-form--control-invalid--message" v-if="!description.isValid">El campo 'Descripción' no puede estar vacío.</p>
            </div>
            <div class="athlete-form--control"
              :class="{'athlete-form--control-invalid' : !age.isValid}">
                <label for="age">Edad</label>
                <input type="number" id="age" v-model.number="age.val"
                  @blur="clearValidity('age')"/>
                <p class="athlete-form--control-invalid--message" v-if="!age.isValid">El campo 'Edad' no puede ser un valor vacío o negativo.</p>
            </div>
            <div class="athlete-form--control"
            :class="{'athlete-form--control-invalid' : !typeCourses.isValid}">
                <h3>Tipos de carrera</h3>
                <div>
                    <input type="checkbox" id="ruta" value="ruta" v-model="typeCourses.val" 
                      @blur="clearValidity('typeCourses')"/>
                    <label for="ruta">Ruta</label>
                </div>
                <div>
                    <input type="checkbox" id="trail" value="trail" v-model="typeCourses.val" 
                      @blur="clearValidity('typeCourses')"/>
                    <label for="trail">Trail</label>
                </div>
                <div>
                    <input type="checkbox" id="cross" value="cross" v-model="typeCourses.val" 
                      @blur="clearValidity('typeCourses')"/>
                    <label for="cross">Cross</label>
                </div>
                <p v-if="!typeCourses.isValid">Debe seleccionar un tipo de carrera.</p>
            </div>
            <p class="athlete-form--control-invalid--message" v-if="!formIsValid">Por favor, revise los campos del formulario.</p>
            <base-button>Registrar</base-button>
        </form>
    </div>
</template>

<script>
export default {
    emits: ['save-data'],
    data(){
        return {
            // firstName: '',
            // lastName: '',
            // description: '',
            // age: null,
            // typeCourses: [],
            // formIsValid: true
            firstName: {
              val: '', isValid: true
            },
            lastName: {
              val: '', isValid: true
            },
            description: {
              val: '', isValid: true
            },
            age: {
              val: null, isValid: true
            },
            typeCourses: {
              val: [], isValid: true
            },
            formIsValid: true
        }
    },
    methods: {
      clearValidity(input){
        this[input].isValid = true;
      },
      validateForm(){
        this.formIsValid = true;
        if(this.firstName.val === ''){
          this.firstName.isValid = false;
          this.formIsValid = false;
        }
        if(this.lastName.val === ''){
          this.lastName.isValid = false;
          this.formIsValid = false;
        }
        if(this.description.val === ''){
          this.description.isValid = false;
          this.formIsValid = false;
        }
        if(!this.age.val || this.age.val < 0){
          this.age.isValid = false;
          this.formIsValid = false;
        }
        if(this.typeCourses.val.length === 0){
          this.typeCourses.isValid = false;
          this.formIsValid = false;
        }
      },
      submitForm(){
        this.validateForm();

        if(!this.formIsValid){
          return;
        }
        const formData = {
            first: this.firstName.val,
            last: this.lastName.val,
            desc: this.description.val,
            age: this.age.val,
            typeCourses: this.typeCourses.val
        };
        // console.log("Formulario", formData);
        this.$emit('save-data', formData);
      }
    }
}
</script>

<style scoped>
.athlete-form--control {
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

.athlete-form--control-invalid label {
  color: red;
}

.athlete-form--control-invalid input,
.athlete-form--control-invalid textarea {
  border: 1px solid red;
}

.athlete-form--control-invalid--message{
  font-size: 8px;
}
</style>