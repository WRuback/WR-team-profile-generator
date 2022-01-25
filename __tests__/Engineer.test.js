const Employee = require("../lib/Employee.js");
const Engineer = require("../lib/Engineer.js");
describe("Engineer", function () {
    describe("Engineer Init", function () {
        it("Engineer can be built", function () {
            const testEmploy = new Engineer("Bob", 102, "test@email.com", "BSmith");
            expect(testEmploy instanceof Engineer).toEqual(true);
        });
        it("Engineer Is an Employee", function () {
            const testEmploy = new Engineer("Bob", 102, "test@email.com", "BSmith");
            expect(testEmploy instanceof Employee).toEqual(true);
        });
        it("Engineer creates name", function () {
            const testEmploy = new Engineer("Jim", 103, "item@mail.com", "JJones");
            expect(testEmploy.name).toEqual("Jim");
        });
        it("Engineer creates ID", function () {
            const testEmploy = new Engineer("Hank", 104, "example@email.com", "HThompson");
            expect(testEmploy.id).toEqual(104);
        });
        it("Engineer creates email", function () {
            const testEmploy = new Engineer("Amy", 105, "test@mail.com", "AJane");
            expect(testEmploy.email).toEqual("test@mail.com");
        });
        it("Engineer creates github", function () {
            const testEmploy = new Engineer("Mary", 106, "example@mail.com", "MMartin");
            expect(testEmploy.github).toEqual("MMartin");
        });
    });

    describe("Engineer Functions", function () {
        it("Engineer getName works", function () {
            const testEmploy = new Engineer("Jim", 103, "item@mail.com", "JJones");
            expect(testEmploy.getName()).toEqual("Jim");
        });
        it("Engineer getID works", function () {
            const testEmploy = new Engineer("Hank", 104, "example@email.com", "HThompson");
            expect(testEmploy.getId()).toEqual(104);
        });
        it("Engineer getEmail works", function () {
            const testEmploy = new Engineer("Amy", 105, "test@mail.com", "AJane");
            expect(testEmploy.getEmail()).toEqual("test@mail.com");
        });
        it("Engineer getGithub works", function () {
            const testEmploy = new Engineer("Mary", 106, "example@mail.com", "MMartin");
            expect(testEmploy.getGithub()).toEqual("MMartin");
        });
    });

    describe("Engineer Validation", function () {
        it("Engineer without arguments returns an error", function () {
            const cb = () => new Engineer();
            expect(cb).toThrow();
        });
        it("Engineer with empty name throws error", function () {
            const cb = () => new Engineer("", 103, "item@mail.com", "JJones");
            const err = new Error("Expected parameter 'name' to be a non-empty string");
            expect(cb).toThrowError(err);
        });
        it("Engineer without number ID throws error", function () {
            const cb = () => new Engineer("Hank", "five", "example@email.com", "HThompson");
            const err = new Error("Expected parameter 'id' to be a positive number");
            expect(cb).toThrowError(err);
        });
        it("Engineer without formatted email throws error", function () {
            const cb = () => new Engineer("Amy", 105, "test", "AJane");
            const err = new Error("Expected parameter 'Email' to be formated 'email213@email.com");
            expect(cb).toThrowError(err);
        });
        it("Engineer with empty github throws error", function () {
            const cb = () => new Engineer("Mary", 106, "example@mail.com", "");
            const err = new Error("Expected parameter 'githubUsername' to be a non-empty string");
            expect(cb).toThrowError(err);
        });
    });
});