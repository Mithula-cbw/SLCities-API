import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"; // Assuming you're using React Router for navigation.

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-xl font-semibold p-4 w-full h-20 drop-shadow-lg border-b text-center">
          SLCities<span className="text-xs">API</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-4 text-sm font-medium  ${
                  isActive ? "text-white border-r-2 border-white" : "text-gray-400 hover:bg-gray-700"
                }`
              }
            >
              Home
            </NavLink>

            {/* About Link */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-4 text-sm font-medium  ${
                  isActive ? "text-white border-r-2 border-white" : "text-gray-400 hover:bg-gray-800 hover:text-gray-400"
                }`
              }
            >
              About
            </NavLink>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full text-center text-xs text-gray-500 py-2">
          © {new Date().getFullYear()} Mithula CBW. All rights reserved.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
