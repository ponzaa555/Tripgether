'use client'

import { handleScroll } from "@/src/lib/utils";
import { DropDownItemType } from "@/src/models/components/Blog";
import { ChevronDown } from "lucide-react";
import { Span } from "next/dist/trace";
import Link from "next/link";
import { useRef, useState } from "react"


interface DropdownItemProps {
    title : string,
    content : DropDownItemType[]
}
const DropdownItem = ({title , content}:DropdownItemProps) => {
    const [isOpen , setIsOpen] = useState(false);
    const contentRef = useRef(null)
    return(
        <div className="overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)}
                className=" flex w-full px-10 py-6 font-bold justify-between hover:bg-[#F4F5F8]">
                <span>{title}</span>
                <span className={`transform transition-transform duration-500 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}><ChevronDown/></span>
            </button>
            <div
                ref={contentRef}
                className={`transition-all duration-500 ease-in-out ${isOpen ? ' max-h-full' : ' max-h-0'}`}
                // style={{  height:isOpen ? `${contentRef?.current?.scrollHeight }px` : '0'}}
            >
                <div className=" flex flex-col w-full text-sm font-medium mb-4">
                    {
                        content.map((content) => (
                            
                            <Link className="py-4 pl-12 hover:bg-[#F4F5F8]" href={`#${content.key}`} 
                            scroll={true}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                handleScroll(content.key); // Trigger smooth scrolling
                              }}
                              key={content.key}>
                                {content.content}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default DropdownItem