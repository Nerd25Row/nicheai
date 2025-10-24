import AuthListener from "./features/auth/AuthListener";
import AppRouter from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const qc = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={qc}>
      <AuthListener/>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
