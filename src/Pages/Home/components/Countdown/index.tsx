import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContex";

export function Countdown(){
  
  const {
    activeCycle, 
    activeCycleId, 
    markCurrentCycleAsFinished, 
    amountSecondsPassed,
    setSecondsPassed
  } = useContext(CyclesContext);

  
  const totalSecondsActiveCycle = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;    

    if(activeCycle){
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(), 
          new Date(activeCycle.startDate),
        );

        if(secondsDifference >= totalSecondsActiveCycle){
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSecondsActiveCycle);
          clearInterval(interval);        

        }else{
          setSecondsPassed(secondsDifference);
        }        
      }, 30)
    }
    
    return () => {
      clearInterval(interval);
    }

  },[activeCycle, activeCycleId, totalSecondsActiveCycle, markCurrentCycleAsFinished, setSecondsPassed])

  const currentSeconds = activeCycle ? totalSecondsActiveCycle - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2,'0');
  const seconds = String(secondsAmount).padStart(2,'0');

  useEffect(() => {
    if(activeCycle){
      document.title = `${minutes}:${seconds}`;
    }
  },[minutes,seconds]);

    return (        
        <CountDownContainer>
          <div>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
          </div>
          <Separator>:</Separator>
          <div>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </div>
          
        </CountDownContainer>
    );
}