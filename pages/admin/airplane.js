import Airplane from "../../components/admin/airplane/Airplane";
import Layout from "../../layouts/admin/Layout";
import { getServerSideProps } from "./index";
export default function airplanePage({ user }) {
  return (
    <Layout title="Airplane" user={user}>
      <Airplane />
    </Layout>
  );
}

export { getServerSideProps };
