<template>
    <div id="app" class="container">
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#"> <img alt="HEDD" src="./assets/prospects-hedd-logo.svg"/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/verify">Verify</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about">About</router-link>
                    </li>
                </ul>
            </div>
            <div>
                <strong v-if="isLoggedIn" class="text-success">
                    Logged In woop woop {{this.user.username}} {{this.user.role}}
                </strong>
                <strong v-if="!isLoggedIn" class="text-danger">
                    Computer says no!
                </strong>
            </div>
        </nav>

        <router-view/>
    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.state.authentication.user;
            },
            isLoggedIn() {
                return this.$store.state.authentication.status.loggedIn;
            },
        },
        created() {
            // Try and get the user on application load
            this.$store.dispatch('authentication/getUser');
        }
    };
</script>

<style lang="scss">
    $primary: #AF0075;

    @import '../node_modules/bootstrap/scss/bootstrap';
    @import '../node_modules/bootstrap-vue/src/index.scss';

    body {
        background-color: #053041;
        color: #FFF;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 20px;
    }

    .navbar {
        padding: 30px;

        a {
            color: #FFF;

            &.router-link-exact-active {
                color: #D0DF00;
            }
        }

        .navbar-brand {
            margin-right: 100px;
        }

        .nav-item {
            margin-right: 50px;
        }
    }
</style>
