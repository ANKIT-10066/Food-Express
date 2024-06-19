import React from 'react';

function ReviewCard({ photo, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4">
      <img src={photo} alt="Review" className=" w-52  object-cover mb-4" />
      <p className="text-center">{description}</p>
    </div>
  );
}

export default ReviewCard;
