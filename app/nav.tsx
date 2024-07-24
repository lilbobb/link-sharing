import { FC } from 'react';

interface NavbarProps {
  setActivePage: (page: 'home' | 'link' | 'profile') => void;
}

const Navbar: FC<NavbarProps> = ({ setActivePage }) => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <img
            src="/solar_link-circle.png"
            alt="Devlinks Icon"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-gray-900">devlinks</span>
        </div>

        <div className="flex items-center space-x-6">
          <button onClick={() => setActivePage('link')} className="flex items-center text-gray-700 hover:text-gray-900">
            <img
              src="/ph_link-bold.png"
              alt="Link Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Links
          </button>

          <button onClick={() => setActivePage('profile')} className="flex items-center text-gray-700 hover:text-gray-900">
            <img
              src="/ph_user-circle-bold.png"
              alt="User Icon"
              width={20}
              height={20}
            />
            <span className="text-gray-700">Profile Details</span>
          </button>
        </div>

        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Preview
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
