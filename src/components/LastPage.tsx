import React from 'react';

interface LastPageProps {
  number: number;
}

const LastPage: React.FC<LastPageProps> = React.forwardRef<HTMLDivElement, LastPageProps>((props, ref) => {
  const isSecondPage = props.number % 2 === 0;
  
  return (
    <div className="page" ref={ref} style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fff' }}>
      <div className="page-content" style={{ padding: 0, height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
        {!isSecondPage ? (
          // Left page with the image
          <img 
            src={`/1.1/18.1.jpg`}
            alt="Author information"
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        ) : (
          // Right page with THE END text
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fafafa'
          }}>
            <h2 style={{
              fontSize: '3rem',
              color: '#4a3f35',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              THE END
            </h2>
          </div>
        )}
      </div>
    </div>
  );
});

LastPage.displayName = 'LastPage';
export default LastPage; 