import { createContext, useEffect, useContext, useState } from 'react';

import { auth, db } from '../Configs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection, where, query } from 'firebase/firestore';

const userContext = createContext();

export const UserProvider = ({ children }) => {
	const [user] = useAuthState(auth);
	let userData;
	const [role, setRole] = useState(null)

	if (user) {
		userData = {
			id: user.uid,
			name: user.displayName,
			email: user.email,
			photoUrl: user.photoURL,
			role: '',
		};
		const usersRef = collection(db, 'patients');
		const userQuerry = query(usersRef, where('userId', '==', user?.uid));
		getDocs(userQuerry).then((data) => {
			if (data.docs.length > 0){
				setRole("patient")
			}
		})
	}
	if (!user) {
		userData = null;
	}
	return (
		<userContext.Provider value={{userData, role}}>{children}</userContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(userContext);

	if (context) {
		return context;
	}
};