import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { db, auth } from '../../Configs/firebase'; // Make sure auth is imported
import { useNavigate } from 'react-router-dom';

export const DocDashboard = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patients data
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true); // Set loading to true before fetching data

      try {
        const docDashboardRef = collection(db, 'docDashboard');
        const querySnapshot = await getDocs(docDashboardRef);

        const patientsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPatients(patientsList);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchPatients();
  }, []);

  // Handle patient action
  const handleAction = async (patientId, action) => {
    try {
      // Query to find the document with the given patientId
      const docDashboardRef = collection(db, 'docDashboard');
      const q = query(docDashboardRef, where('patientId', '==', patientId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const patientDoc = querySnapshot.docs[0].ref; // Get document reference from querySnapshot

        if (action === 'accept') {
          await updateDoc(patientDoc, { status: 'accepted' });
        } else if (action === 'reject') {
          await updateDoc(patientDoc, { status: 'rejected' });
        } else if (action === 'delay') {
          await updateDoc(patientDoc, { status: 'delayed' });
        }

        // Refresh patient list
        const updatedQuerySnapshot = await getDocs(docDashboardRef); // Re-fetch the updated list
        const updatedPatientsList = updatedQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(updatedPatientsList);
      } else {
        console.error('Patient not found');
      }
    } catch (error) {
      console.error('Error handling patient action:', error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
  
      // Clear local storage and session cookies if applicable
      localStorage.removeItem('user'); // Adjust based on your storage
      sessionStorage.clear(); // Optionally clear session storage
  
      navigate('/Login'); // Redirect to login page after logout
      window.location.reload(); // Refresh the page to ensure logout is effective
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      <button 
        onClick={handleLogout} 
        style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'red', color: 'white' }}
      >
        Logout
      </button>
      {patients.map(patient => (
        <div
          key={patient.id}
          className="patient-card"
          onClick={() => navigate(`/PatientRecord/${patient.patientId}`)} // Navigate to patient detail page
        >
          <h3>{patient.name} {patient.surname}</h3>
          <p>Appointment Time: {new Date(patient.appointmentTime.seconds * 1000).toLocaleString()}</p>
          <p>{patient.firstTime ? 'First Visit' : 'Returning Patient'}</p>
          <div className="actions">
            <button onClick={() => handleAction(patient.patientId, 'accept')}>Accept</button>
            <button onClick={() => handleAction(patient.patientId, 'reject')}>Reject</button>
            <button onClick={() => handleAction(patient.patientId, 'delay')}>Delay</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocDashboard;
