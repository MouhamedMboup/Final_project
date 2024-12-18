import React, { useState } from "react";

function Header() {
    const [account, setAccount] = useState("");

    async function connectWallet() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
        } else {
            alert("MetaMask not installed");
        }
    }

    return (
        <div className="flex justify-between items-center">
            <button
                onClick={connectWallet}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {account ? `Connected: ${account.substring(0, 6)}...` : "Connect Wallet"}
            </button>
        </div>
    );
}

export default Header;
