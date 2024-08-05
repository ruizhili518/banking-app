'use client'

import Link from "next/link";
import Image from "next/image";
import {sidebarLinks} from "@/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Footer from "@/components/Footer";

const Sidebar = ({user}: SiderbarProps) => {
    const pathName = usePathname();
    return (
        <section className="sidebar">
            <nav className='flex flex-col gap-4' >
                <Link href='/' className='mb12 cursor-pointer items-center gap-2 flex'>
                    <Image src={'/icons/logo.svg'} width={34} height={34} alt='Logo' className='size-[24px] max-xl:size-14'/>
                    <h1 className='sidebar-logo'>&nbsp; Next</h1>
                </Link>
                {sidebarLinks .map(item => {
                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}`);
                    return (
                        <Link href={item.route} key={item.label} className={cn('sidebar-link', {
                            'bg-bank-gradient': isActive
                        })}>
                            <div className='relative size-6'>
                                <Image src={item.imgURL} alt={item.label} fill className={cn({'brightness-[3] invert-0': isActive})}/>
                            </div>
                            <p className={cn('sidebar-label',{'!text-white': isActive})}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
                User
            </nav>
            <Footer user={user}/>
        </section>
    );
};

export default Sidebar;