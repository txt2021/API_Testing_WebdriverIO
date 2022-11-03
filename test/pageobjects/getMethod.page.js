const page = require('./page');
const axios=require('axios');
const envVariables = require('../env.json');
const fs = require('fs');

const apiURL = 'https://jsonplaceholder.typicode.com/users';
const wronapptype = 'json';
const apptype = 'application/json'
const successStatus = 200;
const notfoundStatus = 404;
const userID = 10;
const tokenPath = './test/env.json';

class getMethod {
    
    
    async getAPI(){        
        const response = await axios.get(apiURL, { headers: {'Content-Type': apptype, }});
        await page.print(response);
        return response;
    }  

    async getUserList(){ 
        try{       
        const response = await axios.get(`${envVariables.baseUrl}/customer/api/v1/list`,
            {
                headers: {
                    'Content-Type': apptype,
                    'Authorization': envVariables.token
                }
            }
        ).then(res => res.data);
        await page.print(response);
        envVariables.token = response.token; 
        await page.wrightInFile(tokenPath,envVariables);
        return response;

    } catch(AxiousError){
        return console.log('wrong request');
    }   
    } 
    
    async getUserByID(){  
        try{      
        const response = await axios.get(`${envVariables.baseUrl}/customer/api/v1/get/101`,
            {
                headers: {
                    'Content-Type': apptype,
                    'Authorization': envVariables.token
                }
            }
        ).then(res => res.data);
        await page.print(response);
        return response;   
        } catch(AxiousError){
            return console.log('wrong user id');
        }            
    } 

    async getUserByWrongID(){ 
        try{
            const response = await axios.get(`${envVariables.baseUrl}/customer/api/v1/get/10`,
            {
                headers: {
                    'Content-Type': apptype,
                    'Authorization': envVariables.token
                }
            }
        )
    } catch(AxiousError){
        return 404;
    }        
    }  

    async getwrongAPI(){        
        const response = await axios.get(apiURL, { headers: {'Content-Type': wronapptype, }});
        await page.print(response);
        return response;
    }  

    async checkPositiveStatus(){
        await page.checkStatus(this.getAPI,successStatus);
    }

    async checkNegativeStatus(){
        await page.checkBadStatus(this.getAPI,successStatus);
    }

    async checkUserID(){
        await page.checkID(this.getUserByID,userID);
    }

    async check404Status(){
        await page.checkBadStatus(this.getUserByWrongID,notfoundStatus);
    }
    
}

module.exports = new getMethod();
