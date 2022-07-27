<template>
    <div>
        <h1>Test Promises</h1>
        <button @click="checkPromise">check</button>
    </div>
</template>

<script>        
import axios from 'axios'
import User from '../Api/User';
    export default {
        data() {            
            return {
                arr: [1,2,3,4]
            }
        },
            methods: {
                checkPromise(){
                    axios.get('https://slcfollowup.herokuapp.com/api/v1/admin/allmembers').then((result) => {
                        alert('okada result')
                        console.log(result)
                    }).catch((err) => {
                        
                    });
                }
            },
            created(){
            }

    }
</script>