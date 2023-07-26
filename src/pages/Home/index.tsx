import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, MainContainer, Separator, StarCountdownButton, TitleTaskInput, MinuteAmountInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';


const newCreationTaskFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod.number().min(5, 'Informe o tempo maior ou igual a 5 minutos!').max(60, 'intervalo excedido!').multipleOf(5)
})

type CreateTaskFormProps = zod.infer<typeof newCreationTaskFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
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

    function handleSubmitCreateTask(data: CreateTaskFormProps) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setCycles(state => [...state, newCycle]);
        setActiveCycleId(id)

        reset();
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');


    const task = watch('task')
    const isSubmitDisabled = !task


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
                        min={5}
                        max={60}
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


                <StarCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play /> Começar
                </StarCountdownButton>
            </form>
        </MainContainer>
    )
}