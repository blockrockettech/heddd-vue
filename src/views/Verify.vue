<template>
    <div>
        <guid :uid="guid" v-if="guid"></guid>

        <div v-if="results">
            <div class="alert alert-info">
                <span class="label label-primary">
                    {{results}}
                </span>
            </div>
        </div>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show" novalidate>
            <b-form-group
                    id="input-group-1"
                    label="Given or first name(s):"
                    label-for="input-1"
                    description="">
                <b-form-input
                        id="input-1"
                        v-model="form.firstnames"
                        required
                        placeholder=""
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Family or surname:" label-for="input-2">
                <b-form-input
                        id="input-2"
                        v-model="form.surname"
                        required
                        placeholder=""
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Date of birth:" label-for="input-3">
                <b-form-input
                        id="input-3"
                        v-model="form.dob"
                        required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Guid from '../components/Guid';

    export default {
        name: 'verify',
        components: {Guid},
        data() {
            return {
                form: {
                    firstnames: '',
                    surname: '',
                    dob: '',
                },
                show: true,
                pollingId: null
            };
        },
        computed: {
            ...mapState([
                'guid',
                'results',
            ]),
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault();

                // Fire the request
                await this.$store.dispatch('enquiry', this.form);

                // Poll for a result
                this.pollingId = setInterval(() => {
                    this.$store.dispatch('lookupResult');
                }, 5000);

            },
            onReset(evt) {
                evt.preventDefault();
                // Reset our form values
                this.form.firstnames = '';
                this.form.surname = '';
                this.form.dob = null;

                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            }
        },
        beforeDestroy() {
            if (this.pollingId) {
                clearInterval(this.pollingId);
            }
        }
    };
</script>
