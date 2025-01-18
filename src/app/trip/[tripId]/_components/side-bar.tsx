"use client"

import { faL } from "@fortawesome/free-solid-svg-icons";
import { ArrowBigLeft, Book, ChevronDown, CirclePlus, SquarePlus } from "lucide-react"
import { useState } from "react"

interface SideBarProsp {

}

export const SideBar = ({

}: SideBarProsp) => {
    const [overView, setoverView] = useState(false);
    const [goTrip, setGoTrip] = useState(false);
    const [expense, setExpense] = useState(false);
    const [gallery, setGallery] = useState(false);
    return (
        <section className=" hidden sm:block h-[calc(100vh-60px)] bg-white  items-center w-[240px] shrink-0 border-r-2 border-[#F4F8FB]">
            <div className="h-full desktop:border-r flex flex-col divide-y divide-[#E5E5E5]">
                {/* Button */}
                <button className="shrink-0 py-8 pl-10 flex w-full gap-3 font-medium text-sm items-center hover:bg-[#F4F5F8]">
                    <span><ArrowBigLeft /></span>
                    <span>Go back</span>
                </button>
                <div className=" flex flex-col divide-y divide-[#E5E5E5] grow overflow-y-auto">
                    {/* over view */}
                    <div>
                        <button className="flex w-full px-10 py-6 font-bold justify-between hover:bg-[#F4F5F8]"
                            onClick={() => setoverView(!overView)}>
                            <span>Overview</span>
                            <span><ChevronDown /></span>
                        </button>
                        {overView && (
                            <div className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr transition-all duration-300"
                                style={{
                                    minHeight: "0px",
                                    height: "auto",
                                    transition: "300ms"
                                }}>
                                {/* Content inside the div */}
                                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                                    <div className="flex flex-col w-full text-sm font-medium mb-4">
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Trip Cover</a>
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Description</a>
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">My Booking</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* go Trips map */}
                    <div>
                        <button className="flex w-full px-10 py-6 font-bold justify-between hover:bg-[#F4F5F8]"
                            onClick={() => setGoTrip(!goTrip)}>
                            <span>goTrip</span>
                            <span><ChevronDown /></span>
                        </button>
                        {goTrip && (
                            <div className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr transition-all duration-300"
                                style={{
                                    minHeight: "0px",
                                    height: "auto",
                                    transition: "300ms"
                                }}>
                                {/* Content inside the div */}
                                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                                    <div className="flex flex-col w-full text-sm font-medium mb-4">
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Day1</a>
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Day2</a>
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Day3</a>
                                        <button className=" flex py-3 pl-12 gap-2 hover:bg-[#F4F5F8]">
                                            <span><CirclePlus width={20} height={20} /></span>
                                            <span>Add date</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Expens */}
                    <div>
                        <button className="flex w-full px-10 py-6 font-bold justify-between hover:bg-[#F4F5F8]"
                            onClick={() => setExpense(!expense)}>
                            <span>Expense</span>
                            <span><ChevronDown /></span>
                        </button>
                        {expense && (
                            <div className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr transition-all duration-300"
                                style={{
                                    minHeight: "0px",
                                    height: "auto",
                                    transition: "300ms"
                                }}>
                                {/* Content inside the div */}
                                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                                    <div className="flex flex-col w-full text-sm font-medium mb-4">
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Manage budget</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* My Gallery*/}
                    <div>
                        <button className="flex w-full px-10 py-6 font-bold justify-between hover:bg-[#F4F5F8]"
                            onClick={() => setGallery(!gallery)}>
                            <span>My Gallery</span>
                            <span><ChevronDown /></span>
                        </button>
                        {gallery && (
                            <div className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr transition-all duration-300"
                                style={{
                                    minHeight: "0px",
                                    height: "auto",
                                    transition: "300ms"
                                }}>
                                {/* Content inside the div */}
                                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                                    <div className="flex flex-col w-full text-sm font-medium mb-4">
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Album1</a>
                                        <a href="" className="py-3 pl-12 hover:bg-[#F4F5F8]">Album2</a>
                                        <button className=" flex py-3 pl-12 gap-2 hover:bg-[#F4F5F8]">
                                            <span><CirclePlus width={20} height={20} /></span>
                                            <span>Add date</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button className=" shrink-0 py-8 pl-10 flex w-full gap-3 font-bold items-center hover:bg-[#F4F5F8]">
                    <span> <Book width={15} height={15}/></span>
                    <span> How to use?</span>
                </button>
            </div>
        </section>
    )
}