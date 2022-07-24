import Api from "./Api"

export default {
    getMemberLocation(location) {
        return Api.get('v1/report/members-location/' + location)
    },

    allMembersCoordinate() {
        return Api.get('v1/report/members-location')
    },

    highestcalls(form) {
        return Api.post('v1/report/highestcall', form)
    },

    highestpositive(form) {
        return Api.post('v1/report/highestpositive', form)
    },
    highestnegative(form) {
        return Api.post('v1/report/highestnegative', form)
    },
    all_members(form) {
        return Api.post('v1/report/all_members', form)
    },
    highestarea(form) {
        return Api.post('v1/report/highestarea', form)
    },
    totalcalls(form) {
        return Api.post('v1/report/totalcall', form)
    },
    workerrecord(form) {
        return Api.post('v1/report/workerrecord', form)
    },
    memberrecord(form) {
        return Api.post('v1/report/memberrecord', form)
    },
    arearecord(form) {
        return Api.post('v1/report/arearecord', form)
    }
}