import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;    
    }

    @media (max-width: 600px){
        form{
            width: 100%;
        }
    }
`;

export const BaseCountButton = styled.button`
    width: 100%;
    height: 4rem;
    background: ${props => props.theme['green-500']};
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme['gray-100']};
    border: 0;
    border-radius: 8px;
    cursor: pointer;

    &:not(:disabled):hover{
        background: ${props => props.theme['green-700']};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartCountButton = styled(BaseCountButton)`
    background: ${props => props.theme['green-500']};
    &:not(:disabled):hover{
        background: ${props => props.theme['green-700']};
    }
`;
export const StopCountButton = styled(BaseCountButton)`
    background: ${props => props.theme['red-500']};
    &:not(:disabled):hover{
        background: ${props => props.theme['red-700']};
    }
`;