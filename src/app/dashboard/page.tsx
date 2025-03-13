// app/dashboard/page.tsx
import ProtectedRoute from "../../../components/ProtectRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </ProtectedRoute>
  );
}
