import React from "react";

const Navbar = () => {
    return(
    <nav className="fles justify-between bg-slate-700 text-white">
        <div className="logo">
            <span className="font-bold text-xl mx-8"></span>
        </div>

        <ul className="flex flex-row mx-6 gap-5">
            <li className="basis-1/8 text-">Home</li> 
        </ul>

    </nav>
    )
}

export default Navbar;