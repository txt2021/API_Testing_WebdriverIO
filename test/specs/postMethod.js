const postpage = require('../pageobjects/postMethod.page');

before("Generate Info", async () => {
    await postpage.generateInfo();

})

describe("Customer API Testing",async()=>{
    it("Should apply Post method with valid credentials",async()=>{
        await postpage.postAPI();
        await postpage.checkPositiveStatus();
    });

    it("Should apply Post method with invalid credentials",async()=>{
        await postpage.postwrongAPI();
        await postpage.check401Status();
    });

    it("Should apply Post method with invalid headers",async()=>{
        await postpage.postAPIwithWrongHeader();
        await postpage.checkNegativeStatus();
    });

    it("Should sign up new customer",async()=>{
        await postpage.signUpNewCustomer();
        await postpage.checkResponseMessage();
    })
})


