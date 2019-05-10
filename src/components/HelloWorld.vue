<template>
    <div class="text-center">
        <h1>{{ msg }}</h1>
        <b-button variant="primary" size="lg" class="mt-3" type="submit" to="verify">Join List</b-button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        }
    };
</script>

<style scoped lang="scss">
    h1 {
        letter-spacing: 2px;
    }
</style>
