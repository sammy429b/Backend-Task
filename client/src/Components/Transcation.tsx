import { useState } from "react";
import axios from "axios";

const TransactionsTable = ({ transactions, month }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState(transactions);

    const handleSearch = async () => {
        const response = await axios.get(
            `http://localhost:3000/api/transactions?month=${month}&page=${page}&search=${search}`
        );
        setData(response.data);
    };

    const handlePageChange = async (newPage) => {
        setPage(newPage);
        const response = await axios.get(
            `http://localhost:3000/api/transactions?month=${month}&page=${newPage}&search=${search}`
        );
        setData(response.data);
    };

    return (
        <div>
            {/* <div>
                <div className="border-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search transactions"
                        className="py-1 px-2 outline-none"
                    />
                    <button className="py-1 px-2" onClick={handleSearch}>Search</button>
                </div>

            </div> */}
            <div className="w-full my-4">
                <table className="border-2 ">
                    <thead>
                        <tr className="border-2 p-2">
                            <th className="border-2 px-6 py-2">Title</th>
                            <th className="border-2 px-6 py-2">Description</th>
                            <th className="border-2 px-6 py-2">Price</th>
                            <th className="border-2 px-6 py-2">Date of Sale</th>
                            <th className="border-2 px-6 py-2">Category</th>
                            <th className="border-2 px-6 py-2">Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((transaction) => (
                            <tr key={transaction.id}>
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
            </div>
            <div className=" my-4 flex justify-between">
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
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
