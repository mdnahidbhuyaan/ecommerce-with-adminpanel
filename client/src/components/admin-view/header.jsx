import { LogOut, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader({setOpen}) {

    return (
      <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
        <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block rounded-sm">
          <MenuIcon />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
          <Button className="inline-flex gap-2 items-center rounded-sm px-4 py-2 text-sm font-medium shadow border-none">
            <LogOut />
            Logout
          </Button>
        </div>
      </header>
    );
}

export default AdminHeader;