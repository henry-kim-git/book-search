import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <Header />
      <div className="px-6">
        <main className="mx-auto max-w-240">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
