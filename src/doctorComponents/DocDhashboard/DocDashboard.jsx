import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { db, auth } from '../../Configs/firebase'; // Make sure auth is imported
import { useNavigate } from 'react-router-dom';
import './dashcss.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
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
      
      {patients.map(patient => (
        <div
          key={patient.id}
          className="patient-card"
          onClick={() => navigate(`/PatientRecord/${patient.patientId}`)} // Navigate to patient detail page
        >
          
        
        <div className='main--content'>
          <div className='header--wrapper'>
            <div className='header--title'>
            <span>Primary</span>
            <h2>Dashboard</h2>
          </div>
          <div className='user--info'> 
            <div className='search--box'>
            <i class="fas fa-search" ></i>
              <input type='text' placeholder='Search'/>
            </div>
            <img src="/assets/doctor.jpg" alt=''/>

          </div>
        </div>
        <div className='tabular--wrapper'>
          <h3 className='main--title'>Today's Rendez vous</h3>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th >Name</th>
                  <th>Surname</th>
                  <th>Date</th>
                  <th>Appontment type</th>
                  
                  <th className='lined'>Accept</th>
                  <th>Delete</th>
                  <th>Reject</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{patient.name}</td>
                  <td>{patient.surname}</td>
                  <td>{new Date(patient.appointmentTime.seconds * 1000).toLocaleString()}</td>
                  <td>{patient.firstTime ? 'First Visit' : 'Returning Patient'}</td>
                  
                  <td ><button className='accept' onClick={() => handleAction(patient.patientId, 'accept')} >Accept</button></td>
                  <td><button onClick={() => handleAction(patient.patientId, 'reject')} className='reject'>Reject</button></td>
                  <td><button onClick={() => handleAction(patient.patientId, 'delay')} className='delete'>Delay</button></td>


                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
          
        </div>
      ))}
    

    </div>
    
  );
};

export default DocDashboard;
