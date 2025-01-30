"use client"

interface ExpenseSumaryProps {
    budget: number
    spend: number
}

export const ExpenseSumary = (
    { budget, spend }: ExpenseSumaryProps
) => {
    const total = budget - spend
    return (
        <div className=" bg-[#f4f8fb] p-[22px] rounded-lg max-w-4xl">
            <h3 className="text-[16px]">Expenses Summary</h3>
            <div className="flex flex-col gap-4 p-6 max-w-4xl font-medium text-[12px]">
                <div className="flex justify-between items-center">
                    <div>Budget plan</div>
                    <div className="shrink-0 flex flex-col text-end">
                        <span className="shrink-0">
                            <span>฿ </span>
                            <b className="text-[14px]">{budget}</b>
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        Trip spend
                        <span className="text-gray-400"> (Other)</span>
                    </div>
                    <div className="shrink-0 flex flex-col text-end">
                        <span className="shrink-0">
                            <span>฿
                            </span>
                            <b className="text-[14px]">{spend}</b>
                        </span>
                    </div>
                </div>
            </div>
                <div className="bg-white px-6 py-4 rounded-lg">
                    <div className="flex justify-between items-center- font-medium text-[12px]">
                        <div className="flex gap-4">
                            <span>Total balance</span>
                            <div className="self-start flex items-center gap-2 font-semibold">
                                <span>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="face-smile" className="svg-inline--fa fa-face-smile " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color="#fdba58">
                                        <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                    </svg>
                                </span>
                                <span className=" text-green-600">Nice</span>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col text-end">
                            <span className="shrink-0">
                                <span>฿ </span>
                                <b className="text-[14px]">{total }</b>
                            </span>
                        </div>
                    </div>
                </div>
        </div>
    )
}