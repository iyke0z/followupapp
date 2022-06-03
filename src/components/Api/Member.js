import Api from "./Api"

export default{
    allMembers(){
        return Api.get('v1/admin/allmembers')
    }    ,

    createMember(form){
        return Api.post('v1/member/create', form)
    },

    updateMember(form){
        return Api.post('v1/member/update', form)
    },

    deleteMember(form){
        return Api.post('v1/member/delete', form)
    }

}