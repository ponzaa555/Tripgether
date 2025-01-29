import { Input } from "@/src/components/UI/input"
import { useState } from "react"
import { date } from "zod"

interface DateInputProps {
    date? : string
}

export const InputDate = ({date}:DateInputProps) => {
    const [inputDate , setInputDate] = useState(date)
    const setValueInputDate = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputDate(e.target.value);
    }
    return(
        <div>
            <Input type="date" value ={inputDate}  onChange={(e) => setValueInputDate(e)}  />
        </div>
    )
}