'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, } from 'lucide-react';
// import { useAuth } from '@clerk/nextjs';

export function Navbar() {
  const { isSignedIn } = {isSignedIn:false};
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* <WhatsappLogo className="h-6 w-6 text-emerald-600" /> */}
            <span className="font-bold">CalorieTrack</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-emerald-600">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-emerald-600">
              Pricing
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600">
              Dashboard
            </Button>
          ) : (
            <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600" asChild>
              <Link href="/sign-in">Get Started</Link>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-4">
                <Link href="#features" className="text-sm font-medium">Features</Link>
                <Link href="#pricing" className="text-sm font-medium">Pricing</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}