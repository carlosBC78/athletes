<template>
    <div class="base-card">
        <slot>

        </slot>
    </div>
</template>

<style scoped>

.base-card{
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 8px;
    margin: 8px auto;
    max-width: 450px;
}
</style>