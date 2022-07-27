<template>
    <div class="container">
		<center>
			<div class="loading" v-if="isLoading">
                <loading />
            </div>
		</center>
		<div class="card">
			<div class="inner-box" id="card">
				<div class="card-front">
					<h2>Followup Login</h2>
					<center style="color:red">
						{{ message }}
					</center>
						<input type="email" @input="checkInput" v-model="logindata.email" class="input-box" name="email" placeholder="Your Email Id" required> 
						<input type="password" @input="checkInput" @keyup.enter="login" v-model="logindata.password" class="input-box" name="password" placeholder="Your Password" required>

						<button type="submit" class="submit-btn" :disabled="!filled"  v-on:click="login">Submit</button>
						<center v-if='!filled'>
							<small>
								<p style="color:red">fields are empty</p>
							</small>
						</center>
						

					<button type="button" class="btn" style="border:none">
						<i class="fa fa-copyright"> </i> 2022 Supernatural Life Church
					</button>
				</div>				
			</div>
		</div>
	</div>		
</template>
<script>
import User from '../Api/User'
export default {
	data() {
		return {
			filled:false,
			logindata: {
				email:null,
				password:null,
			},
			isLoading:false,
			message:null
		}
	},
    methods: {
		checkInput(){
			this.message = null
			if(this.logindata.email == null || this.logindata.email == "" || this.logindata.password == ""|| this.logindata.password == null){
				this.filled = false
			}else{
				this.filled = true
			}
		},
        login(){
			// alert('clicked')
				
			User.login(this.logindata).then((result)=> {
				localStorage.setItem("token", result.data['access_token'])					
				this.isLoading = false			
				// this.$router.push('dashboard')
				window.location.href = 'dashboard'				
				User.auth().then((result)=>{
					localStorage.setItem("auth", "true")											
				})	
				
			}
			).catch((err) => {
				if(err.response.data.errors['email']){
					this.message = err.response.data.errors['email'][0]
				}else{
					this.message = err.response.data.errors[0][0]
				}
			});

        }
    },

	computed:{
		email(){
			return this.logindata.email
		},

		password(){
			return this.logindata.password
		}
	},

	watch:{
		email(){
			this.checkInput()
		},

		password(){
			this.checkInput()
		}
	}
        
    
}
</script>

<style scoped>
    *{
	margin: 0;
	padding: 0;
}

.container{
	width: 100%;
	height: 100vh;
	font-family: sans-serif;
	background: linear-gradient(rgba(38, 38, 115, 0.8), rgba(76, 32, 84, 0.8)), url('../../../public/logo.png');
	background-position: center;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card{
	width: 350px;
	height: 500px;
	box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.26);	
	perspective: 1000px;
}

.inner-box{
	position: relative;
	width: 100%;
	height: 100%;	
	transform-style: preserve-3d;
	transition: transform 1s;
}

.card-front, .card-back{
	position: absolute;
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;
	background-image: linear-gradient(rgba(0,0,100,0.8), rgba(76, 32, 84, 0.8));
	padding: 55px;
	box-sizing: border-box;
	backface-visibility: hidden;
}

.card-back{
	transform: rotateY(180deg);
}

.card h2{
	font-weight: normal;
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
}

.google{
    width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
    cursor: pointer;

}

.google:hover{
    border:1px solid red
}
.input-box{
	width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
}

::placeholder{
	color: #fff;
	font-size: 12px;
}

button{
	width: 100%;
	background: transparent;
	border: 1px solid #fff;
	margin: 35px 0 10px;
	height: 32px;
	font-size: 12px;
	border-radius: 20px;
	padding: 0 1px;
	box-sizing: border-box;
	outline: none;
	color: #fff;
	cursor: pointer;
}

.submit-btn{
	position:  relative;
}

.submit-btn:hover{
	background-color: #333;
}

.submit-btn::after{
	content: '\27a4';
	color: #333;
	line-height: 32px;
	font-size: 17px;
	height: 32px;
	width: 32px;
	border-radius: 50%;
	background: #fff;
	position: absolute;
	right: -1px;
	top: -1px;
}

span{
	font-size: 12px;
	margin-left: 10px;
}

.card .btn{
	margin-top: 70px;
}

.card a{
	display: block;
	text-align: center;
	color: #fff;
	font-size: 13px;
	margin-top: 8px;
}    
</style>