import Link from 'next/link';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex md:w-60 md:flex-col bg-white border-r">
        <div className="p-4 text-xl font-bold">codexHW</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link className="block text-sm" href="/">Overview</Link>
          <Link className="block text-sm" href="/board">Board</Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <span className="font-bold">codexHW</span>
          <div className="space-x-4 text-sm">
            <Link href="/">Overview</Link>
            <Link href="/board">Board</Link>
          </div>
        </header>
        <main className="p-4 container">{children}</main>
      </div>
    </div>
  );
}
