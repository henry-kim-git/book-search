import { NavLink } from "react-router-dom";
import Typography from "./Typography";

type RouteItem = {
  name: string;
  href: string;
};

const ROUTE_LIST: RouteItem[] = [
  {
    name: "도서 검색",
    href: "/"
  },
  {
    name: "내가 찜한 책",
    href: "/favorites"
  }
] as const;

function Header() {
  return (
    <header className="flex h-20 items-center justify-center px-6">
      <nav className="relative flex w-full max-w-[1600px] items-center justify-center">
        <a href="/" className="absolute top-1/2 left-0 -translate-y-1/2">
          <img src="/images/logo.svg" alt="CERTICOS BOOKS" width={207} height={32} sizes="207px" fetchPriority="high" loading="eager" />
        </a>
        <div className="flex items-center justify-center gap-8">
          {ROUTE_LIST.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              end={route.href === "/"}
              className={({ isActive }) => `border-b pb-1 ${isActive ? "border-[#4880EE]" : "border-transparent"}`}
            >
              <Typography type="Body-1">{route.name}</Typography>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
