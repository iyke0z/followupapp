import Api from "./Api"
import axios from 'axios'


export default{
    login(form){
        return Api.post('v1/login', form)
    },
    auth(){
        return Api.get("user") 
    },
    logout(){
        return Api.post('v1/logout')
    },
    allUsers(){
        return Api.get('v1/admin/allusers')
    },
    createUser(form){
        return Api.post('v1/user/create', form)
    },
    updateUser(form){
        return Api.post('v1/user/update', form)
    },
    deleteUser(user){
        return Api.post('v1/user/delete', user)
    }
}