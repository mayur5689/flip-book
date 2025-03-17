import React from 'react';

interface PageCoverProps {
  children: React.ReactNode;
}

const PageCover: React.FC<PageCoverProps> = React.forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

PageCover.displayName = 'PageCover';
export default PageCover; 