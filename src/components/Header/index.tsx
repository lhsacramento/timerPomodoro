import { HeaderContainer } from "./styles";
import logoIgnite from '../../assets/img/logo.svg'
import {Timer, Scroll} from 'phosphor-react'
import { NavLink } from "react-router-dom";

export function Header(){
    return (
        <HeaderContainer>
            <span><img src={logoIgnite} alt="" /></span>
            <nav>
                <NavLink to="/" title='Cronômetro'><Timer/></NavLink>
                <NavLink to="/history" title='Histórico'><Scroll/></NavLink>
            </nav>
        </HeaderContainer>
    )
}