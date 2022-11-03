const page = require('./page');
const axios=require('axios');
const envVariables = require('../env.json');
const fs = require('fs');


const apiURL = 'https://customer-test-api.herokuapp.com/customer/api/v1/login';
const wronapptype = 'json';
const apptype = 'application/json'
const successStatus = 200;
const invalidCredentialsStatus = 401;
const username = "salman";
const password = "salman1234";
const wrongusername = "Testerrr";
const tokenPath = './test/env.json';
const infoURL = `https://api.namefake.com/english-united-states`;
const positiveResponseMessage = "Success";

class postMethod {    
    
    async postAPI(){        
        const response = await axios.post('https://customer-test-api.herokuapp.com/customer/api/v1/login',
            {
                "username": "salman",
                "password": "salman1234"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(res => res.data)
        console.log(response);    
        envVariables.token = response.token;
        await page.wrightInFile(tokenPath,envVariables);
        return response;
    } 
  

    async postwrongAPI(){   
        try{
            const response = await axios.post(apiURL,
                {   "username": wrongusername,
                    "password": password
                },
                {   headers: {
                        'Content-Type': apptype,
                    }
                }
            )

        } catch(AxiousError){
            return 401;
    }        
    }  

    async postAPIwithWrongHeader(){ 
        try{
            const response = await axios.post(apiURL,
                {
                    "username": username,
                    "password": password
                },
                {
                    headers: {
                        'Content-Type': wronapptype,
                    }
                }
            )

        } 
        catch(AxiousError){
            return 401;
        }    
        
        
    }


    async checkPositiveStatus(){
        await page.checkStatus(this.postAPI,successStatus);
    }

    async checkNegativeStatus(){
        await page.checkBadStatus(this.postAPIwithWrongHeader,successStatus);
    }

    async check401Status(){
        await page.checkBadStatus(this.postwrongAPI,invalidCredentialsStatus);
    }
    
    async generateInfo(){
        const response = await axios.get(infoURL,
        {
            headers: {
                'Content-Type': apptype,
            }
        }
        ).then(res => res.data)
        envVariables.id = Math.floor((Math.random() * (9999-1001)) + 1);
        envVariables.name = response.name;
        envVariables.email = `${response.email_u}@test.com`;
        envVariables.address = response.address;
        envVariables.phone_number = response.phone_w;
        await page.wrightInFile(tokenPath,envVariables);
    }

    async signUpNewCustomer(){
        const response = await axios.post(`${envVariables.baseUrl}/customer/api/v1/create`,
            {
                "id": envVariables.id,
                "name": envVariables.name,
                "email": envVariables.email,
                "address": envVariables.address,
                "phone_number": envVariables.phone_number
            },
            {
                headers: {
                    'Content-Type': apptype,
                    'Authorization': envVariables.token
                }
            }
        ).then(res => res.data)
        await page.print(response);
        return response;
    }

    async checkResponseMessage(){
        await page.checkMessage(this.signUpNewCustomer,positiveResponseMessage);
    }
}

module.exports = new postMethod();
