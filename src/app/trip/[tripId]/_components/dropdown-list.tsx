import { DropDownListType } from "@/src/models/components/Blog"
import DropdownItem from "./dropdown-item"



interface DropdownListProps {
    listData : DropDownListType[]
}


const DropdownList = ({listData}:DropdownListProps) =>{
    return(
        <div>
            {
                listData.map((item) => (
                    <DropdownItem title={item.title} content={item.listContent}/>
                ))
            }
        </div>
    )
}

export default DropdownList