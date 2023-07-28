<template>
  <div class="header-app">
    <header>
        <nav>
            <h1>
                <router-link to="/">Athletes</router-link>
            </h1>
            <ul>
                <li>
                    <router-link to="/athletes">Lista de atletas</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link to="/requests">Mensajes recibidos</router-link>
                </li>
                <li v-else>
                  <router-link to="/auth">Entrar</router-link>
                </li>
                <li v-if="isLoggedIn">
                  <base-button @click="logout">Salir</base-button>
                </li>
            </ul>
        </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderApp',
  computed: {
    isLoggedIn(){
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods: {
    logout(){
      const logoutObj = {
        token: null,
        userId: null,
        // tokenExpiration: null
      }

      //Borramos del local storage el token
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      // localStorage.removeItem('tokenExpiration');

      this.$store.commit('auth/setUser', logoutObj);
      this.$router.replace('/athletes');
    }
  }

}
</script>

<style scoped>
.header-app{
  width: 100%;
}

header {
  width: 100%;
  height: 90px;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header ul{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid transparent;
}

li {
  margin: 0 10px;
  font-size: 15px;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

@media (max-width: 620px){
  li{
    margin: 0px 5px;
    font-size: 14px;
  }
}

@media (max-width: 515px){
  li{
    margin: 0px;
    font-size: 12px;
  }
}

@media (max-width: 450px){
  header li a{
    font-size: 11px;
    padding: 3px 6px;
  }

  header h1 a{
    font-size: 20px;
    padding: 3px 0px;
  }
}



</style>