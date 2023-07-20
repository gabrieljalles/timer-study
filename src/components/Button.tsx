import { ButtonContainer, ButtonVariant } from "./Button.styles";

interface ButtonProps {
    variant?: ButtonVariant;
    content: string;
}

export function Button({ variant = 'primary', content }: ButtonProps) {
    return <ButtonContainer variant={variant}>{content}</ ButtonContainer>
}