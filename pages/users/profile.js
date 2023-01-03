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

  const response = await fetch(process.env.API_URL + "/auth/whoami", config);
  const { data } = await response.json();

  // console.log("profile user:", data);
  return {
    props: { userData: data.data },
  };
}

export default profile;
