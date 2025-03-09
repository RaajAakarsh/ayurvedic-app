import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const AdminDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            const response = await fetch("http://localhost:8080/api/auth/doctors", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setDoctors(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const handleDelete = async (doctorId) => {
        if (!doctorId) {
            console.error("Invalid doctor ID:", doctorId);
            alert("Error: Invalid doctor ID.");
            return;
        }
    
        console.log("Deleting doctor with ID:", doctorId);
    
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Error deleting doctor: ${response.status}`);
                }
    
                console.log("Doctor deleted successfully");
                alert("Doctor deleted successfully!");
    
                // Update the UI by removing the deleted doctor
                setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
            } catch (error) {
                console.error("Error deleting doctor:", error);
                alert("Failed to delete doctor. Please check the console for details.");
            }
        }
    };
    

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error("No file selected for upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/doctors/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }, // Don't set 'Content-Type' for FormData
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error uploading doctors: ${response.status}`);
            }

            const result = await response.json();
            console.log("Upload success:", result);
            alert("Doctors uploaded successfully!");

            fetchDoctors();
        } catch (error) {
            console.error("Error uploading doctors:", error);
        }
    };



    if (loading) return <p>Loading doctors...</p>;

    return (
        <div style={{ padding: "20px", marginTop: "150px" }}>
            <h2>Manage Doctors</h2>

            {/* Upload Button and File Input */}
            {/* File Upload Section */}
            <div style={{ marginBottom: "20px" }}>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
                    Upload Excel
                </button>
            </div>


            <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Zip Code</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Certificate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor._id}>
                            <td>{doctor.firstName} {doctor.lastName}</td>
                            <td>{doctor.email}</td>
                            <td>{doctor.phone}</td>
                            <td>{doctor.age}</td>
                            <td>{doctor.gender}</td>
                            <td>{doctor.zipCode}</td>
                            <td>{doctor.designation}</td>
                            <td>{doctor.experience}</td>
                            <td>{doctor.certificate}</td>
                            <td>
                                <button onClick={() => handleDelete(doctor._id)} style={{ marginLeft: "10px", color: "red" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDoctors;
