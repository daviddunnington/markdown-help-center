import { SignIn } from "@clerk/nextjs";
import { siteConfig } from "@/lib/config";

export default function SignInPage() {
  // Only render if auth is enabled
  if (!siteConfig.auth.enabled) {
    return (
      <div className="flex justify-center items-center mx-auto bg-card max-w-4xl pt-20 rounded-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Disabled</h1>
          <p>Authentication is currently disabled in the configuration.</p>

          <p className="mt-12 text-sm text-gray-500">
            You can enable it by setting{" "}
            <code>siteConfig.auth.enabled = true</code> in your{" "}
            <code>lib/config.ts</code> file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <SignIn />
    </div>
  );
}
