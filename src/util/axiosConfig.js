// First we need to import axios.js
import * as axios from 'react-native-axios';
import * as ConstantsClass from '../util/Constants';

// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: ConstantsClass.BASE_URL
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
// to set content type in all request
instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Also add/ configure interceptors && all the other cool stuff
instance.interceptors.request.use(request => {
    // console.log(request);
    console.log(request.url);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    // console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;