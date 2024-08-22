import { useState } from 'react';

import { db } from '../../Configs/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { useUser } from '../../Context/UserContext';

export const InsertData = ({ setData }) => {
    const [numberOfVisits, setNumberOfVisits] = useState(0);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const userData = useUser();

	const blogsRef = collection(db, 'blogs');
	const handleSubmit = (e) => {
		e.preventDefault();
		const newSession = {
			title: title,
			description: description,
			Doctor: userData.name,
			time: serverTimestamp(),
            numberOfVisits: numberOfVisits++,
		};
		addDoc(blogsRef, newSession).then(() => {
			setTitle('');
			setDesc('');
			e.target.reset();

			setBlogs((prev) => {
				return [...prev, newBlog];
			});
		});
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			style={{ display: 'flex', flexDirection: 'column' }}
		>
			<input
				onChange={(e) => setTitle(e.target.value)}
				type="text"
				placeholder="title"
				required
			/>
			<textarea
				onChange={(e) => setDescription(e.target.value)}
				type="text"
				placeholder="description"
				required
			/>
			<input 
            type="submit" />
		</form>
	);
};