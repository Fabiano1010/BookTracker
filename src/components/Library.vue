<template>
    LIB
</template>

<script>
export default {
    name: 'Library',

    methods:{

        loadData() {
        this.storedData = this.getFromLocalStorage();
        },
        
        getFromLocalStorage() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
        },
        
        clearData() {
        localStorage.removeItem(this.storageKey);
        this.storedData = null;
        }
    }
}
</script>

<style>

</style>