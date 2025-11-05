import LoginGradient from "../../../components/gradients/LoginGradient";
import SignupForm from "../../../components/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center bg-[#1D2027] opacity-100 rotate-0 justify-center min-h-screen">
      <LoginGradient>
        <SignupForm />
      </LoginGradient>
    </div>
  );
};

export default SignupPage;
