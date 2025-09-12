import React from 'react';

interface InlineTextImagesProps {
  text: string;
  images: { [key: string]: string };
  className?: string;
}

const InlineTextImages: React.FC<InlineTextImagesProps> = ({ 
  text, 
  images, 
  className = '' 
}) => {
  const processText = (inputText: string) => {
    const parts = inputText.split('*');
    
    return parts.map((part, index) => {
      if (index % 2 === 1 && images[part]) {
        return (
          <img
            key={index}
            src={images[part]}
            alt={part}
            className="inline-block w-8 h-8 mx-2 rounded-full object-cover align-middle"
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={className}>
      {processText(text)}
    </div>
  );
};

export default InlineTextImages;