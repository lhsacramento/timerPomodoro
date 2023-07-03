import { ReactNode, createContext, useState } from "react";

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CreateNewCycleData{
    task: string;
    minutesAmout: number;
}
  
interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined;
    activeCycleId: string | undefined;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateNewCycleData) => void;
    interruptCurrentCycle:  () => void;
}

interface CyclesContextProviderProps{
    children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);
  
export function CyclesContextProvider({children}: CyclesContextProviderProps)
{
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | undefined>(undefined);  
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished(){
        setCycles( (state) =>
            state.map((cycle) => {
            if(cycle.id === activeCycleId){
                return {...cycle, finishedDate: new Date()};
            }else{
                return cycle;
            }
            })
        )
    }

    function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds);
    }

    function createNewCycle(data: CreateNewCycleData){
        const id = String(new Date().getTime());
    
        const newCycle: Cycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmout,
          startDate: new Date(),
        }
        
        setCycles( (state: Cycle[]) => [...state,newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
      }  
    
      function interruptCurrentCycle(){
        setCycles((state) =>
          state.map(cycle => {
            if(cycle.id === activeCycleId){
              return {...cycle, interruptedDate: new Date()};
            }else{
              return cycle;
            }
        }))    
        setActiveCycleId(undefined);
      } 

    return (
        <CyclesContext.Provider value={
            {
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished, 
                amountSecondsPassed,
                setSecondsPassed,
                interruptCurrentCycle,
                createNewCycle,
            }
        }
        >{children}</CyclesContext.Provider>        
    );
}

