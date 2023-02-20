"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var emailValidator = require("email-validator");
var phone_1 = require("phone");
var countries = require("country-data/data/countries.json");
var password_meter_1 = require("password-meter");
var data_1 = require("./data");
exports.data = data_1.default;
var birthdayTest = function (birthday) {
    var bday = birthday instanceof Date ? birthday : new Date(birthday);
    var age = new Date(Date.now() - bday.getTime()).getFullYear() - 1970;
    return age >= data_1.default.minAge;
};
var passwordTest = function (password) {
    var passm = new password_meter_1.PasswordMeter({
        minLength: 8,
        maxLength: 25,
        lowercaseLettersMinLength: 1,
        numbersMinLength: 1,
        symbolsMinLength: 1,
        uppercaseLettersMinLength: 1,
        blackList: data_1.default.password.blacklist
    });
    var result = passm.getResult(password);
    return result;
};
var generateCountryRegex = function () {
    var regex = "";
    for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
        var country = countries_1[_i];
        regex += "(".concat(country.alpha2, ")|").concat((country === null || country === void 0 ? void 0 : country.alpha3) ? "(".concat(country.alpha3, ")|") : "");
    }
    return new RegExp("^(" + regex.slice(0, -1) + ")", "gi");
};
var countryRegex = generateCountryRegex();
var regex = {
    id: function (val) { return /^[0-9]{20}/.test(val); },
    username: function (val) { return /^([A-z]|[0-9]|\.|_|-|\$){3,20}$/i.test(val); },
    birthday: birthdayTest,
    email: emailValidator.validate,
    phoneNummber: function (val) { return (0, phone_1.default)(val).isValid; },
    country: function (val) { return countryRegex.test(val); },
    password: passwordTest
};
exports.default = regex;
