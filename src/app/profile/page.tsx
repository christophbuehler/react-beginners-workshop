import ProtectedLayout from "../protected-layout";
import { ProfileForm } from "./profile-form";

export default () => {
  return (
    <ProtectedLayout>
      <ProfileForm />
    </ProtectedLayout>
  );
};
