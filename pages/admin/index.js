import Dashboard from "../../components/admin/dashboard/Dashboard";
import Layout from "../../layouts/admin/Layout";

export default function Index({ user }) {
  return (
    <Layout title="Dasboard Admin" user={user}>
      <Dashboard />
    </Layout>
  );
}

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

  if (data?.data && data.data.role.name === "ADMIN") {
    return {
      props: { user: data.data },
    };
  } else {
    return {
      redirect: {
        destination: "/users/login",
        permanent: true,
      },
    };
  }
}
