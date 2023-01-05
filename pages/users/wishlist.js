import WishlistPage from "../../components/user/wishlist";

const wishlist = ({ user }) => {
  return (
    <div>
      <WishlistPage user={user} />
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
    props: { user: data.data },
  };
}

export default wishlist;
