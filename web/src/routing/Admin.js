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

import Ballot from "view/component/Ballot";
import Candidates from "view/component/Candidates";
import Profile from "view/component/Profile";
import BallotOld from "view/forms/Ballot"

/**
 * @returns {boolean}
 */
const guard_trivial = () => true;

/**
 * @param {number} least
 * @returns {function(number | null): boolean}
 */
const guard_level = least => (level => !level || level < least)

const routes = [
    {
        path: "profile",
        name: "Profile",
        icon: "ni ni-archive-2 text-info",
        component: Profile,
        guard: guard_trivial
    },
    {
        path: "candidates",
        name: "Candidates",
        icon: "ni ni-circle-08 text-info",
        component: Candidates,
        guard: guard_level(1)
    },
    {
        path: "ballot",
        name: "Ballot",
        icon: "ni ni-archive-2 text-primary",
        component: Ballot,
        guard: guard_trivial
    },
    {
        path: "ballot-old",
        name: "Ballot (Old)",
        icon: "ni ni-archive-2 text-primary",
        component: BallotOld,
        guard: guard_trivial
    }
];

export default routes;
