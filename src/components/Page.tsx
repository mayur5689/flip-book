import React from 'react';

interface PageProps {
  number: number;
}

const Page: React.FC<PageProps> = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  // For pages 1 and 2, display the corresponding images
  if (props.number === 1 || props.number === 2) {
    return (
      <div className="page" ref={ref} style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fff' }}>
        <div className="page-content" style={{ padding: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0'
          }}>
            <img 
              src={`/image/page${props.number}.jpg`}
              alt={`Page ${props.number} content`}
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // For other pages, use the default layout
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2>Page {props.number}</h2>
        <div className="page-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci assumenda beatae consequatur.</div>
      </div>
    </div>
  );
});

Page.displayName = 'Page';
export default Page; 