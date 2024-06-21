// eslint-disable-next-line no-unused-vars
import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-4 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
        <div className="bg-white rounded-full">
          <div className="w-24 h-24 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
