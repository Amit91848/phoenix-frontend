import { decodeToken } from "react-jwt";

export default function useUser() {
    let user = decodeToken(JSON.parse(localStorage.getItem('login')).token);
    return user;
}