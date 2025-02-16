import SignInComponent from "@/utilities/components/signin/SignInComponent";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Sign in</h1>
      <SignInComponent />
    </div>
  );
};

export default SignIn;
