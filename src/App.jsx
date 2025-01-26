import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import ImageGeneration from "./components/ImageGeneration";
import { useAuthContext } from "./store/auth-context";

function App() {
  const { token } = useAuthContext();

  return (
    <div className="bg-stone-800 min-h-screen py-8">
      <Header />
      <main className="mt-12">
        {!token ? <AuthForm /> : <ImageGeneration />}
      </main>
    </div>
  );
}

export default App;
