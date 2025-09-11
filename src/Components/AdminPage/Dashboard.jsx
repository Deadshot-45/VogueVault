import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminApi } from "../../Hooks/useAdminApi";

const Dashboard = () => {
  const [apiData, setApiData] = useState([]);
  const [stats, setStats] = useState({});
  const {  data, getDashboardStats } = useAdminApi();

  useEffect(() => {
    getDashboardStats();
  }, []);

  useEffect(() => {
    if (data) {
    setApiData(data);
    setStats(data.stats);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Products
            </h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalProducts || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalUsers || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalOrders || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-3xl font-bold text-orange-600">${stats.totalRevenues || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/products"
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-700">Manage Products</h3>
              <p className="text-sm text-gray-500">
                Add, edit, or remove products
              </p>
            </Link>

            <Link
              to="/admin/users"
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-700">Manage Users</h3>
              <p className="text-sm text-gray-500">
                View and manage user accounts
              </p>
            </Link>

            <Link
              to="/admin/orders"
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-700">Manage Orders</h3>
              <p className="text-sm text-gray-500">View and process orders</p>
            </Link>

            <Link
              to="/admin/settings"
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-700">Settings</h3>
              <p className="text-sm text-gray-500">Configure store settings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
