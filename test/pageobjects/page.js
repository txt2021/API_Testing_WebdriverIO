const axios=require('axios');
const fs = require('fs');
class Page {  

    

    async wrightInFile(path,info){
        fs.writeFileSync(path, JSON.stringify(info));
    }

    async print(response){
        console.log(response.data);
    }  

    async checkBadStatus(response,status) {
        await expect(response.status != status);
    }

    async checkMessage(response,text){
        await expect(response.message == text);
    }

    async checkStatus(response,status) {
        await expect(response.status == status);
    }

    async checkID(response,idnumber){
        await expect(response.id == idnumber);
    }

    
}
module.exports = new Page()