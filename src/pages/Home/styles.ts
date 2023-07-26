import { styled } from "styled-components";

export const MainContainer = styled.main`
display: flex;
flex-direction: column;
margin: 4.5rem auto;
align-items: center;
justify-content: center;

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
}

`;

export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color: ${props => props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;
`;

const BaseInput = styled.input`
color: ${props => props.theme['gray-100']};
background: transparent;
height: 2.5rem;
border: none;
border-bottom: 2px solid ${(props) => props.theme['gray-500']};
font-weight: bold;
font-size: 1.125rem;
padding: 0 0.5rem;
color: ${props => props.theme['gray-100']};

&:focus{
    box-shadow: none;
    border-color: ${props => props.theme['green-500']};
}

&:hover{
    color: ${props => props.theme['gray-100']};
}

`;


//flex 1 : "3 atributos ao mesmo tempo que envolve permitir o componente de aumentar ou diminuir de acordo com o tamanho necessário"
export const TitleTaskInput = styled(BaseInput)`
flex: 1;

&:: -webkit-calendar-picker-indicator {
    display: none !important;
}

`;

export const MinuteAmountInput = styled(BaseInput)`
width: 4rem;
`;

export const CountdownContainer = styled.div`
font-family: 'Roboto mono', monospace;
font-size: 10rem;
line-height: 8rem;
color:${props => props.theme['gray-100']};

display: flex;
gap: 1rem;

span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
}

`;

export const Separator = styled.div`
padding: 2rem 0;
color: ${props => props.theme['green-500']};
`;

export const StarCountdownButton = styled.button`
display: flex;
align-items: center;
justify-content: center;

border: 0;
border-radius: 8px;
gap: 0.5rem;

font-weight: bold;
font-size: 1rem;
background-color: ${props => props.theme['green-500']};

width: 100%;
padding: 1rem;
color: ${props => props.theme['gray-100']};

cursor: pointer;

&:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}

&:not(:disabled):hover{
    background-color: ${props => props.theme['green-700']};
}
`;
