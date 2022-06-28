import Api from "./Api"

export default{
    allAreas(){
        return Api.get('v1/area')
    },

    createArea(form){
        return Api.post('v1/area/create', form)
    },

    updateArea(form){
        return Api.post('v1/area/update', form)
    },

    deleteArea(form){
        return Api.post('v1/area/delete', form)
    }

}