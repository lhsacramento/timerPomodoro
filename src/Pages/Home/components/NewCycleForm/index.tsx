import { FormContainer, MinutesAmoutInput, TaskInput } from "./styles";
import { useFormContext } from 'react-hook-form';
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContex";

export function NewCycleForm(){
  const {activeCycle} = useContext(CyclesContext);
  const {register} = useFormContext();

    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          
          <datalist id='taks-suggestions'>
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="Projeto 4"></option>
            <option value="Projeto 5"></option>
          </datalist>

          <TaskInput 
            type="text" 
            list='taks-suggestions' 
            placeholder="De um nome para o seu projeto"
            id="task"
            {...register('task')}
            disabled={!!activeCycle}
          />

          <label htmlFor="minutesAmout">durante</label>
          <MinutesAmoutInput             
            maxLength={2} 
            step={5} 
            min={5}
            max={60} 
            type="number" 
            id="minutesAmout" 
            placeholder="00"
            {...register('minutesAmout',{valueAsNumber: true})}
            disabled={!!activeCycle}
          />

        </FormContainer>
    )
}