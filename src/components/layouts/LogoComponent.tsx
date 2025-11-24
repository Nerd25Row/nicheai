const LogoComponent = () => {
  return (
    <div className="w-[109px] h-[48px] rotate-0 opacity-100 flex items-center relative">
      <img
        src="/assets/images/logo.png"
        className="w-[47.835357666015625px] h-[47.999820709228516px] rotate-0 object-cover dark:opacity-100"
      />
      <span className="w-[55.13px] h-[35.96px] ml-2 dark:text-white opacity-100 rotate-0 text-lg sm:text-xl font-semibold flex flex-col justify-center">
        <span>Niche</span> <span>AI</span>
      </span>
    </div>
  );
};
export default LogoComponent;
