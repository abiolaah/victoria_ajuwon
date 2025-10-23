"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, GraduationCap, Award, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user?.isAdmin) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  const adminCards = [
    {
      title: "Profiles",
      description: "Manage professional profiles and personas",
      icon: Users,
      href: "/admin/profiles",
      color: "bg-blue-600",
    },
    {
      title: "Projects",
      description: "Add, edit, and organize portfolio projects",
      icon: Briefcase,
      href: "/admin/projects",
      color: "bg-green-600",
    },
    {
      title: "Skills",
      description: "Manage technical and soft skills",
      icon: Award,
      href: "/admin/skills",
      color: "bg-purple-600",
    },
    {
      title: "Education",
      description: "Manage educational background",
      icon: GraduationCap,
      href: "/admin/education",
      color: "bg-orange-600",
    },
    {
      title: "Experience",
      description: "Manage work experience and history",
      icon: Briefcase,
      href: "/admin/experience",
      color: "bg-red-600",
    },
    {
      title: "Settings",
      description: "System settings and configuration",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-zinc-400">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.title}
                className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${card.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{card.title}</CardTitle>
                      <CardDescription className="text-zinc-400">
                        {card.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => router.push(card.href)}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Manage {card.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-zinc-400">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/profile")}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
              >
                View Portfolio
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/admin/settings")}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
              >
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
