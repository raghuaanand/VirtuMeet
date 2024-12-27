import { SignUp, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";



const SignUpPage = () => {

  const { isSignedIn } = useUser();

  if(isSignedIn) redirect("/")
  return <SignUp />;
};

export default SignUpPage;
