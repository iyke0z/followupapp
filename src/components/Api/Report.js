import Api from "./Api"

export default{
    getMemberLocation(location){
        return Api.get('v1/report/members-location/'+location)
    },

    allMembersCoordinate(){
        return Api.get('v1/report/members-location')
    }
}