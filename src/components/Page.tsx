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