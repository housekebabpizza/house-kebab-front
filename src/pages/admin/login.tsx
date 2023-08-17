import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGeneral } from "@/src/hooks/useGeneral";
import { IFormLogin } from "@/src/types";

export default function Login() {
  const { jwtToken } = useGeneral();
  const [form, setForm] = useState<IFormLogin>({
    email: "",
    password: "",
  });

  const { loginAdmin } = useGeneral();
  const { push } = useRouter();

  useEffect(() => {
    if (jwtToken) {
      push("/admin");
    }
  }, []);

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IFormLogin) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    loginAdmin(form);
    setTimeout(() => push("/admin"), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 md:h-full lg:py-0">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">Zaloguj się</h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
                onChange={handleChangeTextField}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
                onChange={handleChangeTextField}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
