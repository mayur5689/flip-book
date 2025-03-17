import React from 'react';

interface PageProps {
  number: number;
}

const Page: React.FC<PageProps> = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const getImagePath = (pageNumber: number) => {
    // Calculate the image number and whether it's first or second page
    const imageNumber = Math.ceil(pageNumber / 2);
    const isSecondImage = pageNumber % 2 === 0;
    return `/1.1/${imageNumber}.${isSecondImage ? '2' : '1'}.jpg`;
  };

  return (
    <div className="page" ref={ref} style={{ 
      position: 'relative', 
      overflow: 'hidden', // Prevent scroll
      backgroundColor: '#fff',
      height: '100%',
      maxHeight: '100%', // Ensure it doesn't exceed container
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="page-content" style={{ 
        padding: 0, 
        height: '100%',
        maxHeight: '100%', // Ensure content doesn't exceed
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative',
        overflow: 'hidden', // Prevent scroll
        flexGrow: 1
      }}>
        <img 
          src={getImagePath(props.number)}
          alt={`Page ${props.number} content`}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            userSelect: 'none' // Prevent text selection which can cause scroll
          }}
        />
      </div>
    </div>
  );
});

Page.displayName = 'Page';
export default Page; 