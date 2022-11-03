const putpage = require('../pageobjects/putMethod.page');


describe("Customer API Testing",async()=>{
    it("Should update customer info",async()=>{
        await putpage.putAPI();
        await putpage.checkResponseMessage();
    });

    it("Should not update customer info with wrong headers",async()=>{
        await putpage.putwrongAPI();
        await putpage.check401Status();
    });

})


