import LoginGradient from "../../../components/gradients/LoginGradient";
import LoginForm from "../../../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center bg-[#1D2027] opacity-100 rotate-0 justify-center min-h-screen">
      <LoginGradient>
        <LoginForm />
      </LoginGradient>
    </div>
  );
};

export default LoginPage;
