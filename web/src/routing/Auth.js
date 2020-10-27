/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Tinson Lai

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Login from "view/component/Login";
import Register from "view/component/Register";

const routes = [
    {
        path: "login",
        name: "Login",
        component: Login
    },
    {
        path: "register",
        name: "Register",
        component: Register
    }
];

export default routes;
