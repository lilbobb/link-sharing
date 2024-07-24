"use client";

import { FC, useState } from 'react';
import { FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa';

interface Link {
  id: string;
  url: string;
  description: string;
  type: 'GitHub' | 'YouTube' | 'LinkedIn';
}

const initialLinks: Link[] = [
]

const LinkCard: FC = () => {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [newLink, setNewLink] = useState<{ url: string; description: string; type: 'GitHub' | 'YouTube' | 'LinkedIn' }>({ url: '', description: '', type: 'GitHub' });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddLink = () => {
    if (newLink.url && newLink.description) {
      setLinks([...links, { id: Date.now().toString(), ...newLink }]);
      setNewLink({ url: '', description: '', type: 'GitHub' });
      setIsFormVisible(false); 
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleEditLink = (id: string) => {
    const linkToEdit = links.find(link => link.id === id);
    if (linkToEdit) {
      setNewLink({ url: linkToEdit.url, description: linkToEdit.description, type: linkToEdit.type });
      setIsFormVisible(true);
      handleRemoveLink(id);
    }
  };

  const renderIcon = (type: 'GitHub' | 'YouTube' | 'LinkedIn') => {
    switch (type) {
      case 'GitHub':
        return <FaGithub className="text-gray-700" />;
      case 'YouTube':
        return <FaYoutube className="text-red-600" />;
      case 'LinkedIn':
        return <FaLinkedin className="text-blue-700" />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-2xl font-bold mb-6">Customize Your Links</h1>

        <div className="flex space-x-6 mb-8">
          <div className="flex flex-col space-y-4">
            {links.map(link => (
              <div key={link.id} className="flex items-center p-4 border border-gray-200 rounded-lg shadow-md w-full max-w-sm">
                <div className="flex-1 flex items-center space-x-4">
                  {renderIcon(link.type)}
                  <div>
                    <a href={link.url} className="text-blue-600 hover:underline">{link.url}</a>
                    <p>{link.description}</p>
                  </div>
                </div>
                <button onClick={() => handleEditLink(link.id)} className="text-blue-600 hover:underline ml-4">
                  Edit
                </button>
                <button onClick={() => handleRemoveLink(link.id)} className="text-red-600 hover:underline ml-4">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-4 ml-8 w-full max-w-md">
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isFormVisible ? 'Cancel' : 'Add New Link'}
            </button>

            {isFormVisible && (
              <div className="flex flex-col space-y-4 mt-4">
                <select
                  value={newLink.type}
                  onChange={(e) => setNewLink({ ...newLink, type: e.target.value as 'GitHub' | 'YouTube' | 'LinkedIn' })}
                  className="mb-4 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="GitHub">GitHub</option>
                  <option value="YouTube">YouTube</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
                <input
                  type="text"
                  placeholder="Link URL"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="mb-4 p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newLink.description}
                  onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                  className="mb-4 p-2 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAddLink} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default LinkCard;
