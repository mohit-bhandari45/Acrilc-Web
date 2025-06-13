'use client';

import Image from 'next/image';
import React from 'react';

const users = [
  { src: '/assets/avatar1.png', name: 'User 1' },
  { src: '/assets/avatar2.png', name: 'User 2' },
  { src: '/assets/avatar3.png', name: 'User 3' },
  { src: '/assets/avatar4.png', name: 'User 4' },
  { src: '/assets/avatar5.png', name: 'User 5' },
  { src: '/assets/avatar6.png', name: 'User 6' },
  { src: '/assets/avatar7.png', name: 'User 6' },
  { src: '/assets/avatar8.png', name: 'User 6' },

];

const UserAvatars = () => {
  return (
    <div className="flex space-x-3 py-4 overflow-x-auto scrollbar-hide">
      {users.map((user, index) => (
        <div key={index} className="flex-shrink-0">
          <Image
            src={user.src}
            alt={user.name}
            width={50}
            height={50}
            className="rounded-full object-cover border border-gray-300"
          />
        </div>
      ))}
    </div>
  );
};

export default UserAvatars;
