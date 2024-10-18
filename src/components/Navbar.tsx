import React from 'react'
import { FaFantasyFlightGames } from 'react-icons/fa';
import { ModeToggle } from './Themetoggle';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 glass-bg top-0 w-full h-16 fixed border-b border-[#b4b3b3]">
      <div>
        <FaFantasyFlightGames className='text-4xl' />
      </div>
    </nav>
  );
}

export default Navbar