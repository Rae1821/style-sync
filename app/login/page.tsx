import { redirect } from "next/navigation";
import { generateAuthUrl } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    "use server";
    const authUrl = await generateAuthUrl();
    // console.log(authUrl);
    redirect(authUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col gap-4">
            <div className="mx-auto w-[300px] rounded-md p-6 shadow">
              <div className="mb-6 flex flex-col items-center">
                {/* <Link href="/" className="mb-6 flex items-center gap-2">
                  <Image
                    src="/images/logo-2.png"
                    alt="Logo"
                    width={150}
                    height={1500}
                  />
                </Link> */}
                <h1 className="mb-2 text-2xl font-bold">Log in</h1>
                <p className="text-muted-foreground">Welcome back</p>
              </div>
              <div>
                <form action={handleGoogleLogin}>
                  <Button className="mt-4 w-full cursor-pointer">
                    <FcGoogle className="mr-2 size-5" />
                    Login with Google
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
