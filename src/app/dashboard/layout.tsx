import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserNav } from "@/components/layout/UserNav";
import { SearchCommand } from "@/components/layout/SearchCommand";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b bg-white px-4">
        <MobileNav />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold">Ebrikkho Dashboard</h1>
          <div className="flex items-center gap-4">
            <SearchCommand />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex min-h-screen">
        <aside className="hidden md:flex w-64 fixed left-0 top-16 bottom-0">
          <Sidebar />
        </aside>
        <main className="flex-1 md:pl-64 pt-16">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
