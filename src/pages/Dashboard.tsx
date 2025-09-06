
function Dashboard() {
  return (
    <>
        <div>
            <span className='text-xl font-bold text-gray-600'>Hi, welcome back!</span>
            <span className='ml-8 text-sm font-medium text-gray-400'>Your information dashboard</span>
        </div>
        <div className="flex gap-4">
            <div className="bg-white p-4 rounded-lg min-h-[300px] mt-4 w-full">
                Stock Updates
            </div>
            <div className="bg-white p-4 rounded-lg min-h-[300px] mt-4 w-full">
                Out of Stock Products
            </div>
        </div>
        <div className="bg-white p-4 rounded-lg min-h-[300px] mt-4 w-full">
            <span>Recent Sales</span>
        </div>
    </>
  )
}

export default Dashboard