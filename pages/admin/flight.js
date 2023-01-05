import Flight from "../../components/admin/flight/Flight";
import Layout from "../../layouts/admin/Layout";
import { getServerSideProps } from "./index";

export default function FlightPage() {
  return (
    <Layout title="Flight">
      <Flight />
    </Layout>
  );
}

export { getServerSideProps };
