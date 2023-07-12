<template>
    <span class="base-badge" :class="type">
        {{ text }}
    </span>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: undefined
        },
        title: {
            type: String,
            default: undefined
        }
    },
    computed: {
        text(){
            return this.title.toUpperCase();
        }
    }
}
</script>

<style scoped>
.base-badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 2px 4px;
  display: inline-block;
  margin-right: 2px;
}

.ruta {
  background-color: #3d008d;
  color: white;
}

.trail {
  background-color: #71008d;
  color: white;
}

.cross {
  background-color: #8d006e;
  color: white;
}
</style>
