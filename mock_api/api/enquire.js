const _ = require('lodash');

const enquire = require('express').Router({mergeParams: true});

const axios = require('axios');
const https = require('https');

const API_ENDPOINT = "https://130.88.36.93:8443";
const API_KEY = "4321-ABCD-5678-77777";


const buildConfig = () => {
    return {
        // FIXME disable SSL issues ?
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        headers: {
            'Content-Type': 'application/json',
            "api-key": API_KEY
        }
    };
};

enquire.post('/verify', function (req, res) {
    console.log(req.body);

    const config = buildConfig();

    return axios.post(`${API_ENDPOINT}/enquiries/verify`, req.body, config)
        .then((response) => {
            console.log(response);
            return res
                .status(202)
                .json(response.data);
        })
        .catch((error) => {
            console.error("Failed", error.response.data);
            return res
                .status(500)
                .json(error.response.data);
        });
});

enquire.get('/:uuid', function (req, res) {

    const config = buildConfig();
    return axios.get(`${API_ENDPOINT}/enquiries/${req.params.uuid}`, config)
        .then((response) => {
            console.log(response);
            return res
                .status(202)
                .json(response.data);
        })
        .catch((error) => {
            console.error("Failed", error.response.data);
            return res
                .status(500)
                .json(error.response.data);
        });
});

module.exports = enquire;
