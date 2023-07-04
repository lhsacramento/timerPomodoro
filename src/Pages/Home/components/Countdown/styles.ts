import { styled } from "styled-components";

export const CountDownContainer = styled.div`
    font-family: 'Roboto mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${props => props.theme['gray-100']};
    display: flex;    
    gap: 1rem;

    span{
        background: ${props => props.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px;
    }

    div{
        display: flex;
        padding: 0;
        gap: 1rem;
    }

    @media (max-width: 600px){
        flex-direction: column;
        span{
            font-size: 5rem;
            padding: 1rem;
            line-height: 5rem;
        }

        div{
            display: flex;
            gap: 1rem;
        }
    }
`;

export const Separator = styled.section`
    padding: 2rem 0;
    color: ${props => props.theme['green-500']};
    display:flex;
    justify-content: center;
    width: 4rem;
    overflow: hidden;

    @media (max-width: 600px){
        display: none;
    }
`;