import Dashboard from "../components/Dashboard";
import Aside from "../components/Aside";

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      <Aside className="w-64" />
      <main className="flex-grow bg-[#3f2f25ee] p-6">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
