<template>
    <div class="container">   
        <nav-bar />
      <div class="main">  
		<center>
		 	<div class="loading" v-if="isLoading">
                <loading />
        	</div>
		</center>  
            <div>                             
                <div>                    
					<center>
                    	<br><br>
						<b>Select Report Type</b><br>
						<select name="" id="" v-model="selectedperiod" @change="clearPeriod">
							<option :value="{data:null, title:null}">select report type</option>
							<option :value="{data:'highestcalls', title:'Worker With Most Calls'}">Worker With Most Calls</option>
							<option :value="{data:'highestpositive', title:'Worker with most Positive Response'}">Worker with most Positive Response</option>
							<option :value="{data:'highestnegative', title:'Worker with most Negative Response'}">Worker with most Negative Response</option>
							<option :value="{data:'allmembers', title:'All Members Followup History'}">All Members</option>
							<option :value="{data:'highestarea', title:'Area Record'}">Area Record</option>
							<option :value="{data:'totalcalls', title:'Total Calls Report'}">Total Calls Report</option>							
						</select>
						<input v-model="period" type="date" name="" id="" v-if="selectedreport=='daily'" >
						<input v-model="period" type="week" @input="getWeek" name="" id="" v-if="selectedreport=='weekly'" >
						<input v-model="period" type="month" @input="getMonth" name="" id="" v-if="selectedreport=='monthly'"  >
						<input v-model="year" type="number" min="1900" max="2099" step="1" v-if="selectedreport=='yearly'"  ><br>					
						<div v-if="selectedreport=='periodic'">
							<small><b>Start Date:</b></small><br>
							<input v-model="periodicVar.startdate" type="date" placeholder="Start Date" ><br>					
							<small><b>End Date:</b></small><br>
							<input v-model="periodicVar.enddate" type="date" placeholder="End Date" ><br>
						</div>

						<button :key="btnKey" @click.prevent="generateReport" :disabled="startdate==null && enddate==null">generate report</button>
                    </center>
					<center style="margin-top:10%"><h3>{{selectedperiod.title}}</h3><br /> <small v-if="selectedperiod.title != null"><b>from</b> {{periodicVar.startdate}} <br /> <b>to</b> {{periodicVar.enddate}}</small> </center>
					<center>
						<div v-if="report !=null && this.selectedperiod.data == 'totalcalls' ">
							<h3>Total calls made - {{report}}</h3>
						</div>
					</center>
					<worker-record :key="repKey" :title="selectedperiod.title" :report="report" v-if="report != null && this.selectedperiod.data == 'highestcalls' ||this.selectedperiod.data == 'highestpositive' || this.selectedperiod.data == 'highestnegative'" />
					<area-record :key="areaKey" :title="selectedperiod.title" :report="area" v-if="area != null"/>
					<member :key="memberKey" :allmembers="members" v-if="members != null"/>
                </div>
                
            </div>    
        </div>

    </div>
</template>
<script>    
	import WorkerRecord from './WorkerRecord.vue'
	import Member from './Member.vue'
	import AreaRecord from './AreaRecord.vue'
	import NavBar from '../../Navigation.vue'
	import Report from '@/components/Api/Report'
	import Loading from '@/components/Loading.vue'
export default {
	components:{NavBar, WorkerRecord, Member, AreaRecord, Loading},
    data() {
       return {
		   	showReport:null,
            selectedreport:'periodic',
            period:null,
			week:null,
			month:null,
			selectedperiod:{data:null, title:null },            
			periodicVar:{
				startdate:null,
				enddate:null
			},
			msg:null,
			isLoading:false,
			btnKey:0,
			report:null,
			area:null,
			repKey:0,
			areaKey:0,
			members:null,
			memberKey:0


        }
    },    
    methods: {
        toggleMenu(){
            let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')            
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		}, 

		clearPeriod(){
			this.period = null 			
			this.week = null
			this.month = null
			this.periodicVar.startdate = null
			this.periodicVar.enddate = null
		},
		
		generateReport(){
			this.isLoading = true
			if(this.selectedperiod.data == 'highestcalls'){
				Report.highestcalls(this.periodicVar).then((result) => {

					this.report = result.data.data					
					this.repKey++
					this.isLoading = false
				})
			}
			if(this.selectedperiod.data == "highestpositive"){
				Report.highestpositive(this.periodicVar).then((result) => {
					this.repKey++
					this.report = result.data.data				
					this.isLoading = false	
				})
			}
			if(this.selectedperiod.data == "highestnegative"){
				Report.highestnegative(this.periodicVar).then((result) => {
					this.repKey++
					this.report = result.data.data	
					this.isLoading = false				
				})
			}
			if(this.selectedperiod.data == "allmembers"){
				Report.all_members(this.periodicVar).then((result) => {
					this.members = result.data.data.members	
					this.isLoading = false				
				})
			}
			if(this.selectedperiod.data == "highestarea"){
				Report.highestarea(this.periodicVar).then((result) => {
					this.area = result.data.data					
					this.areaKey++
					this.isLoading = false
				})
			}
			if(this.selectedperiod.data == "totalcalls"){
				Report.totalcalls(this.periodicVar).then((result) => {
					this.report = result.data.data	
					this.isLoading = false				
				})
			}

		}

    },

	computed:{
		startdate(){
			return this.periodicVar.startdate
		},

		enddate(){
			return this.periodicVar.enddate
		},

		data(){
			return this.selectedperiod.data
		}
	},
	watch:{
		startdate(){
			this.btnKey++
		},
		enddate(){
			this.btnKey++
		},
		data(){
			this.area = null
			this.members= null
			this.report = null
		}
		
	}
  
}
</script>
<style scoped>
    @import url('../style.css');
</style>
