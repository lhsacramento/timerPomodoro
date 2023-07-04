import { ActionTypes } from "./actions";
import {produce} from 'immer';

interface CyclesState{
    cycles: Cycle[],
    activeCycleId: string | undefined,
}

export interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function cyclesReducer(state: CyclesState, action: any) {

    switch(action.type){
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:{
            const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId);
            if(currentCycleIndex < 0) return state;

            return produce(state, draft => {
                draft.cycles[currentCycleIndex].finishedDate = new Date();
                draft.activeCycleId = undefined;
            });
        }
        case ActionTypes.ADD_NEW_CYCLE:{
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
            });
        }    
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:{
            const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId);
            if(currentCycleIndex < 0) return state;

            return produce(state, draft => {
                draft.cycles[currentCycleIndex].interruptedDate = new Date();
                draft.activeCycleId = undefined;
            });
        }
        default:
            return state;
    }
    

    
}