import React from 'react';

interface PageProps {
  number: number;
}

const Page: React.FC<PageProps> = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
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