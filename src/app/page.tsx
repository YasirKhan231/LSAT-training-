// app/dashboard/page.tsx
import ProtectedRoute from "../../components/ProtectRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p className=" bg-red-300  text-4xl font-extrabold  flex self-center">
          Welcome to your dashboard!
        </p>
      </div>
    </ProtectedRoute>
  );
}
