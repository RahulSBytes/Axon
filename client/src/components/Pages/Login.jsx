import { Eye, EyeClosed, Ghost } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast"

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);

  const { login, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success("Welcome back");
      navigate('/');
    } else {
      toast.error("failed to login")
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };


  return (<div className="flex md:flex-row justify-center gap-14 items-center flex-col h-screen w-full bg-primary md:pr-10 font-adlam">
    <div className="md:w-2/5 w-full md:h-full flex  gap-8 flex-col items-center justify-center">
      <span className="text-xl ">Login to</span>
      <div className="flex gap-1">
        <Ghost size={36} />
        <span className="text-4xl font-bold">Axon</span>
      </div>
    </div>
    <div className="md:h-full flex w-full md:flex-1 mb-14 justify-center items-center gap-4">
      <form action="" onSubmit={handleSubmit} method="post" className=" flex flex-col gap-6 md:h-screen md:w-4/6 w-3/4 justify-center">
        <div className=" flex flex-col">
          <label htmlFor="email" className="text-xl font-medium">Email</label>

          <input onChange={(e) => setEmail(e.target.value)} value={email} required type="email" name="email" id="email" className="bg-[#D9D9D9] p-1 outline-none" />

        </div>
        <div className="flex flex-col">
          <label htmlFor="password" required className="text-xl font-medium">Password</label>
          <div className="flex border  border-green-700 bg-[#D9D9D9] items-center pr-2">
            <input type={seePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} className="bg-[#D9D9D9]  flex-1 p-1 outline-none" name="password" id="password" />
            {seePassword ? <EyeClosed className="cursor-pointer" size={20} onClick={() => setSeePassword(false)} /> : <Eye className="cursor-pointer" size={20} onClick={() => setSeePassword(true)} />}
          </div>
        </div>
        <button onClick={handleSubmit} className="w-2/3 self-center rounded-full py-[5px] bg-zinc-800 text-zinc-100 mb-2" type="submit">Submit</button>
        <p className="self-center">Don't have an account? <a href="/signup" className="text-blue-700">Sign up</a></p>
        <div className="flex items-center justify-between ">
          <hr className=" w-2/5 bg-zinc-700 h-[2px]" />
          <div>Or</div>
          <hr className=" w-2/5 bg-zinc-700 h-[2px]" />
        </div>
        <button type="button" onClick={handleGoogleLogin} className="border border-muted w-fit flex rounded-full py-1 px-3 gap-2 justify-center items-center self-center"> <img src='./google.png' alt="" className="h-5 w-5" /> Continue with Google</button>
      </form>
    </div>
  </div>
  )
}
