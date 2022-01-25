const Employee = require("../lib/Employee.js");
const Intern = require("../lib/Intern.js");
describe("Intern", function () {
    describe("Intern Init", function () {
        it("Intern can be built", function () {
            const testEmploy = new Intern("Bob", 102, "test@email.com", "UCF");
            expect(testEmploy instanceof Intern).toEqual(true);
        });
        it("Intern is an Employee", function () {
            const testEmploy = new Intern("Bob", 102, "test@email.com", "UCF");
            expect(testEmploy instanceof Employee).toEqual(true);
        });
        it("Intern creates name", function () {
            const testEmploy = new Intern("Jim", 103, "item@mail.com", "FSU");
            expect(testEmploy.name).toEqual("Jim");
        });
        it("Intern creates ID", function () {
            const testEmploy = new Intern("Hank", 104, "example@email.com", "UF");
            expect(testEmploy.id).toEqual(104);
        });
        it("Intern creates email", function () {
            const testEmploy = new Intern("Amy", 105, "test@mail.com", "FIU");
            expect(testEmploy.email).toEqual("test@mail.com");
        });
        it("Intern creates school", function () {
            const testEmploy = new Intern("Mary", 106, "example@mail.com", "USF");
            expect(testEmploy.school).toEqual("USF");
        });
    });

    describe("Intern Functions", function () {
        it("Intern getName works", function () {
            const testEmploy = new Intern("Jim", 103, "item@mail.com", "FSU");
            expect(testEmploy.getName()).toEqual("Jim");
        });
        it("Intern getID works", function () {
            const testEmploy = new Intern("Hank", 104, "example@email.com", "UF");
            expect(testEmploy.getId()).toEqual(104);
        });
        it("Intern getEmail works", function () {
            const testEmploy = new Intern("Amy", 105, "test@mail.com", "FIU");
            expect(testEmploy.getEmail()).toEqual("test@mail.com");
        });
        it("Intern getSchool works", function () {
            const testEmploy = new Intern("Mary", 106, "example@mail.com", "USF");
            expect(testEmploy.getSchool()).toEqual("USF");
        });
    });

    describe("Intern Validation", function () {
        it("Intern without arguments returns an error", function () {
            const cb = () => new Intern();
            expect(cb).toThrow();
        });
        it("Intern with empty name throws error", function () {
            const cb = () => new Intern("", 103, "item@mail.com", "FSU");
            const err = new Error("Expected parameter 'name' to be a non-empty string");
            expect(cb).toThrowError(err);
        });
        it("Intern without number ID throws error", function () {
            const cb = () => new Intern("Hank", "five", "example@email.com", "UF");
            const err = new Error("Expected parameter 'id' to be a positive number");
            expect(cb).toThrowError(err);
        });
        it("Intern without formatted email throws error", function () {
            const cb = () => new Intern("Amy", 105, "test", "FIU");
            const err = new Error("Expected parameter 'Email' to be formated 'email213@email.com");
            expect(cb).toThrowError(err);
        });
        it("Intern with empty school throws error", function () {
            const cb = () => new Intern("Mary", 106, "example@mail.com", "");
            const err = new Error("Expected parameter 'school' to be a non-empty string");
            expect(cb).toThrowError(err);
        });
    });
});