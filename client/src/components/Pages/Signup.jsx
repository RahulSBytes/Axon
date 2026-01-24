import { Ghost } from "lucide-react";
import google from '../../assets/google.png'
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Signup() {

const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, loginWithGoogle, user } = useAuth(); // ✅ Get loginWithGoogle
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const result = await register(
      formData.fullName,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  // ✅ Handle Google signup
  const handleGoogleSignup = () => {
    loginWithGoogle(); // Same endpoint for login and signup
  };

  return (<div className="flex h-screen w-full bg-primary pr-10 font-adlam">
    <div className="w-2/5 h-full flex  gap-8 flex-col items-center justify-center">
      <span className="text-xl ">Signup to</span>
      <div className="flex gap-1">
        <Ghost size={36} />
        <span className="text-4xl font-bold">Axon</span>
      </div>
    </div>
    <div className="h-full flex flex-1 justify-center items-center gap-4">
      <form action="" method="post" className=" flex flex-col gap-6 h-screen w-4/6 justify-center">
        <div className=" flex flex-col">
          <label htmlFor="fullName" className="text-xl font-medium">Fullname</label>
          <input type="text" onChange={handleChange} value={formData.fullName} required name="fullName" id="fullName" className="bg-[#D9D9D9] p-1 outline-none" />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="email" className="text-xl font-medium">Email</label>
          <input type="email" onChange={handleChange} value={formData.email} required name="email" id="email" className="bg-[#D9D9D9] p-1 outline-none" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password"  className="text-xl font-medium">Password</label>
          <input type="password" onChange={handleChange} value={formData.password} required className="bg-[#D9D9D9] p-1 outline-none" name="password" id="password" />
        </div>
        <button onClick={handleSubmit} className="w-2/3 self-center rounded-full py-[5px] bg-zinc-800 text-zinc-100 mb-2" type="submit">Submit</button>
        <p className="self-center">Already have an account? <a href="/login" className="text-blue-700">Login</a></p>
        <div className="flex items-center justify-between">
          <hr className=" w-2/5 bg-zinc-700 h-[2px]" />
          <div>Or</div>
          <hr className=" w-2/5 bg-zinc-700 h-[2px]" />
        </div>
        <button onClick={handleGoogleSignup} type="button" className="border border-muted w-fit flex rounded-full py-1 px-3 gap-2 justify-center items-center self-center"> <img src={google} alt="" className="h-5 w-5" /> Continue with Google</button>
      </form>
    </div>
  </div>
  )
}
