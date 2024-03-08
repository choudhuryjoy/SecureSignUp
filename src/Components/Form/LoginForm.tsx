"use client";


import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/Schema/loginSchema';
import { useState, useTransition } from 'react';

import Image from 'next/image';
import loginImage from '../../../public/login.jpg';
import { Google, Eye, SlashEye } from '../icon';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '../../../actions/login';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      login(data)
        .then((val) => {
          setError(val?.error);
          setSuccess(val?.success);
        })
    })
    // router.push('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              placeholder="Email"
              {...register('email')}
              disabled={isPending}
            />
            {errors.email && (
              <div className="flex items-center text-sm text-red-800" role="alert">
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{errors.email.message}!</span>
                </div>
              </div>
            )}
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                disabled={isPending}
              />
              <div className="cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <SlashEye /> : <Eye />}
              </div>
            </div>
            {errors.password && (
              <div className="flex items-center text-sm text-red-800" role="alert">
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{errors.password.message}!</span>
                </div>
              </div>
            )}
            <FormError message={error} />
            <FormSuccess message={success} />
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 cursor-pointer"
            >
              login
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <Google />
            Continue with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don&apos;t have an account?</p>
            <button className="cursor-pointer py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              onClick={() => router.push('/register')}
            >Register</button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <Image
            className="rounded-2xl"
            src={loginImage}
            alt="Login pyramids"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
