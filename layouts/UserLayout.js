import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

import FooterSmall from "../components/Footers/FooterSmall";

const UserLayout = ({ children, user }) => {
  return (
    <div>
      <Navbar userData={user} />
      <main
        style={{
          backgroundImage: `url('/img/4.jpg')`,
        }}
        className="h-max"
      >
        {children}
      </main>

      <FooterSmall />
    </div>
  );
};

export default UserLayout;
