import Flight from "../../components/admin/flight/Flight";
import Layout from "../../layouts/admin/Layout";
import { getServerSideProps } from "./index";

export default function FlightPage({ user }) {
  return (
    <Layout title="Flight" user={user}>
      <Flight />
    </Layout>
  );
}

export { getServerSideProps };
