import { ClerkProvider, RedirectToSignIn, useUser } from '@clerk/nextjs';
import AdminPanel from '../../app/AdminMain/AdminPanel';

const AdminPage = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/" />;
  }

  return <AdminPanel />;
};

export default AdminPage;
