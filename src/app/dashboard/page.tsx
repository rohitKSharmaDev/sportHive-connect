import { Button } from '@/components/ui/button'; // Assuming ShadCN UI Button component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming ShadCN UI Card components
import { authOptions } from '../../../lib/auth';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Dashboard - SportHive Connect',
  description: 'Your central hub to manage and view your activities.',
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
      onboardingCompleted: true,
    },
  });

  if (!user?.onboardingCompleted) {
    redirect("/onboarding");
  }

  console.log("Dashboard user:", user);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard</h1>
      <p className="text-gray-600 mt-2">This is your central hub to manage and view your activities.</p>
      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No recent activities to display.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Button className="w-full">View Profile</Button>
              </li>
              <li>
                <Button variant="secondary" className="w-full">Manage Settings</Button>
              </li>
              <li>
                <Button variant="destructive" className="w-full">Log Out</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;