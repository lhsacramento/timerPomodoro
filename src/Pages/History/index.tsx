import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContex";
import { formatDistanceToNow } from "date-fns";
import locale from 'date-fns/locale/pt-BR'

export function History() {
  const {cycles} = useContext(CyclesContext);

  console.log(cycles);

  return (
    <HistoryContainer>
      <h1>Histórico</h1>
      
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
            {/*    .toISOString()*/
              cycles.map((cycle)=>{
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>{formatDistanceToNow(cycle.startDate,{addSuffix: true,locale:locale})}</td> 
                    <td>
                      {
                        cycle.finishedDate && (
                          <Status statuscolor="green">Concluído</Status>
                        ) ||
                        (cycle.interruptedDate && (
                          <Status statuscolor="red">Interrompido</Status>
                        ) ||
                        !cycle.finishedDate && !cycle.interruptedDate && (
                          <Status statuscolor="yellow">Em andamento</Status>
                        ))
                      }
                    </td> 
                  </tr>  
                )
              })
            }
          </tbody>
          
        </table>
        
      </HistoryList>
    </HistoryContainer>
  )
}
