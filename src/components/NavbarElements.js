import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #15171e;
height: 56px;
width: 100vw;
display: flex;
justify-content: space-between;
// padding: 0.2rem calc((100vw - 1000px));
z-index: 12;
`;

export const NavLink = styled(Link)`
color: #ffffff;
display: flex;
align-items: center;
font-size: 1.5em;
font-family: Noto Sans, Helvetica, Arial, sans-serif;
text-decoration: none;
margin: 0.5rem 1rem;
padding: 0 1.5rem;
height: 100%;
cursor: pointer;

&:hover {
    filter: brightness(0.85);
}

&.active {
	color: #0070DD;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;
