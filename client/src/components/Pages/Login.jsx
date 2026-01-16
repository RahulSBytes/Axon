import { Ghost } from "lucide-react";

export default function Login() {
  return (<div className="flex h-full w-full flex-col justify-center  items-center px-6 py-12 lg:px-8">
        <div className="border border-blue-800 w-1/2 h-fit flex flex-col justify-center items-center">
          <Ghost size={32} />
          <span>Axon</span>
          <h3>Login</h3>
          Email
          <input type="email" name="" id="" />
          Password
          <input type="password" name="" id="" />
          <div>

            <span className="h-1 bg-zinc-500"></span>
            <span>Or Continue with</span>
            <span className="h-1 bg-zinc-500"></span>
          </div>

        </div>
      </div>
  )
}
