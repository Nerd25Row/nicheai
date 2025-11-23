// src/components/ThemeToggler.tsx
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button"; // or replace with a native <button>
import { useTheme } from "./theme/ThemeProvider";
import clsx from "clsx";
import type { Dispatch, SetStateAction } from "react";
interface ThemeTogglerProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
const ThemeToggler = ({ setOpen }: ThemeTogglerProps) => {
  const { theme, setTheme, isDark } = useTheme();

  // Active when explicitly dark OR effective dark under "system"
  const darkActive = theme === "dark" || (theme === "system" && isDark);
  const lightActive = theme === "light" || (theme === "system" && !isDark);

  return (
    <div className="w-full lg:w-[216px] h-[48px] rounded-xl  flex overflow-hidden">
      {/* Dark */}
      <Button
        type="button"
        onClick={() => {
          setTheme("dark");
          setOpen && setOpen(false);
        }}
        aria-pressed={darkActive}
        className={clsx(
          "flex-1 lg:w-[101px] h-[48px] gap-2 rounded-xl pt-3 pr-4 pb-3 pl-4 text-lg transition-opacity",
          darkActive
            ? "bg-[#4D5057] hover:bg-gray-900 text-white opacity-100"
            : "bg-transparent hover:bg-gray-400 text-black/80 opacity-60"
        )}
      >
        <div className="w-6 h-6 relative">
          <Moon className="w-[19.37px] h-[20.01px] absolute top-[2px] left-[2px]" />
        </div>
        <span className="font-inter font-bold text-base leading-6 text-center">
          Dark
        </span>
      </Button>

      {/* Light */}
      <Button
        type="button"
        onClick={() => {
          setTheme("light");
          setOpen && setOpen(false);
        }}
        aria-pressed={lightActive}
        className={clsx(
          "flex-1 lg:w-[104px] h-[48px] gap-2 rounded-xl pt-3 pr-4 pb-3 pl-4 text-lg transition-opacity",
          lightActive
            ? "bg-gray-50 text-black hover:bg-gray-400 opacity-100"
            : "bg-transparent hover:bg-gray-900 text-white/80 opacity-60"
        )}
      >
        <div className="w-6 h-6 relative">
          <Sun className="w-5 h-5 absolute top-[2px] left-[2px]" />
        </div>
        <span className="font-inter font-bold text-base leading-6 text-center">
          Light
        </span>
      </Button>
    </div>
  );
};

export default ThemeToggler;
