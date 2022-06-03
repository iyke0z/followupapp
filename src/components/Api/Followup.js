import Api from "./Api"

export default{
    getFollowupLevel(){
        return Api.get('v1/followup/followuplevel')
    },

    getAssigned(){
        return Api.get('v1/followup/getassigned')
    },

    getResponse(level){
        return Api.get('v1/response/responselevel/'+level)
    },

    followup(form){
        return Api.post('v1/followup', form)
    }
}