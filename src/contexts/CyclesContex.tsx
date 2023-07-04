import { ReactNode, createContext, useState, useReducer, useEffect} from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";



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
    const [cyclesState, dispatch] = useReducer(cyclesReducer,{
        cycles: [],
        activeCycleId: undefined,
    }, (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@lh-pomotimer:cycles-state');

        if(storedStateAsJSON){
            return JSON.parse(storedStateAsJSON);
        }

        return initialState;
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem('@lh-pomotimer:cycles-state', stateJSON);
    }, [cyclesState]);

    const {cycles, activeCycleId} = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        }

        return 0;
    });
    


    function markCurrentCycleAsFinished(){
        dispatch(markCurrentCycleAsFinishedAction());
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
        
        dispatch(addNewCycleAction(newCycle));
        setAmountSecondsPassed(0);
      }  
    
      function interruptCurrentCycle(){
        dispatch(interruptCurrentCycleAction()); 
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

