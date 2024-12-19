import React, { useState } from "react";
import { getContract } from "../ethers-config";
import { ethers } from "ethers";

function RegisterInstance({ onRegisterSuccess }) {
    const [type, setType] = useState("");
    const [cost, setCost] = useState("");

    async function register() {
        try {
            const contract = await getContract();

            if (!contract) {
                alert("Failed to connect to the contract.");
                return;
            }

            // Input validation
            if (!type || !cost || isNaN(cost)) {
                alert("Please enter a valid instance type and cost.");
                return;
            }

            console.log("Sending transaction...");

            // Explicit gas limit
            const gasLimit = 600000;

            // Send transaction
            const tx = await contract.registerInstance(type, ethers.parseEther(cost), {
                gasLimit: gasLimit,
            });
            await tx.wait();

            alert("Instance registered successfully!");
            setType("");
            setCost("");

            // Trigger a refresh in the parent component
            if (onRegisterSuccess) onRegisterSuccess();
        } catch (error) {
            console.error("Error registering instance:", error);
            alert("Error registering instance. See console for details.");
        }
    }

    return (
        <div className="flex space-x-4 mb-4">
            <input
                className="border rounded w-1/3 p-2"
                placeholder="Instance Type"
                onChange={(e) => setType(e.target.value)}
                value={type}
            />
            <input
                className="border rounded w-1/3 p-2"
                placeholder="Cost in ETH"
                onChange={(e) => setCost(e.target.value)}
                value={cost}
            />
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={register}
            >
                Register
            </button>
        </div>
    );
}

export default RegisterInstance;