import type { ReactNode } from "react";

const LoginGradient = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative w-full bg-[#000000] shadow-[0px_32px_40px_-12px_#00000040] min-h-screen overflow-y-auto bg-[url('/assets/images/gradient.svg')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-10 flex justify-center py-4 min-h-screen">{children}</div>
    </div>
  );
};

export default LoginGradient;
