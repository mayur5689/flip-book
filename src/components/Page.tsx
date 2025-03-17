import React from 'react';

interface PageProps {
  number: number;
}

const Page: React.FC<PageProps> = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const getImagePath = (pageNumber: number) => {
    if (pageNumber <= 2) {
      return `/image/page${pageNumber}.jpg`;
    } else {
      // Calculate the divided folder image number
      // For page 3 we want 2.1.jpg, for page 4 we want 2.2.jpg, etc.
      const dividedNumber = Math.floor((pageNumber + 1) / 2);
      const isSecondImage = pageNumber % 2 === 0;
      return `/divided/${Math.floor(dividedNumber - 0.5)}.${isSecondImage ? '2' : '1'}.jpg`;
    }
  };

  return (
    <div className="page" ref={ref} style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fff' }}>
      <div className="page-content" style={{ padding: 0, height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <img 
          src={getImagePath(props.number)}
          alt={`Page ${props.number} content`}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
});

Page.displayName = 'Page';
export default Page; 