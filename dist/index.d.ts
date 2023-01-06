import data from "./data";
declare const regex: {
    id: (string: string) => boolean;
    username: (string: string) => boolean;
    birthday: (birthday: Date | string | number) => boolean;
    email: (string: string) => boolean;
    phoneNummber: (string: string) => boolean;
    country: (string: string) => boolean;
    password: (password: string, ignoreCase?: boolean, skipReq?: boolean) => import("password-meter").IResult;
};
export { data };
export default regex;
