# hedd-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Mock API

```
npm run mockapi
``` 

## Docker

Based on:
https://jonathanmh.com/deploying-a-vue-js-single-page-app-including-router-with-docker/

### Make image

`docker build -t hedd/hedd-vue-app-ngnix .`

### Run latest image on localhost:8080

`docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 hedd/hedd-vue-app-ngnix`


