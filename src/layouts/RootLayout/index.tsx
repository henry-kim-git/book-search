import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

function RootLayout() {
  return (
    <div>
      <Header />
      <div className="px-6 pt-21">
        <main className="mx-auto max-w-240">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
