'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from "@/components/CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import {useRouter} from "next/navigation";
import {signIn, signUp} from "@/lib/actions/user.actions";

const AuthForm = ({type} : { type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

        // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if(type === 'sign-up'){
                const newUser = await signUp(data);
                setUser(newUser)
            }
            if(type === 'sign-in'){
                const res = await signIn({
                    email: data.email,
                    password: data.password
                })
                if(res) router.push("/");
            }
        }catch (e){
            console.log(e);
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8" >
                <Link href='/' className='cursor-pointer items-center gap-1 flex'>
                    <Image src={'/icons/logo.svg'} width={34} height={34} alt='Logo'/>
                    <h1 className='font-ibm-plex-serif font-bold text-black-1'>&nbsp; Next</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Sign In': 'Sign up'
                        }
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {user?
                            'Link your account to get started':
                            'Please enter your details.'
                        }
                    </p>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    plaidlink
                </div>
                ):(
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "sign-up" && (
                                <>
                                    <div className="flex gap-4">
                                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name." />
                                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name." />
                                    </div>
                                    <CustomInput control={form.control} name="address" label="Address" placeholder="Please enter your address." />
                                    <div className="flex gap-4">
                                    <CustomInput control={form.control} name="state" label="State" placeholder="Example: BC" />
                                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Example: V1L 3E5" />
                                    </div>
                                    <div className="flex gap-4">
                                    <CustomInput control={form.control} name="city" label="City" placeholder="Example: Vancouver" />
                                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                                    </div>
                                </>
                            )}
                            <CustomInput control={form.control} name="email" label="Email" placeholder="Please enter your email." />
                            <CustomInput control={form.control} name="password" label="Password" placeholder="Please enter your password." />
                            <div className="flex flex-col gap-4">
                            <Button type="submit" disabled={isLoading} className="form-btn">{
                                isLoading? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        &nbsp;Loading...
                                    </>
                                ) : type === "sign-in"?
                                    'Sign-In' : 'Sign-Up'
                            }</Button>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                       <p className="text-14 font-normal text-gray-600">{type === 'sign-in'?
                        "Don't have an account?": "Already have an account?"
                       }
                       </p>
                        <Link href={type === 'sign-in'? '/sign-up' : '/sign-in'} className="form-link">
                            {type === 'sign-in'? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )
            }
        </section>
    );
};

export default AuthForm;