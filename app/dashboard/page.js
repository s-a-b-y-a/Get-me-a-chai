"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Dashboardpage from '@/components/Dashboardpage';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  if (status === "loading") {
    // Optionally, you can return a loading state here
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Or any placeholder until the redirect happens
  }

  return (
    <div>
      <Dashboardpage />
    </div>
  );
}

export default Dashboard;
