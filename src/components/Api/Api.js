import axios from 'axios'

let Api = axios.create({
    baseURL: "https://followup.slchurchng.org/api/", 
    // baseURL: "http://slc-followup.test/api/", 
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') 
    },
})

Api.defaults.withCredentials = true

export default Api
