<template>
    <div>
        <div class="navigation" >
            <ul>
				<li>
					<router-link to="">
						<span class="icon">
                            <!-- <i class="fa fa-cart-plus" aria-hidden="true"></i> -->
							<img src="/logo.png" alt="" >
                        </span>
						<span class="title"><h2>Follow Up</h2></span>
					</router-link>
				</li>
				<div v-if="!isFetching">
				<li>
					<router-link active-class="activeLink" to="/dashboard">
						<span class="icon">
							<i class="fa fa-tachometer"></i>
						</span>
						<span class="title">Dashboard</span>
					</router-link>	
				</li>
				<li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/users" >
						<span class="icon"><i class="fa fa-users" aria-hidden="true"></i></span>
						<span class="title">Followup Workers</span>
					</router-link>	
				</li>
				<li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/response">						
						<span class="icon">
							<i class="fa fa-question"></i>
						</span>
						<span class="title">Response</span>
					</router-link>				
				</li>
				<li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/members">					
						<span class="icon"><i class="fa fa-user-plus"></i></span>
						<span class="title">New Members</span>
					</router-link>				
				</li>
				<li>
					<router-link active-class="activeLink" to="/followup">
						<span class="icon">
							<i class="fa fa-phone"></i>
							</span>
						<span class="title">Followup</span>
					</router-link>
				</li>                
				<li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/assign-view">					
						<span class="icon"><i class="fa fa-eye"></i></span>
						<span class="title">Assign Members</span>
					</router-link>				
				</li>
				<li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/area">					
						<span class="icon"><i class="fa fa-map-marker"></i></span>
						<span class="title">Area</span>
					</router-link>				
				</li> 
				<!--<li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/sms">					
						<span class="icon"><i class="fa fa-comment"></i></span>
						<span class="title">Sms New Members</span>
					</router-link>				
				</li> -->
				<li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/report">
						<span class="icon"><i class="fa fa-book"></i></span>
						<span class="title">Reports</span>
					</router-link>
				</li>
				<!-- <li v-if="user.usertype == 'admin'">
					<router-link active-class="activeLink" to="/heatmap">
						<span class="icon"><i class="fa fa-map"></i></span>
						<span class="title">Heat Map</span>
					</router-link>
				</li> -->
				<li v-if="user.usertype == 'admin' || user.usertype == 'user'">
					<router-link to="" @click="logout">
						<span class="icon" ><i style="color:red" class="fa fa-power-off"></i></span>
						<span class="title" >Sign Out</span>
					</router-link>
				</li>
				</div>
			</ul>
        </div>
		 <div class="topbar">
            <div class="toggle" @click="toggleMenu"></div>				
                <h4 style="color:black">SLC FOLLOWUP APP</h4>
                <small>
					<p style="color:black" v-if="!isFetching">{{user.fullname}}</p>
				</small>
        </div>
    </div>
</template>

<script>
import User from './components/Api/User.js'
// '../components/Api/User'
export default {
	data() {
		return {
			isFetching:true,
			user:null
		}
	},
	methods: {
		logout(){
			User.logout().then((result) => {
				window.location.href = '/'			
			})
		},

		toggleMenu(){
            let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')   
			let topbar = document.querySelector('.topbar')      
			topbar.classList.toggle('active')   
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		}, 
		
		getAuth(){
			User.auth().then((result)=>{
                this.user = result.data                                              
				this.isFetching = false
            }).catch(()=>{
				this.$router.push('/')
			})
		},

		getUsertype(){
			console.log(this.user)
		}

	},
	
	created() {
        this.getAuth()
		this.getUsertype()
    },
}


</script>