
function StatCard({ statistics }) {
    return (
        <>
            <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8">
                <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                        <div
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                            <span>Total Sale</span>
                        </div>
                        <div className="text-3xl">
                            {statistics.SaleCount}
                        </div>
                    </div>
                </div>

                <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                        <div
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                            <span>Total sold item</span>
                        </div>
                        <div className="text-3xl">
                            {statistics.soldCount}
                        </div>
                    </div>
                </div>

                <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                        <div
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
                            <span>Total not sold item</span>
                        </div>
                        <div className="text-3xl">
                            {statistics.notSoldCount}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatCard