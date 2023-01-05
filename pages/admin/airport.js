import Layout from "../../layouts/admin/Layout";
import Airport from "../../components/admin/airport/Airport";
import { getServerSideProps } from "./index";

export default function airportPage() {
  return (
    <Layout title="Airport">
      <Airport />
    </Layout>
  );
}

export { getServerSideProps };
