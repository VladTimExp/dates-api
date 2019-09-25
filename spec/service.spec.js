var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../testing_service");
    });
    afterAll(() => {

    });

    //test GET
    describe("GET /dates?months=2019-01,2019-02,2019-03", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/dates?months=2019-01,2019-02,2019-03", (error, response, body) => {
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
            expect(data.response).toEqual('["2019-01-05","2019-01-06","2019-01-12","2019-01-13","2019-01-19","2019-01-20","2019-01-26","2019-01-27","2019-02-02","2019-02-03","2019-02-09","2019-02-10","2019-02-16","2019-02-17","2019-02-23","2019-02-24","2019-03-02","2019-03-03","2019-03-09","2019-03-10","2019-03-16","2019-03-17","2019-03-23","2019-03-24","2019-03-30","2019-03-31"]');
        });
    });

    //test POST
    var myJSONObject = [
        { "date": "2019-01-01", "value": false },
        { "date": "2019-01-03", "value": true },
        { "date": "2019-01-04", "value": true },
        { "date": "2019-01-05", "value": true }
    ];
    Request({
        url: "http://127.0.0.1:3000/dates/save",
        method: "POST",
        json: true,
        body: myJSONObject
    }, function(error, response, body) {});

});