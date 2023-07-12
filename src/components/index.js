import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import WardenShamanLogo from './WardenShamanIcon.png'
import ClassShamanLogo from './ClassShamanIcon.jpg'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <img src={WardenShamanLogo}></img>
                    <NavLink to="/overview">
                        Overview
                    </NavLink>
                    <NavLink to="/talents">
                        Talents
                    </NavLink>
                    <NavLink to="/ui">
                        UI
                    </NavLink>
                    <img src={ClassShamanLogo}></img>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;