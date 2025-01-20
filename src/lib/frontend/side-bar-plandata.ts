import { DropDownListType } from "@/src/models/components/Blog";

export const listDataOverview: DropDownListType[] = [
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

export const goTrips: DropDownListType[] = [
    {
        title:"goTrip",
        listContent:[
        {
            key:"Day1",
            content:"Day1",
        },
        {
            key:"Day2",
            content:"Day2",
        },
        {
            key:"Day3",
            content:"Day3",
        },
    ]
    }
]

export const Expense : DropDownListType[] = [
    {
        title:"Expens",
        listContent:[
            {
                key:"Manage budget",
                content:"Manage budget"
            }
        ]
    }
]

export const MyGallery : DropDownListType[] = [
    {
        title:"My Gallery",
        listContent:[
            {
                key:"Albim1",
                content:"Album1",
            },
            {
                key:"Albim2",
                content:"Album2",
            },
        ]
    }
]
