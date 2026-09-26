import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidbar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main>
          <Outlet className="flex-1 flex bg-muted/40 p-4 md:p-6" />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
