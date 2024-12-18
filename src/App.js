import React from "react";
import Header from "./components/Header";
import RegisterInstance from "./components/RegisterInstance";
import InstanceList from "./components/InstanceList";
import RentInstance from "./components/RentInstance";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            {/* Header Section */}
            <div className="bg-blue-600 text-white p-6 shadow-md">
                <Header />
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-8">
                {/* Register Instance Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                        Register Compute Instance
                    </h2>
                    <RegisterInstance />
                </div>

                {/* Available Instances Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                        Available Compute Instances
                    </h2>
                    <InstanceList />
                </div>

                {/* Rent Compute Instances Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                        Rent Compute Instances
                    </h2>
                    <RentInstance />
                </div>
            </div>
        </div>
    );
}

export default App;
