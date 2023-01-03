import React from 'react';

const Footer = () => {
    return (
        <div className='text-center bg-slate-500 h-auto py-1 text-yellow-50 h-10 absolute w-full bottom-0 z-10'>
            <span className=''>{new Date().getFullYear()} @ Binar Academy C12 - 2022</span>
        </div>
    );
};

export default Footer;
