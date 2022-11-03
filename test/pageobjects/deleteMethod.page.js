const page = require('./page');
const axios=require('axios');
const envVariables = require('../env.json');
const fs = require('fs');

const positiveResponseMessage = "Customer Deleted!";
const apptype = 'application/json';
const wronapptype = 'json';
const invalidCredentialsStatus = 401;

class deleteMethod {    
    
    async deleteAPI(){        
        const response = await axios.delete(`${envVariables.baseUrl}/customer/api/v1/delete/4`,
        {
            headers: {
                'Content-Type': apptype,
                'Authorization': envVariables.token
            }
        }
    ).then(res => res.data)
        //await page.print(response);
        return response;
    } 

    
    async checkResponseMessage(){
        await page.checkMessage(this.deleteAPI,positiveResponseMessage);
    }

    async check401Status(){
        await page.checkBadStatus(this.putwrongAPI,invalidCredentialsStatus);
    }

   
}

module.exports = new deleteMethod();
