import React, { useEffect, useState } from "react";
import { getContract } from "../ethers-config";
import { ethers } from "ethers";
import RegisterInstance from "./RegisterInstance";

function InstanceList() {
    const [instances, setInstances] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0); // Key to trigger refresh

    // Fetch instances from the contract
    async function fetchInstances() {
        try {
            const contract = await getContract();
            if (!contract) {
                alert("Failed to connect to contract");
                return [];
            }

            const instanceCount = await contract.instanceCount();
            console.log("Total Instances:", instanceCount.toString());

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

    useEffect(() => {
        async function loadInstances() {
            const fetchedInstances = await fetchInstances();
            setInstances(fetchedInstances);
        }
        loadInstances();
    }, [refreshKey]); // Dependency array triggers when refreshKey changes

    // Function to trigger refresh
    const handleRegisterSuccess = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    return (
        <div>
            <RegisterInstance onRegisterSuccess={handleRegisterSuccess} />
            <h2 className="text-xl font-bold mb-4">Available Compute Instances</h2>
            {instances.length === 0 ? (
                <p className="text-gray-500 text-lg">No compute instances available yet.</p>
            ) : (
                <ul>
                    {instances.map((inst) => (
                        <li
                            key={inst.id}
                            className="border p-4 rounded mb-2 shadow-md"
                        >
                            <p><strong>Type:</strong> {inst.type}</p>
                            <p><strong>Cost:</strong> {inst.cost} ETH</p>
                            <p><strong>Provider:</strong> {inst.provider}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                {inst.isAvailable ? "Available" : "Rented"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InstanceList;
