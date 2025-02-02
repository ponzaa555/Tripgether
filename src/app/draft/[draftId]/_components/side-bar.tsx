"use client"

import { faL } from "@fortawesome/free-solid-svg-icons";
import { ArrowBigLeft, Book, ChevronDown, CirclePlus, SquarePlus } from "lucide-react"
import { useRef, useState } from "react"
import DropdownList from "./dropdown-list";
import { DropDownListType } from "@/src/models/components/Blog";
import { Expense, goTrips, listDataOverview, MyGallery } from "@/src/lib/frontend/side-bar-plandata";

interface SideBarProsp {

}

export const SideBar = ({

}: SideBarProsp) => {
    const [overView, setoverView] = useState(false);
    const [goTrip, setGoTrip] = useState(false);
    const [expense, setExpense] = useState(false);
    const [gallery, setGallery] = useState(false);
    return (
        <section className=" hidden sm:block h-[calc(100vh)] bg-white  items-center w-[240px] shrink-0 border-r-2 border-[#F4F8FB]">
            <div className="h-full desktop:border-r flex flex-col divide-y divide-[#E5E5E5]">
                {/* Button */}
                <button className="shrink-0 py-8 pl-10 flex w-full gap-3 font-medium text-sm items-center hover:bg-[#F4F5F8]">
                    <span><ArrowBigLeft /></span>
                    <span>Go back</span>
                </button>
                <div className=" flex flex-col divide-y divide-[#E5E5E5] grow overflow-y-auto">
                    {/* over view */}
                    <div>
                        <DropdownList listData={listDataOverview} />
                    </div>
                    {/* go Trips map */}
                    <div>
                        <DropdownList listData={goTrips} />
                    </div>
                    {/* Expens */}
                    <div>
                        <DropdownList listData={Expense} />
                    </div>
                    {/* My Gallery*/}
                    <div>
                        <DropdownList listData={MyGallery}/>
                    </div>
                </div>
                <button className=" shrink-0 py-8 pl-10 flex w-full gap-3 font-bold items-center hover:bg-[#F4F5F8]">
                    <span> <Book width={15} height={15} /></span>
                    <span> How to use?</span>
                </button>
            </div>
        </section>
    )
}