<template>
  <div class="request-item">
    <li>
        <div>
            <a :href="emailLink">{{ email }}</a>
        </div>
        <p>{{ message }}</p>
    </li>
  </div>
    
</template>

<script>
export default {
    props: ['email', 'message'],
    computed: {
        emailLink(){
            return `mailto:${this.email}`
        }
    }
}
</script>

<style scoped>
li {
  margin: 8px 0;
  border: 1px solid #ccc;
  padding: 4px;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 2px 0 0 0;
}
</style>