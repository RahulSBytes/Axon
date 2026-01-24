import { Ghost } from "lucide-react";
import google from '../../assets/google.png'
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, loginWithGoogle, user } = useAuth(); 
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    console.log("triggered handle submit" , email, password)
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };


  return (<div className="flex h-screen w-full bg-primary pr-10 font-adlam">
    <div className="w-2/5 h-full flex  gap-8 flex-col items-center justify-center">
      <span className="text-xl ">Login to</span>
      <div className="flex gap-1">
        <Ghost size={36} />
        <span className="text-4xl font-bold">Axon</span>
      </div>
    </div>
    <div className="h-full flex flex-1 justify-center items-center gap-4">
      <form action="" onSubmit={handleSubmit} method="post" className=" flex flex-col gap-6 h-screen w-4/6 justify-center">
        <div className=" flex flex-col">
          <label htmlFor="email" className="text-xl font-medium">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} required type="email" name="email" id="email" className="bg-[#D9D9D9] p-1 outline-none" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" onChange={(e)=>setPassword(e.target.value)} value={password} required  className="text-xl font-medium">Password</label>
          <input type="password" className="bg-[#D9D9D9] p-1 outline-none" name="password" id="password" />
        </div>
        <button onClick={handleSubmit} className="w-2/3 self-center rounded-full py-[5px] bg-zinc-800 text-zinc-100 mb-2" type="submit">Submit</button>
        <p className="self-center">Don't have an account? <a href="/signup" className="text-blue-700">Sign up</a></p>
        <div className="flex items-center justify-between ">
          <hr className=" w-2/5 bg-zinc-700 h-[2px]" />
          <div>Or</div>
          <hr className=" w-2/5 bg-zinc-700 h-[2px]" />
        </div>
        <button type="button" onClick={handleGoogleLogin} className="border border-muted w-fit flex rounded-full py-1 px-3 gap-2 justify-center items-center self-center"> <img src={google} alt="" className="h-5 w-5" /> Continue with Google</button>
      </form>
    </div>
  </div>
  )
}
