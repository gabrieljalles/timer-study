import { Play, Stop } from "phosphor-react";
import { CountdownContainer, FormContainer, MainContainer, Separator,TitleTaskInput, MinuteAmountInput, StopCountdownButton, StartCountdownButton } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds} from "date-fns"


const newCreationTaskFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod.number().min(1, 'Informe o tempo maior ou igual a 1 minutos!').max(60, 'intervalo excedido!').multipleOf(1)
})

type CreateTaskFormProps = zod.infer<typeof newCreationTaskFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);


    const { register, handleSubmit, watch, reset } = useForm<CreateTaskFormProps>({
        resolver: zodResolver(newCreationTaskFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5,
        }
    });

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');


    const task = watch('task')
    const isSubmitDisabled = !task


    useEffect(() => {
        let interval : number;


        if(activeCycle){
           interval = setInterval(()=> {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate,
                )

                if(secondsDifference >= totalSeconds) {

                    setCycles(state => state.map((cycle) => {
                        if(cycle.id === activeCycleId){
                            return {...cycle, finishedDate: new Date()}
                        }else{  
                            return cycle;
                        }
                    }),
                    )
                    
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                }else {
                    setAmountSecondsPassed(secondsDifference);
                }
           },1000)
        }

        return () => clearInterval(interval);

    },[activeCycle, totalSeconds, activeCycleId]);

    function handleSubmitCreateTask(data: CreateTaskFormProps) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles(state => [...state, newCycle]);
        setActiveCycleId(id)
        setAmountSecondsPassed(0);

        reset();
    }

    function handleInterruptCycle(){
       
        setCycles(state => state.map((cycle) => {
            if(cycle.id === activeCycleId){
                return {...cycle, interruptedDate: new Date()}
            }else{  
                return cycle;
            }
        }));

        setActiveCycleId(null);
    }
    


   
    //changing the title of page to Clock timer!
    useEffect(() => {
        if(activeCycle){
            document.title=`${minutes}:${seconds}`
        }
    },[minutes, seconds, activeCycle]);


    return (
        <MainContainer>
            <form onSubmit={handleSubmit(handleSubmitCreateTask)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em </label>
                    <TitleTaskInput
                        list="task-suggestions"
                        type="text"
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        disabled={!!activeCycle}
                        {...register('task')}
                    />
                    <label htmlFor="minutesAmount">durante</label>

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Projeto 4" />
                    </datalist>

                    <MinuteAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={1}
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                    <Stop/> Interromper
                    </StopCountdownButton>
                ):(
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play /> Começar
                    </StartCountdownButton>
                )}
                
            </form>
        </MainContainer>
    )
}