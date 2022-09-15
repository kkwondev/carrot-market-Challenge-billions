import { NextPage } from "next";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <div className="bg-black py-10">
      <div className=" max-w-[1200px] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
