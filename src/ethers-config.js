import { BrowserProvider, Contract } from "ethers";
import contractABI from "./abi/ComputeMarketplace.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;


export async function getContract() {
    if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this app.");
        return null;
    }

    try {
        // Connect to MetaMask provider
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Correctly access the ABI
        const contract = new Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

        console.log("Contract instance loaded:", contract);
        return contract;
    } catch (error) {
        console.error("Error connecting to contract:", error);
        return null;
    }
}

