import Api from "./Api"

export default {
    getUnassignedMembers(){
        return Api.get('v1/unassginedmembers')
    },

    getUsersToAssign(){
        return Api.get('v1/assignCountUsers')
    },

    assignMember(form){
        return Api.post('v1/followup/assign', form)
    },

    deleteAssign(form){
        return Api.post('v1/followup/delete', form)
    },

    followUp(form){
        return Api.post('v1/followup', form)
    },

    sendSMS(form){
        return Api.post('v1/followup/sms-new', form)
    }


}