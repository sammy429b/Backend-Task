import { useState } from "react";
import { Search } from "lucide-react";
import { ApiConfig } from "../utils/Apiconfig";



const TransactionsTable = ({ transactions, setTransactions }:any) => {
    
    function newDate(date){
        let d = new Date(date)
        let da =  d.getFullYear() +"-" + d.getMonth() + "-"+  d.getDate()  
        return da ;
    }

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Function to handle search operation
    const handleSearch = async () => {
        setLoading(true);
        const response = await ApiConfig.get(`/transcations?search=${search}`);
        setTransactions(response.data.transactions)
        setLoading(false);
    };

     // Function to handle pagination
    const handlePageChange = async (newPage:any) => {
        try{
            setPage(newPage);
            setLoading(true);
            const response = await ApiConfig.get(`/transcations?page=${newPage}`);
            setTransactions(response.data.transactions)
            setLoading(false);
        }catch(error:any){
            console.log("Error in pagination", error.message)
        }finally{
            setLoading(false)
        }
    };

    return (
        <div>
            <div>
                <div className=" border-2 rounded flex items-center ">
                    <input type="search" value={search}
                        onChange={(e) => (setSearch(e.target.value))}
                        className="w-[95%] px-2 py-2 outline-none" name="" id="" placeholder="search transcation" />
                    <button className="font-normal text-sm " onClick={handleSearch}><Search /></button>
                </div>
            </div>

            <div className="my-4 flex justify-between">
                <button
                    className="border hover:bg-slate-100 px-4 py-2 rounded transition-all duration-200"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="border hover:bg-slate-100 px-4 py-2 rounded transition-all duration-200"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === 6}
                >
                    Next
                </button>
            </div>

            <div className="w-full my-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="border-2">
                        <thead>
                            <tr className="border-2 p-2">
                                <th className="border-2 px-6 py-2">Id</th>
                                <th className="border-2 px-6 py-2">Title</th>
                                <th className="border-2 px-6 py-2">Description</th>
                                <th className="border-2 px-6 py-2">Price</th>
                                <th className="border-2 px-6 py-2">Date of Sale</th>
                                <th className="border-2 px-6 py-2">Category</th>
                                <th className="border-2 px-6 py-2">Sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction:any) => (
                                <tr key={transaction.id}>
                                    <td className="border-2 px-6 py-2">{transaction.id}</td>
                                    <td className="border-2 px-6 py-2">{transaction.title}</td>
                                    <td className="border-2 px-6 py-2">
                                        {transaction.description}
                                    </td>
                                    <td className="border-2 px-6 py-2">{transaction.price}</td>
                                    <td className="border-2 px-6 py-2">{newDate(transaction.dateOfSale)}</td>
                                    <td className="border-2 px-6 py-2">{transaction.category}</td>
                                    <td className="border-2 px-6 py-2">
                                        {transaction.sold ? "Yes" : "No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TransactionsTable;
