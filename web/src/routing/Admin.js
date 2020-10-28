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

import Profile from "view/component/Profile"
import Ballot from "view/forms/Ballot"

const routes = [
    {
        path: "profile",
        name: "Profile",
        icon: "ni ni-archive-2 text-info",
        component: Profile
    },
    {
        path: "ballot",
        name: "Ballot",
        icon: "ni ni-archive-2 text-primary",
        component: Ballot
    }
];

export default routes;
