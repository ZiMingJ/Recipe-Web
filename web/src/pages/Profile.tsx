import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import LoginButton from "../components/LoginButton";
import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const params = useParams();

  const userId = params.userId;

  return (
    <>
      <LoginButton>Log in (Bug to fix in the Dropdown)</LoginButton>

      {userId ? (
        <PublicProfile userId={userId} />
      ) : (
        <>
          <ProfileCard />

          {isAuthenticated &&
            (isLoading ? (
              <div>Loading</div>
            ) : (
              <PublicProfile userId={(user as any).sub} />
            ))}
        </>
      )}
    </>
  );
};

export default Profile;
