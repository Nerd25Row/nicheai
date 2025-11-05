import { FaApple, FaGoogle, FaLinkedin, FaMicrosoft } from "react-icons/fa";
import BackToHomePage from "./BackToHomePage";
import LogoComponent from "./LogoComponent";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

const SignupOptions = () => {
  return (
    <div className="relative md:absolute flex flex-col items-center w-full max-w-[90%] sm:max-w-[400px] md:w-[479px] h-auto md:h-[724px] top-0 md:top-[117.81px] gap-6 md:gap-10 opacity-100 rotate-0 px-4 md:px-0 py-8 md:py-0">
      <LogoComponent />

      <div className="flex flex-col items-center w-full md:w-[479px] h-auto md:h-[636px] rotate-0 opacity-100 gap-4">
        <div className="flex flex-col w-full md:w-[479px] h-auto md:h-[572px] rotate-0 opacity-100 rounded-2xl border border-[#393B41] gap-8 md:gap-[59px] pt-8 md:pt-12 pr-6 md:pr-12 pb-6 md:pb-8 pl-6 md:pl-12 bg-[#1D2027] shadow-[0px_15px_70px_-4px_#1018281A]">
          <div className="flex flex-col items-center w-full md:w-[383px] h-auto md:h-[492px] rotate-0 opacity-100 gap-6 md:gap-8">
            <div className="flex flex-col items-center w-full md:w-[383px] h-auto md:h-[76px] rotate-0 opacity-100 gap-4">
              <h1 className="w-[125px] h-[36px] rotate-0 opacity-100 font-inter font-bold text-[28px] leading-[36px] tracking-[-0.02em] text-center text-white">
                Welcome
              </h1>
              <span className="w-[218px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-[16px] leading-[24px] tracking-[0em] text-center text-[#B6BCCA]">
                Sign up to continue
              </span>
            </div>
            <div className="flex flex-col w-full md:w-[383px] h-auto md:h-[304px] rotate-0 opacity-100 gap-4">
              <Button className="w-full md:w-[383px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-medium shadow-[inset_0px_-20px_20px_0px_#01FF013D]">
                <Mail className="w-[20px] h-[20px]" />
                <span className="w-auto md:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-[#1D2027]">
                  Continue with Email
                </span>
              </Button>

              <Button className="w-full md:w-[383px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#2E3137] hover:bg-[#2E3137]/90 border border-[#4D5057] text-white font-medium shadow-[0px_1px_2px_0px_#1018280D]">
                <FaGoogle className="w-[20px] h-[20px]" />
                <span className="w-auto md:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-white">
                  Continue with Google
                </span>
              </Button>

              <Button className="w-full md:w-[383px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#2E3137] hover:bg-[#2E3137]/90 border border-[#4D5057] text-white font-medium shadow-[0px_1px_2px_0px_#1018280D]">
                <FaApple className="w-[20px] h-[20px]" />
                <span className="w-auto md:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-white">
                  Continue with Apple
                </span>
              </Button>
              <Button className="w-full md:w-[383px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#2E3137] hover:bg-[#2E3137]/90 border border-[#4D5057] text-white font-medium shadow-[0px_1px_2px_0px_#1018280D]">
                <FaMicrosoft className="w-[20px] h-[20px]" />
                <span className="w-auto md:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-white">
                  Continue with Microsoft
                </span>
              </Button>
              <Button className="w-full md:w-[383px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#2E3137] hover:bg-[#2E3137]/90 border border-[#4D5057] text-white font-medium shadow-[0px_1px_2px_0px_#1018280D]">
                <FaLinkedin className="w-[20px] h-[20px]" />
                <span className="w-auto md:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-white">
                  Continue with Linkedin
                </span>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full md:w-[267px] h-auto md:h-[48px] rotate-0 opacity-100 gap-2 sm:gap-1.5">
              <span className="w-auto md:w-[267px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] text-white text-center sm:text-left flex items-center">
                Already have an account?
              </span>
              <Button className="w-auto md:w-[64px] h-[48px] rotate-0 opacity-100 rounded-md gap-2 px-2 bg-transparent hover:bg-white/10 text-white font-medium flex items-center justify-center">
                <span className="w-auto md:w-[48px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] text-[#72E6E5]">
                  Log in
                </span>
              </Button>
            </div>
          </div>
        </div>
        <BackToHomePage />
      </div>
    </div>
  );
};

export default SignupOptions;
