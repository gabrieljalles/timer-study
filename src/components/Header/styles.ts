import { styled } from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2.5rem 3rem;
    

    nav{
        gap: 0.5rem;
        display: flex;
        
        a{
            display: flex;
            align-items:center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            color: ${props => props.theme['gray-100']};

            border-bottom: 3px solid transparent;
            border-top: 3px solid transparent;
        }

        a:hover{
            border-bottom: 3px solid ${props => props.theme['green-500']};
        }

        a.active {
            color:${props => props.theme['green-500']};
        }
        
    }
`;