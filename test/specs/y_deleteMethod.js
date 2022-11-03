const deletepage = require('../pageobjects/deleteMethod.page');


describe("Customer API Testing", async()=>{
    it("Should delete customer info",async()=>{
        await deletepage.deleteAPI();
        await deletepage.checkResponseMessage();
    });

})


