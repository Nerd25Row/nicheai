import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E2128] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#00FFFF] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-[#CACFDA] mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a 
          href="/" 
          className="inline-block bg-[#00FFFF] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#00E6E6] transition-colors"
        >
          Go Home
        </a>
        {error && (
          <div className="mt-8 p-4 bg-[#2E3137] rounded-lg">
            <p className="text-red-400 text-sm">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;





