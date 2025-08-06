import { SignedIn, useUser, useClerk, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { User, LogOut, User2 } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Separator } from "./ui/separator";

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps) {
  const { user } = useUser();
  const { signOut, openSignIn, openUserProfile } = useClerk();

  // Don't render anything if auth is disabled
  if (!siteConfig.auth.enabled) {
    return null;
  }

  return (
    <>
      <SignedIn>
        <div className="relative group">
          <Button
            variant="ghost"
            size="sm"
            className={`${className} bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm text-white hover:text-white p-2 rounded-full`}
            onClick={() => signOut()}
          >
            <User className="w-5 h-5" />
          </Button>

          {/* Custom dropdown */}
          <div className="absolute right-0 mt-2 w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user?.fullName || user?.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>

            <div className="p-1">
              <Separator className="mb-1 border-t border-gray-200 dark:border-gray-700" />
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => signOut()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
              <Separator className="my-1 border-t border-gray-200 dark:border-gray-700" />
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => openUserProfile()}
              >
                <User2 className="w-4 h-4 mr-2" />
                Manage Account
              </Button>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <Button
          variant="ghost"
          size="sm"
          className={`${className} bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm text-white hover:text-white p-2 rounded-full`}
          onClick={() => openSignIn()}
        >
          <User className="w-5 h-5" />
        </Button>
      </SignedOut>
    </>
  );
}
