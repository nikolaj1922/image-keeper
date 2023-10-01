export const Date = ({ month, year, count }: { month: string; year: string; count: number }) => {
  return (
    <div className="mb-5 flex items-center gap-[15px] px-5 sm:px-0">
      <span className="text-[31px] font-bold text-gray-200">
        {month} ‘{year}
      </span>
      <div className="flex h-[34px] w-[35px] items-center justify-center rounded-[10px] bg-[#A9E5BB] px-[10px] py-[5px] text-[21px] font-semibold text-white">
        {count}
      </div>
    </div>
  )
}
