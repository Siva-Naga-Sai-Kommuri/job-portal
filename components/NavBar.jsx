import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogOut } from 'react-icons/bi';
import { BsSun, BsMoon } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { setUserData } from '@/Utils/UserSlice';

export default function NavBar() {
    const dispatch = useDispatch();
    const [openJobs, setOpenJobs] = useState(false);
    const Router = useRouter();
    const user = useSelector(state => state.User.userData);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, isScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        dispatch(setUserData(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null));

        // Check dark mode from local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, [dispatch]);

    // Handle Logout
    const handleLogout = async () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        Router.reload();
    };

    // Dark Mode Toggle
    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };

    // Handle scroll
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                isScrolled(true);
            } else {
                isScrolled(false);
            }
        });
        return () => {
            window.removeEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    isScrolled(true);
                } else {
                    isScrolled(false);
                }
            });
        };
    }, [scrolled]);

    return (
        <>
            {/* NavBar Container */}
            <div className={`w-full ${scrolled ? "bg-indigo-600/70" : "bg-indigo-600"} px-6 h-20 bg-indigo-600 text-white flex items-center justify-between fixed top-0 left-0 z-50 dark:bg-gray-800`}>
                {/* Logo */}
                <div className='px-2 h-full flex items-center justify-center'>
                    <p className='uppercase font-semibold tracking-widest text-lg'>JOB-PORTAL</p>
                </div>

                {/* Menu Items */}
                <div className='px-2 h-full hidden items-center justify-center lg:flex'>
                    <Link href={'/'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase">Home</Link>
                    <Link href={'/frontend/displayJobs'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase">Job Details</Link>
                    <Link href={'/frontend/dashboard'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase">Dashboard</Link>
                    <Link href={'/frontend/postedJob'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase">Posted Jobs</Link>

                    {/* Dark Mode Toggle */}
                    <button onClick={toggleDarkMode} className="mx-4 text-2xl cursor-pointer">
                        {darkMode ? (
                            <BsSun className="text-yellow-500 hover:text-yellow-400 transition-all duration-300" />
                        ) : (
                            <BsMoon className="text-gray-300 hover:text-gray-400 transition-all duration-300" />
                        )}
                    </button>

                    {/* User Authentication */}
                    <div className='px-2 h-full items-center justify-center flex'>
                        {user !== null ? (
                            <>
                                <BiLogOut onClick={handleLogout} className='cursor-pointer text-3xl hover:text-red-500 transition-all duration-700' />
                                <p className='text-lg px-4 font-semibold'>{user?.name}</p>
                            </>
                        ) : (
                            <>
                                <Link href={'/auth/login'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4 transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600'>Login</Link>
                                <Link href={'/auth/register'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4 text-indigo-600 bg-white transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-white'>REGISTER</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

