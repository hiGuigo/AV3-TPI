// esta página apenas define a estilização que o componente ficará disposto (e chama ele)

import { LoginForm } from "../components/forms/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Login</h1>

        <LoginForm />
      </div>
    </div>
  );
}
