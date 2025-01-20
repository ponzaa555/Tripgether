import { DropDownListType } from "@/src/models/components/Blog"
import DropdownList from "../[tripId]/_components/dropdown-list"


const TestComponent = () => {
    const listData: DropDownListType[] = [
        {
            title: "OverView",
            listContent: [{
                key: "TripCover",
                content: "TripCover"
            },
            {
                key:"Description",
                content:"Description",
            },
            {
                key:"My Booking",
                content:"My Booking",
            }
        ,]
        },
    ]
    return (
        <div>
            <DropdownList listData={listData}/>
        </div>
    )
}

export default TestComponent