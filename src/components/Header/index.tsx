import { HeaderContainer } from "./styles";
import {Timer, Scroll} from 'phosphor-react'
import { NavLink } from "react-router-dom";

export function Header(){    
    const logo = ("../../assets/img/logo.svg") as string;

    return (
        <HeaderContainer>
            <span><img src={logo} alt="" /></span>
            <nav>
                <NavLink to="/" title='Cronômetro'><Timer/></NavLink>
                <NavLink to="/history" title='Histórico'><Scroll/></NavLink>
            </nav>
        </HeaderContainer>
    )
}