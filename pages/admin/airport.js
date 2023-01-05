import Layout from "../../layouts/admin/Layout";
import Airport from "../../components/admin/airport/Airport";
import { getServerSideProps } from "./index";

export default function airportPage({ user }) {
  return (
    <Layout title="Airport" user={user}>
      <Airport />
    </Layout>
  );
}

export { getServerSideProps };
