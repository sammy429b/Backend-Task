import { useState } from "react";
import axios from "axios";

const TransactionsTable = ({ transactions, setTransactions, maxsize={}}) => {

    const [search, setSearch] = useState(" ");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const size = maxsize / 10
    const handleSearch = async () => {
        setLoading(true);
        const response = await axios.get(
            `http://localhost:3000/transcations?page=${page}&search=${search}`
        );
        // setData(response.data);
        setLoading(false);
    };

    const handlePageChange = async (newPage) => {
        setPage(newPage);
        setLoading(true);
        const response = await axios.get(
            `http://localhost:3000/transcations?page=${newPage}`
        );
        // setData(response.data);
        setTransactions(response.data.transactions)
        setLoading(false);
    };

    return (
        <div>
            {/* <div className="border-2">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search transactions"
                    className="py-1 px-2 outline-none"
                />
                <button className="py-1 px-2" onClick={handleSearch}>Search</button>
            </div> */}

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
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="border-2 px-6 py-2">{transaction.id}</td>
                                    <td className="border-2 px-6 py-2">{transaction.title}</td>
                                    <td className="border-2 px-6 py-2">
                                        {transaction.description}
                                    </td>
                                    <td className="border-2 px-6 py-2">{transaction.price}</td>
                                    <td className="border-2 px-6 py-2">{transaction.dateOfSale}</td>
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
                    disabled={page === size}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
