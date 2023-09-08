import Completed from "./completed";
import InProgress from "./in-progress";
import Pending from "./pending";

const DashboardHome = () => {
  return (
    <div>
      <div className="grid grid-cols-3 mx-auto max-w-7xl gap-3 h-screen">
        <div className="border p-2">
          <Pending />
        </div>
        <div className="border p-2">
          <InProgress />
        </div>
        <div className="border p-2">
          <Completed />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
