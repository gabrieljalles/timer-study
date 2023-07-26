import { HistoryList, MainHistoryContainer, StatusPoint } from "./styles";

export function History() {
    return (
        <MainHistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há 2 meses</td>
                            <td>
                                <StatusPoint statusColor='green'>
                                    Concluído
                                </StatusPoint>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há 2 meses</td>
                            <td>
                                <StatusPoint statusColor='green'>
                                    Concluído
                                </StatusPoint>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há 2 meses</td>
                            <td>
                                <StatusPoint statusColor='green'>
                                    Concluído
                                </StatusPoint>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </HistoryList>
        </MainHistoryContainer>
    )
}