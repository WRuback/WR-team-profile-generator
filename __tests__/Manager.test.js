const Employee = require("../lib/Employee.js");
const Manager = require("../lib/Manager.js");
describe("Manager", function () {
    describe("Manager Init", function () {
        it("Manager can be built", function () {
            const testEmploy = new Manager("Bob", 102, "test@email.com", 201);
            expect(testEmploy instanceof Manager).toEqual(true);
        });
        it("Manager is an Employee", function () {
            const testEmploy = new Manager("Bob", 102, "test@email.com", 201);
            expect(testEmploy instanceof Employee).toEqual(true);
        });
        it("Manager creates name", function () {
            const testEmploy = new Manager("Jim", 103, "item@mail.com", 202);
            expect(testEmploy.name).toEqual("Jim");
        });
        it("Manager creates ID", function () {
            const testEmploy = new Manager("Hank", 104, "example@email.com", 203);
            expect(testEmploy.id).toEqual(104);
        });
        it("Manager creates email", function () {
            const testEmploy = new Manager("Amy", 105, "test@mail.com", 204);
            expect(testEmploy.email).toEqual("test@mail.com");
        });
        it("Manager creates officeNumber", function () {
            const testEmploy = new Manager("Mary", 106, "example@mail.com", 205);
            expect(testEmploy.officeNumber).toEqual(205);
        });
    });

    describe("Manager Functions", function () {
        it("Manager getName works", function () {
            const testEmploy = new Manager("Jim", 103, "item@mail.com", 202);
            expect(testEmploy.getName()).toEqual("Jim");
        });
        it("Manager getID works", function () {
            const testEmploy = new Manager("Hank", 104, "example@email.com", 203);
            expect(testEmploy.getId()).toEqual(104);
        });
        it("Manager getEmail works", function () {
            const testEmploy = new Manager("Amy", 105, "test@mail.com", 204);
            expect(testEmploy.getEmail()).toEqual("test@mail.com");
        });
        it("Manager getOfficeNumber works", function () {
            const testEmploy = new Manager("Mary", 106, "example@mail.com", 205);
            expect(testEmploy.getOfficeNumber()).toEqual(205);
        });
    });

    describe("Manager Validation", function () {
        it("Manager without arguments returns an error", function () {
            const cb = () => new Manager();
            expect(cb).toThrow();
        });
        it("Manager with empty name throws error", function () {
            const cb = () => new Manager("", 103, "item@mail.com", 202);
            const err = new Error("Expected parameter 'name' to be a non-empty string");
            expect(cb).toThrowError(err);
        });
        it("Manager without number ID throws error", function () {
            const cb = () => new Manager("Hank", "five", "example@email.com", 203);
            const err = new Error("Expected parameter 'id' to be a positive number");
            expect(cb).toThrowError(err);
        });
        it("Manager without formatted email throws error", function () {
            const cb = () => new Manager("Amy", 105, "test", 204);
            const err = new Error("Expected parameter 'Email' to be formated 'email213@email.com");
            expect(cb).toThrowError(err);
        });
        it("Manager with non-number officeNumber throws error", function () {
            const cb = () => new Manager("Mary", 106, "example@mail.com", "two o five");
            const err = new Error("Expected parameter 'officeNumber' to be a positive number");
            expect(cb).toThrowError(err);
        });
    });
});