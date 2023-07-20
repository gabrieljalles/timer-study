import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from "./styles/global";

export function App() {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Button content="Enviar" />
        <Button variant="secondary" content='Cadastrar' />
        <Button variant="success" content='Adicionar' />
        <Button variant="danger" content='Excluir' />

        <GlobalStyle />
      </ThemeProvider>
    </>


  )
}


