const getpage = require('../pageobjects/getMethod.page');

describe("Customer API Testing", async()=>{
    it("Should get Users with valid headers",async()=>{
        await getpage.getAPI();
        await getpage.checkPositiveStatus();
    });

    it("Should get Users with invalid headers",async()=>{
        await getpage.getwrongAPI();
        await getpage.checkNegativeStatus();
    });

    it("Should get Customer List", async () => {
        await getpage.getUserList();
        await getpage.checkPositiveStatus();
    });

    xit("Should get Customer's info by ID", async () => {
        await getpage.getUserByID();
        await getpage.checkUserID();
    });

    it("Should not getting Customer's info by invalid ID", async () => {
        await getpage.getUserByWrongID();
        await getpage.check404Status();
    });

})


