"use client";

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from '@/Schema/registerSchema';
import { useState } from "react";
import Image from 'next/image';
import loginImage from '../../../public/login.jpg';
import Google from '../icon/Google';


enum roleEnum {
    user = "user",
    seller = "seller"
}

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: roleEnum;
}

const RegisterForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(registerSchema)
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        console.log(errors);
        router.push('/');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
                    <p className="text-xs mt-4 text-[#002D74]">Create a new account to get started</p>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <input className="p-2 mt-8 rounded-xl border" type="text" placeholder="Name" {...register("name")} />
                        {errors.name &&
                            <div className="flex items-center text-sm text-red-800" role="alert">
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">{errors.name.message}!</span>
                                </div>
                            </div>
                        }
                        <input className="p-2 rounded-xl border" type="email" placeholder="Email" {...register("email")} />
                        {errors.email &&
                            <div className="flex items-center text-sm text-red-800" role="alert">
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">{errors.email.message}!</span>
                                </div>
                            </div>
                        }
                        <input className="p-2 rounded-xl border w-full" placeholder="Password" type={showPassword ? "text" : "password"} {...register("password")} />
                        {errors.password &&
                            <div className="flex items-center text-sm text-red-800" role="alert">
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">{errors.password.message}!</span>
                                </div>
                            </div>
                        }
                        <input className="p-2 rounded-xl border w-full" placeholder="Confirm Password" type={showPassword ? "text" : "password"} {...register("confirmPassword")} />
                        {errors.confirmPassword &&
                            <div className="flex items-center text-sm text-red-800" role="alert">
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">{errors.confirmPassword.message}!</span>
                                </div>
                            </div>
                        }
                        <select id="countries" className="p-3 rounded-xl border w-full"
                            {...register("role")}
                        >
                            <option value="" >Select Role</option>
                            <option defaultValue="user">user</option>
                            <option value="seller">seller</option>

                        </select>
                        {errors.role &&
                            <div className="flex items-center text-sm text-red-800" role="alert">
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">{errors.role.message}!</span>
                                </div>
                            </div>
                        }
                        <button
                            type='submit'
                            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 cursor-pointer"
                        >
                            Register
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
                        <p>Already have an account?</p>
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
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
        </div >
    );
}

export default RegisterForm;