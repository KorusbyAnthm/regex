import * as emailValidator from "email-validator";
import phone from "phone";
import * as countries from "country-data/data/countries.json";
import { PasswordMeter } from "password-meter";
import data from "./data";

const birthdayTest = (birthday: Date | string | number) => {
    const bday = birthday instanceof Date ? birthday : new Date(birthday);
    const age = new Date(Date.now() - bday.getTime()).getFullYear() - 1970;
    return age >= data.minAge;
};

const passwordTest = (password: string) => {
    const passm = new PasswordMeter({
        minLength: 8,
        maxLength: 25,
        lowercaseLettersMinLength: 1,
        numbersMinLength: 1,
        symbolsMinLength: 1,
        uppercaseLettersMinLength: 1,
        blackList: data.password.blacklist
    });

    const result = passm.getResult(password);
    return result;
}

const generateCountryRegex = () => {
    let regex = "";
    for (let country of countries) regex += `(${country.alpha2})|${country?.alpha3 ? `(${country.alpha3})|` : ""}`;
    return new RegExp("^(" + regex.slice(0, -1) + ")", "gi");
};

const countryRegex = generateCountryRegex();
const regex = {
    id: (val: string) => /^[0-9]{20}/.test(val),
    username: (val: string) => /^([A-z]|[0-9]|\.|_|-|\$){3,20}$/i.test(val),
    birthday: birthdayTest,
    email: emailValidator.validate,
    phoneNummber: (val: string) => phone(val).isValid,
    country: (val: string) => countryRegex.test(val),
    password: passwordTest
};

export { data };
export default regex;