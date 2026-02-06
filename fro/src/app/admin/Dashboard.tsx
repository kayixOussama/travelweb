import { useData } from "../../context/DataContext";
import { Map, Package, Users, TrendingUp } from "lucide-react";

export function Dashboard() {
  const { destinations, packages } = useData();

  const stats = [
    { label: "Total Destinations", value: destinations.length, icon: Map, color: "bg-blue-500" },
    { label: "Active Packages", value: packages.length, icon: Package, color: "bg-green-500" },
    { label: "Monthly Visitors", value: "12.5k", icon: Users, color: "bg-purple-500" },
    { label: "Booking Rate", value: "+18%", icon: TrendingUp, color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Destinations</h2>
          <div className="space-y-4">
            {destinations.slice(0, 3).map(dest => (
              <div key={dest.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <img src={dest.image} alt={dest.title} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-gray-900">{dest.title}</p>
                  <p className="text-xs text-gray-500">{dest.location}</p>
                </div>
                <div className="ml-auto text-sm font-bold text-gray-900">
                   ★ {dest.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Packages</h2>
          <div className="space-y-4">
             {packages.slice(0, 3).map(pkg => (
              <div key={pkg.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                  {pkg.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{pkg.name}</p>
                  <p className="text-xs text-gray-500">{pkg.duration}</p>
                </div>
                <div className="ml-auto text-sm font-bold text-green-600">
                   {pkg.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
