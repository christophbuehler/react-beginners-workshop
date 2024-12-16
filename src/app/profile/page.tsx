import ProtectedLayout from '../protected-layout';
import {ProfileForm} from './profile-form';

const ProfilePage = () => (
  <ProtectedLayout>
    <ProfileForm />
  </ProtectedLayout>
);

export default ProfilePage;
