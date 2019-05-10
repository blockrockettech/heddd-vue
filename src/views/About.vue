<template>
    <div class="about">
        <h1>This is an about page</h1>

        <guid :uid="guid" v-if="guid"></guid>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Guid from '../components/Guid';

    export default {
        name: 'about',
        components: {Guid},
        computed: {
            ...mapState([
                'guid',
            ]),
        },
    };
</script>