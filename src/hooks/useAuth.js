import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { auth } from '../firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(null);

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	const signOut = async () => {
		try {
			await auth.signOut();
			console.log('Cool exit');
		} catch (error) {
			console.log(error.message, 'exit not work');
		}
	};

	const memoedValue = useMemo(
		() => ({
			user,
			setUser,
			signOut
		}),
		[user]
	);

	if (initializing) return null;

	return (
		<AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
