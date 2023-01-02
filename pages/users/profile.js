import ProfilePage from "../../components/user/profile";

const profile = ({ userData }) => {
  return (
    <div>
      <ProfilePage user={userData} />
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const { accessToken } = req.cookies;

  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch("https://airtrip-be-production.up.railway.app/auth/whoami", config);
  const { data } = await response.json();

  console.log("profile user:", data);
  return {
    props: { userData: data.data },
  };
}

export default profile;
