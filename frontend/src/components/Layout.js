import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { useState } from "react";
// import { Spinner } from "../components";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Helmet>
        <title>HTC Accounting</title>
        <meta property="og:title" content="HTC Accounting" key="title" />
      </Helmet>
      <div className="flex min-h-screen relative w-full">
        <div
          className={`main-sidebar w-72 fixed left-0 top-0 z-[999] min-w-0 duration-100 ease-linear lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <aside className="flex h-screen w-full flex-col overflow-y-hidden bg-slate-800 dark:bg-slate-900">
            <Navigation toggleSidebar={toggleSidebar} />
          </aside>
        </div>
        <div className="main-wrapper flex flex-col w-full lg:ml-72">
          <header className="sticky top-0 z-[990] flex flex-col w-full bg-white shadow-md">
            {/* <Header toggleSidebar={toggleSidebar} /> */}
            {/* <Spinner /> */}
          </header>
          <main className="main-container p-3 min-w-0">
              <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
