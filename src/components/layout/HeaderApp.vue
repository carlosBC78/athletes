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
                <li>
                    <router-link to="/requests">Mensajes recibidos</router-link>
                </li>
            </ul>
        </nav>
    </header>
  </div>
</template>

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

</style>