<template>
    <div class="container">   
        <nav-bar />
      <div class="main">
         <div class="topbar">
            <div class="toggle" @click="toggleMenu"></div>				
			<h4 style="color:black">SLC FOLLOWUP APP</h4>
                <h4 style="color:black"></h4>            
				</div>     
            <div>
               
               
                <div>
                    
						<center>
                    	<br><br>
						<b>Select Report Type</b><br>
						<select name="" id="" v-model="selectedreport" @change="clearPeriod">
							<option value="">select report type</option>
							<option value="daily">Daily Report</option>
							<option value="weekly">Weekly Report</option>
							<option value="monthly">Monthly Report</option>
							<option value="yearly">Yearly Report</option>
							<option value="periodic">Periodic Report</option>
						</select>
						<input v-model="period" type="date" name="" id="" v-if="selectedreport=='daily'" >
						<input v-model="period" type="week" @input="getWeek" name="" id="" v-if="selectedreport=='weekly'" >
						<input v-model="period" type="month" @input="getMonth" name="" id="" v-if="selectedreport=='monthly'"  >
						<input v-model="year" type="number" min="1900" max="2099" step="1" v-if="selectedreport=='yearly'"  ><br>					
						<div v-if="selectedreport=='periodic'">
							<small><b>Start Date:</b></small><br>
							<input v-model="periodicVar.from" type="date" placeholder="Start Date" ><br>					
							<small><b>End Date:</b></small><br>
							<input v-model="periodicVar.to" type="date" placeholder="End Date" ><br>
						</div>

						<button @click.prevent="generateReport" :disabled="selectedreport==''">generate report</button>
                    </center>

                </div>
                
            </div>    
			<annual-report v-if="showReport == 'yearly'" />                                          
			<monthly-report v-if="showReport == 'monthly'" />                                          
			<weekly-report v-if="showReport == 'weekly'" />                                          
        </div>

    </div>
</template>
<script>
    import { RouterLink } from 'vue-router'
	import monthlyReport from './MonthlyReport.vue'
	import annualReport from './AnnualReport.vue'
	import weeklyReport from './WeeklyReport.vue'
	import NavBar from '../../Navigation.vue'
export default {
	components:{NavBar, monthlyReport, annualReport, weeklyReport},
    data() {
       return {
		   	showReport:null,
            selectedreport:'',
            period:null,
			week:null,
			month:null,
            year:new Date().getFullYear() ,
			periodicVar:{
				from:null,
				to:null
			},
			msg:null

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
			this.year = new Date().getFullYear() 
			this.week = null
			this.month = null
			this.periodicVar.from = null
			this.periodicVar.to = null
		},
		getWeek(){
			var week = this.period			
			var year = this.period
			year = year.substr(0, 4)		
			week = week.substr(6)
			this.week = week
			this.year = year
		},
		getMonth(){
			var month = this.period
			var year = this.period
			year = year.substr(0, 4)
			month = month.substr(5)
			this.year = year
			this.month = month
		},
		generateReport(){
			if(this.selectedreport=='daily'){
				if(this.period == null){
					this.msg = 'please select period'
					swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: this.msg,
						customClass: 'swal-wide',
						showConfirmButton: false,
						timer: 3000
                	})
				}else{
					// api
				}
			}
			if(this.selectedreport=='weekly'){				
				if(this.period == null){
					this.msg = 'please select period'
					swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: this.msg,
						customClass: 'swal-wide',
						showConfirmButton: false,
						timer: 3000
                	})
				}else{
					// api
					this.showReport = 'weekly'
				}
			}
			if(this.selectedreport=='monthly'){
				if(this.period == null){
					this.msg = 'please select period'					
					swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: this.msg,
						customClass: 'swal-wide',
						showConfirmButton: false,
						timer: 3000
                	})
				}else{
					// api
					this.showReport = 'monthly'
				}
			}
			if(this.selectedreport=='yearly'){
				if(this.year == null){
					this.msg = 'please choose year'
					swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: this.msg,
						customClass: 'swal-wide',
						showConfirmButton: false,
						timer: 3000
                	})
				}else{
					// 
					this.showReport = 'yearly'
				}
			}
			if(this.selectedreport=='periodic'){				
				if(this.periodicVar.from == null || this.periodicVar.to == null){
					this.msg = 'please select start and end date'
					swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: this.msg,
						customClass: 'swal-wide',
						showConfirmButton: false,
						timer: 3000
                	})
				}else{
					// api
				}
			}			
		}

    },
  
}
</script>
<style scoped>
    @import url('../style.css');
</style>
