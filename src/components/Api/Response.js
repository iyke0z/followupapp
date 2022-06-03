import Api from "./Api"

export default{
    allResponse(){
        return Api.get('v1/response')
    },
    createResponse(form){
        return Api.post('v1/response/create', form)
    },
    updateResponse(form){
        return Api.post('v1/response/update', form)
    },
    deleteResponse(user){
        return Api.post('v1/response/delete', user)
    }
}