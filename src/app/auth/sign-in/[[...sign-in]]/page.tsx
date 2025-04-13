import { SignIn } from "@clerk/nextjs";

//a page in your server directory that uses the SignIn component from @clerk/nextjs
export default function SignInPage() {
  return (
    <div className="flex justify-center items-center py-8">
      <SignIn />
    </div>
  );
}