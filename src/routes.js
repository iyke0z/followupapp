import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Auth/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Followup from './components/Followup/Followup.vue'
import SendSMS from './components/Followup/SendSms.vue'
import Members from './components/Member/Member.vue'
import Users from './components/User/User.vue'
import ViewAssign from './components/Followup/ViewAssigned.vue'
import Report from './components/reports/Index.vue'
import Response from './components/Response/Response.vue'
import HeatMap from './components/HeatMap/heatmap.vue'
import Area from './components/Area/Area.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', name:'login', component: Login},
        {path:'/dashboard', name:'dashboard', component: Dashboard},
        {path:'/followup', name:'followup', component: Followup},
        {path:'/members', name:'members', component: Members},
        {path:'/users', name:'users', component: Users},
        {path:'/assign-view', name:'assign-view', component: ViewAssign},
        {path:'/report', name:'report', component: Report},
        {path:'/response', name:'response', component: Response},
        {path:'/sms', name:'sendsms', component: SendSMS},
        {path:'/heatmap', name:'heatmap', component: HeatMap},
        {path:'/area', name:'area', component: Area},
        
    ]
})

export default router
