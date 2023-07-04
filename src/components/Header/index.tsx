import { HeaderContainer } from "./styles";
import {Timer, Scroll} from 'phosphor-react'
import { NavLink } from "react-router-dom";

export function Header(){    
    return (
        <HeaderContainer>
            <span><img src="../../../../src/assets/img/logo.svg" alt="" /></span>
            <nav>
                <NavLink to="/" title='Cronômetro'><Timer/></NavLink>
                <NavLink to="/history" title='Histórico'><Scroll/></NavLink>
            </nav>
        </HeaderContainer>
    )
}