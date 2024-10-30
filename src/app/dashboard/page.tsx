import Dashboard from "../components/Dashboard";
import Aside from "../components/Aside";
import ProtectedLayout from "../context/ProtectedLayout";
import Header from "../components/header";
import Footer from "../components/footer";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedLayout>
      {/* <Header /> */}

      <div className="flex w-screen h-screen overflow-hidden">
      <Aside className="w-64 flex-shrink-0" />

      <section className="flex-1 bg-marron-oscuro p-4 overflow-hidden">
        <div className="h-full w-full bg-[#ebc68e] rounded shadow overflow-hidden flex flex-col">
          <div className="p-8 flex-1 overflow-auto">
            {children || <Dashboard />}
          </div>
        </div>
      </section>
    </div>
      {/* <Footer /> */}

    </ProtectedLayout>
  );
};

export default DashboardPage;
