import React from 'react';

interface PageCoverProps {
  children?: React.ReactNode;
  type?: 'front' | 'back';
}

const PageCover: React.FC<PageCoverProps> = React.forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  const backgroundImage = props.type === 'back' ? '/image/back01.jpg' : '/image/back00.jpg';
  
  return (
    <div 
      className="page page-cover" 
      ref={ref} 
      data-density="hard"
    >
      <img 
        src={backgroundImage}
        alt={props.type === 'back' ? 'Back Cover' : 'Front Cover'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      <div className="page-content" style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
        <h2 style={{ color: '#4a3f35', textShadow: '2px 2px 4px rgba(255,255,255,0.7)' }}>{props.children}</h2>
      </div>
    </div>
  );
});

PageCover.displayName = 'PageCover';
export default PageCover; 