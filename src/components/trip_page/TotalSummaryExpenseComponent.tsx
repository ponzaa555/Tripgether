const TotalSummaryExpenseComponent = () => {
  return (
    <div className="bg-slate-100 p-5 rounded-lg flex flex-col gap-5">
      <h1 className="text-lg font-black">Expenses Summary</h1>
      <div className="flex flex-row justify-between px-5 items-center">
        <p className="text-sm">Budget plan</p>
        <p className="text-base font-bold">฿ {10}</p>
      </div>
      <div className="flex flex-row justify-between px-5 items-center">
        <p className="text-sm">Trip spend</p>
        <p className="text-base font-bold">฿ {10}</p>
      </div>
      <div className="bg-white flex flex-row justify-between items-center pl-5 rounded-lg p-5">
        <p className="text-sm">Total balance</p>
        <p className="text-base font-bold">฿ {10}</p>
      </div>
    </div>
  );
};

export default TotalSummaryExpenseComponent;
