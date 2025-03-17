import React from 'react';

interface PageProps {
  number: number;
}

const Page: React.FC<PageProps> = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  // For pages 1 and 2, display the corresponding images
  if (props.number === 1 || props.number === 2) {
    return (
      <div className="page" ref={ref}>
        <div className="page-content">
          <h2>Page {props.number}</h2>
          <div 
            className="page-image"
            style={{ 
              backgroundImage: `url('/image/page${props.number}.jpg')`,
              height: '80%'
            }}
          ></div>
          <div className="page-footer">{props.number + 1}</div>
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
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

Page.displayName = 'Page';
export default Page; 