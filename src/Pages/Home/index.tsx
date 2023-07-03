import {HandPalm, Play} from 'phosphor-react'
import { HomeContainer, StartCountButton, StopCountButton} from './styles'
import * as zod from 'zod';
import { useContext} from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {useForm, FormProvider} from 'react-hook-form'
import { CyclesContext } from '../../contexts/CyclesContex';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmout: zod.number().min(5).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const {activeCycle,createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmout: 0,
      task: '',
    }
  });

  const {handleSubmit, watch, reset} = newCycleForm;

  const task = watch('task');
  const isButtonDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData){
    createNewCycle(data);
    reset();
  }

  return( 
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>     

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        { activeCycle ? (
          <StopCountButton onClick={interruptCurrentCycle} type="button">
            <HandPalm/>
            Interromper
          </StopCountButton>
        ) : (
          <StartCountButton disabled={isButtonDisabled}>
            <Play/>
            Começar
          </StartCountButton>
        )}

      </form>
    </ HomeContainer>
  )
}
