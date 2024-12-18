import React, { useEffect, useState } from "react";
import { getContract } from "../ethers-config";
import { ethers } from "ethers";

function RentInstance() {
    const [instances, setInstances] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    // Fetch all instances from the smart contract
    async function fetchInstances() {
        try {
            const contract = await getContract();
            if (!contract) {
                alert("Failed to connect to the contract.");
                return [];
            }

            const instanceCount = await contract.instanceCount();
            const allInstances = [];

            for (let i = 0; i < instanceCount; i++) {
                const instance = await contract.instances(i);
                allInstances.push({
                    id: i,
                    type: instance.instanceType,
                    cost: ethers.formatEther(instance.cost),
                    provider: instance.provider,
                    isAvailable: instance.isAvailable,
                });
            }

            return allInstances;
        } catch (error) {
            console.error("Error fetching instances:", error);
            return [];
        }
    }

    // Function to rent an instance
    async function rentInstance(instanceId, cost) {
        try {
            const contract = await getContract();
            if (!contract) {
                alert("Failed to connect to the contract.");
                return;
            }

            const tx = await contract.rentInstance(instanceId, {
                value: ethers.parseEther(cost), // Send the correct cost in ETH
                gasLimit: 500000,
            });

            await tx.wait();
            alert("Instance rented successfully!");
            setRefreshKey((prevKey) => prevKey + 1); // Refresh the list after renting
        } catch (error) {
            console.error("Error renting instance:", error);
            alert("Error renting instance. See console for details.");
        }
    }

    // Fetch instances on component load
    useEffect(() => {
        async function loadInstances() {
            const fetchedInstances = await fetchInstances();
            setInstances(fetchedInstances);
        }
        loadInstances();
    }, [refreshKey]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Rent Compute Instances</h2>
            {instances.length === 0 ? (
                <p className="text-gray-500 text-lg">No compute instances available yet.</p>
            ) : (
                <ul>
                    {instances.map((inst) => (
                        <li
                            key={inst.id}
                            className="border p-4 rounded mb-2 shadow-md flex justify-between"
                        >
                            <div>
                                <p><strong>Type:</strong> {inst.type}</p>
                                <p><strong>Cost:</strong> {inst.cost} ETH</p>
                                <p><strong>Provider:</strong> {inst.provider}</p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {inst.isAvailable ? "Available" : "Rented"}
                                </p>
                            </div>
                            {inst.isAvailable && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => rentInstance(inst.id, inst.cost)}
                                >
                                    Rent
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RentInstance;
