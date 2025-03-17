import React from 'react';

interface PageCoverProps {
  children: React.ReactNode;
  type?: 'front' | 'back';
}

const PageCover: React.FC<PageCoverProps> = React.forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  const backgroundImage = props.type === 'back' ? '/image/back01.jpg' : '/image/back00.jpg';
  
  return (
    <div 
      className="page page-cover" 
      ref={ref} 
      data-density="hard"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'transparent'
      }}
    >
      <div className="page-content">
        <h2 style={{ color: '#4a3f35' }}>{props.children}</h2>
      </div>
    </div>
  );
});

PageCover.displayName = 'PageCover';
export default PageCover; 