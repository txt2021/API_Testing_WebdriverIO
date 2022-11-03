const page = require('./page');
const axios=require('axios');
const envVariables = require('../env.json');
const fs = require('fs');

const positiveResponseMessage = "Success";
const apptype = 'application/json';
const userAddress = "Kyiv,Ukraine";
const userPhoneNumber = "09502212410";
const wronapptype = 'json';
const invalidCredentialsStatus = 401;
const tokenPath = './test/env.json';

class putMethod {    
    
    async putAPI(){       
        try{
            const response = await axios.put(`${envVariables.baseUrl}/customer/api/v1/update/${envVariables.id}`,
            {
                "id":envVariables.id,
                "name": envVariables.name,
                "email": envVariables.email,
                "address": userAddress,
                "phone_number": userPhoneNumber
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
        } catch(AxiousError){
            return console.log('Can not find user');
        }
        
    } 

    async putwrongAPI(){ 
        try{       
            const response = await axios.put(`${envVariables.baseUrl}/customer/api/v1/update/${envVariables.id}`,
                {
                    "id": envVariables.id,
                    "name": envVariables.name,
                    "email": envVariables.email,
                    "address": userAddress,
                    "phone_number": userPhoneNumber
                },
                {
                    headers: {
                        'Content-Type': wronapptype,
                        'Authorization': envVariables.token
                    }
                }
            )
        }
            catch(AxiousError){
                return 401;
        }        
        }  
  

    async checkResponseMessage(){
        await page.checkMessage(this.putAPI,positiveResponseMessage);
    }

    async check401Status(){
        await page.checkBadStatus(this.putwrongAPI,invalidCredentialsStatus);
    }

   
}

module.exports = new putMethod();
