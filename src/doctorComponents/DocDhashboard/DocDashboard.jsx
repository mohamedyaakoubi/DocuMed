import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../Configs/firebase';
import { useNavigate } from 'react-router-dom';
import './dashcss.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DocDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!currentUser) return;

        setLoading(true);
        const userEmail = currentUser.email;

        const doctorsQuery = query(collection(db, 'doctors'), where('email', '==', userEmail));
        const doctorSnapshot = await getDocs(doctorsQuery);

        if (!doctorSnapshot.empty) {
          const doctorDocId = doctorSnapshot.docs[0].id;
          const appointmentsQuery = query(
            collection(db, 'patientAppointments'),
            where('docId', '==', doctorDocId)
          );

          const appointmentsSnapshot = await getDocs(appointmentsQuery);
          const appointmentsList = appointmentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setAppointments(appointmentsList);

          const patientIds = appointmentsList.map(app => app.patientId);
          const patientsQuery = query(
            collection(db, 'patientInfo'),
            where('patientId', 'in', patientIds)
          );

          const patientsSnapshot = await getDocs(patientsQuery);
          const patientsData = patientsSnapshot.docs.reduce((acc, doc) => {
            acc[doc.data().patientId] = doc.data();
            return acc;
          }, {});

          setPatients(patientsData);
        } else {
          console.error('Doctor not found');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  const handleAction = async (appointmentId, action, patientId) => {
    try {
      const appointmentRef = doc(db, 'patientAppointments', appointmentId);
      const status = action.charAt(0).toUpperCase() + action.slice(1);

      await updateDoc(appointmentRef, { status });
      if (action === 'accept') navigate(`/PatientRecord/${patientId}`);

      const updatedAppointments = appointments.map(app =>
        app.id === appointmentId ? { ...app, status } : app
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error(`Error ${action}ing appointment:`, error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/Login');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      
      <div className='main-content'>
        <header className='header-wrapper'>
          <div className='header-title'>
            <span>Primary</span>
            <h2>Dashboard</h2>
          </div>
          <div className='user-info'>
            <div className='search-box'>
              <i className="fas fa-search"></i>
              <input type='text' placeholder='Search' />
            </div>
            <img src="/assets/doctor.jpg" alt='Doctor' />
          </div>
        </header>

        <section className='tabular-wrapper'>
          <h3 className='main-title'>Today's Appointments</h3>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Date</th>
                  <th>Appointment Type</th>
                  <th className='lined'>Accept</th>
                  <th>Reject</th>
                  <th>Delay</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => {
                  const patient = patients[appointment.patientId] || {};
                  return (
                    <tr key={appointment.id}>
                      <td>{patient.name || 'N/A'}</td>
                      <td>{patient.surname || 'N/A'}</td>
                      <td>{new Date(appointment.appointmentDue.seconds * 1000).toLocaleString()}</td>
                      <td>{appointment.specialty || 'N/A'}</td>
                      <td>
                        <button className='action-btn accept' onClick={() => handleAction(appointment.id, 'accept', appointment.patientId)}>Accept</button>
                      </td>
                      <td>
                        <button className='action-btn reject' onClick={() => handleAction(appointment.id, 'reject')}>Reject</button>
                      </td>
                      <td>
                        <button className='action-btn delay' onClick={() => handleAction(appointment.id, 'delay')}>Delay</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocDashboard;
