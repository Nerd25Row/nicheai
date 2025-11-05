import AppRouter from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context";

const qc = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>

    </QueryClientProvider>
  );
}

export default App;
