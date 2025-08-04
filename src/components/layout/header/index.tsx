import React from 'react';
import Link from 'next/link';
import { AISearch } from './ai-search';
import { ThemeSwitch } from './theme-switch';
import { auth, signOut } from '@/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Image } from "@imagekit/next";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bookmarks } from "@/components/layout/header/bookmarks";
import { logout } from "@/lib/actions/logout";


export const Header = () => {
  return( <header className="h-16 flex items-center">
    <Link href="/" className="ml-4 text-2xl font-bold text-primary hover:text-primary/90 transition-colors duration-200 tracking-tight">
    AI-CAR-MARKETPLACE
    </Link>

    <AISearch/>
    <ThemeSwitch/>
    <HeaderAuth/>
  </header>
  );
};

// const logout = async()=>{
//     "use server"
//     await signOut();
// }

const HeaderAuth = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex items-center gap-4 mx-2">
      {user ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              <Image
                src={user.image!}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full px-0  py-2">
            <p className="p-2 font-bold">My Profile</p>
            <Separator />

           <Bookmarks /> 
            <form action={logout}>
              <button
                className="flex w-full  hover:bg-muted items-center gap-1 p-1"
                type="submit"
              >
                <LogOutIcon className="h-4 w-4" />
                Logout
              </button>
            </form>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/api/auth/signin" className="btn btn-primary">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
};