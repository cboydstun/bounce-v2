import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Analytics from "./Analytics";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#663399] min-h-screen">
      <Analytics />
      <Navigation />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
