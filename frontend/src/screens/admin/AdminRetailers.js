import React, { useEffect, useState } from 'react';

const AdminRetailers = () => {
    const [retailers, setRetailers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRetailers();
    }, []);

    const fetchRetailers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            console.log("Fetching retailers...");
            const response = await fetch("http://localhost:8080/api/auth/retailers", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response Status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched Data:", data); // 🔹 Debugging output
            setRetailers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching retailers:", error);
        }
    };

    if (loading) return <p>Loading retailers...</p>;

    return (
        <div style={{ padding: '20px', marginTop: '150px' }}>
            <h2>Manage Retailers</h2>
            <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Zip Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {retailers.length === 0 ? (
                        <tr><td colSpan="4">No retailers found.</td></tr>
                    ) : (
                        retailers.map(retailer => (
                            <tr key={retailer._id}>
                                <td>{retailer.firstName} {retailer.lastName}</td>
                                <td>{retailer.email}</td>
                                <td>{retailer.phone}</td>
                                <td>{retailer.age}</td>
                                <td>{retailer.gender}</td>
                                <td>{retailer.zipCode}</td>
                                <td>
                                    <button onClick={() => alert(`Editing ${retailer.email}`)}>Edit</button>
                                    <button onClick={() => alert(`Deleting ${retailer.email}`)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRetailers;
