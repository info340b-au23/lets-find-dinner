import { Header } from "./Header";
import { Footer } from "./Footer";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { StyledFirebaseAuth } from 'react-firebaseui';

const configObj = {
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        },
        {
            provider: GoogleAuthProvider.PROVIDER_ID
        }
    ],
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false
    },
    credentialHelper: 'none'
}

export function SignUp(props) {
    const auth = getAuth();

    return(
        <div>
            <h1>Hello world</h1>
            <StyledFirebaseAuth uiConfig={configObj} firebaseAuth={auth} />
        </div>
    );
}