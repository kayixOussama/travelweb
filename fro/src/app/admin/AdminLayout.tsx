import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Map, Package, ArrowLeft, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Destinations", path: "/admin/destinations", icon: Map },
    { name: "Packages", path: "/admin/packages", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-wider text-green-400">ADMIN PANEL</h1>
          <p className="text-gray-400 text-xs mt-1">Discover Rwanda</p>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-green-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          {user && (
            <p className="px-4 text-xs text-gray-500 truncate">Signed in as <span className="text-green-400">{user.name}</span></p>
          )}
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors text-sm w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 px-4 py-3 flex items-center justify-between shadow-md">
         <span className="font-bold text-green-400">ADMIN PANEL</span>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
           {isMobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-40 pt-16 px-4 md:hidden">
           <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg ${
                   location.pathname === item.path ? "bg-green-600 text-white" : "text-gray-400"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
             <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-3 text-gray-400 mt-8 border-t border-gray-800 pt-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 text-red-400"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
           </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 mt-12 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
