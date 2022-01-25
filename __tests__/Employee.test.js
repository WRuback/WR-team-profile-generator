const Employee = require("../lib/Employee.js");
describe("Employee", function () {
    describe("Employee Init", function () {
        it("Employee can be built", function () {
            const testEmploy = new Employee("Bob", 102, "test@email.com");
            expect(testEmploy instanceof Employee).toEqual(true);
        });
        it("Employee creates name", function () {
            const testEmploy = new Employee("Jim", 103, "item@mail.com");
            expect(testEmploy.name).toEqual("Jim");
        });
        it("Employee creates ID", function () {
            const testEmploy = new Employee("Hank", 104, "example@email.com");
            expect(testEmploy.id).toEqual(104);
        });
        it("Employee creates email", function () {
            const testEmploy = new Employee("Amy", 105, "test@mail.com");
            expect(testEmploy.email).toEqual("test@mail.com");
        });
    });

    describe("Employee Functions", function () {
        it("Employee getName works", function () {
            const testEmploy = new Employee("Jim", 103, "item@mail.com");
            expect(testEmploy.getName()).toEqual("Jim");
        });
        it("Employee getID works", function () {
            const testEmploy = new Employee("Hank", 104, "example@email.com");
            expect(testEmploy.getId()).toEqual(104);
        });
        it("Employee getEmail works", function () {
            const testEmploy = new Employee("Amy", 105, "test@mail.com");
            expect(testEmploy.getEmail()).toEqual("test@mail.com");
        });
    });

    describe("Employee Validation", function () {
        it("Employee without arguments returns an error", function () {
            const cb = () => new Employee();
            expect(cb).toThrow();
        });
        it("Employee with empty name throws error", function () {
            const cb = () => new Employee("", 103, "item@mail.com");
            const err = new Error("Expected parameter 'name' to be a non-empty string");
            expect(cb).toThrowError(err);
        });
        it("Employee without number ID throws error", function () {
            const cb = () => new Employee("Hank", "five", "example@email.com");
            const err = new Error("Expected parameter 'id' to be a positive number");
            expect(cb).toThrowError(err);
        });
        it("Employee without formatted email throws error", function () {
            const cb = () => new Employee("Amy", 105, "test");
            const err = new Error("Expected parameter 'Email' to be formated 'email213@email.com");
            expect(cb).toThrowError(err);
        });
    });
});