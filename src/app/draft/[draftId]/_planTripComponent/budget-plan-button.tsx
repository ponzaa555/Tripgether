"use  client"

interface BudgetPlanButtonProps {
    icon : JSX.Element
    lable : string
}

export const BudgetPlanButton = ({icon , lable}: BudgetPlanButtonProps) => {
    return(
        <button className=" flex items-center py-2 px-2 space-x-3 bg-slate-100 rounded-md">
            {icon}
            <p className=" text-sm" >{lable}</p>
        </button>
    )
}