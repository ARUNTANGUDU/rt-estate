import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispact= useDispatch();
  const handleChange=(e) =>{
    setFormData({
      ...formData,//spread operator to not delete previous value
      [e.target.id]:e.target.value
    });
  };
  const handleSubmit =async (e) =>{
    e.preventDefault();//to prevent refreshing
    try{
    dispact(signInStart());
      const res=await fetch ('/api/auth/signin',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if(data.success===false){
        dispact(signInFailure(data.message));
        return;
      }
      dispact(signInSuccess(data));
      navigate('/');
  }
    catch(error){
      dispact(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Email' className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an Account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 '>{error}</p>}
    </div>
  );
}

