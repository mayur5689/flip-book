import React from 'react';

interface PageProps {
  number: number;
}

const Page: React.FC<PageProps> = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  // For pages 1 and 2, display the corresponding images
  if (props.number === 1 || props.number === 2) {
    return (
      <div className="page" ref={ref}>
        <div className="page-content" style={{ padding: '20px' }}>
          <h2 style={{ 
            textAlign: 'left', 
            margin: '0 0 15px 0',
            color: '#8B6B35',
            fontWeight: 'normal'
          }}>
            Page {props.number}
          </h2>
          
          {props.number === 1 ? (
            <div style={{ 
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <img 
                src="/image/page1.jpg" 
                alt="Family in forest"
                style={{ 
                  maxWidth: '80%',
                  height: 'auto',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                padding: '0 10px',
                fontSize: '0.8rem',
                color: '#555',
                marginBottom: '10px'
              }}>
                The family was there, amid a lush forest clearing. They played with their parents and explored the area joyfully together. Birds chirped overhead, small creatures rustled in the foliage as if in silent approval of their reunion, a gentle smile spread across all their faces.
              </div>
              <div style={{ 
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <img 
                  src="/image/page2.jpg" 
                  alt="Forest scene"
                  style={{ 
                    maxWidth: '80%',
                    height: 'auto',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            </div>
          )}
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