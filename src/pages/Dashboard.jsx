import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import Heading from '../ui/Heading';
import WrappingRow from '../ui/WrappingRow';

function Dashboard() {
  return (
    <>
      <WrappingRow>
        <Heading as='h1'>Dashboard</Heading>
        <DashboardFilter />
      </WrappingRow>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
