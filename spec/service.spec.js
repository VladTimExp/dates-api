var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../testing_service");
    });
    afterAll(() => {

    });
    describe("GET /dates?months=2019-01,2019-02", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/dates?months=2019-01,2019-02", (error, response, body) => {
                data.status = response.statusCode;
                data.response = response.body;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.response).toEqual('["2019-01-05","2019-01-06","2019-01-12","2019-01-13","2019-01-19","2019-01-20","2019-01-26","2019-01-27","2019-02-02","2019-02-03","2019-02-09","2019-02-10","2019-02-16","2019-02-17","2019-02-23","2019-02-24"]');
        });
    });

});