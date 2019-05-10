<template>
    <div class="alert alert-info">
        <span class="label label-primary">Enquiry Guid:</span> {{ uid }}
    </div>
</template>
<script>
    export default {
        name: 'Guid',
        props: ['uid'],
    };
</script>

