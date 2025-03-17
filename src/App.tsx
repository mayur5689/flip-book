import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './components/Page';
import PageCover from './components/PageCover';
import './App.css';

function App() {
  const book = useRef<typeof HTMLFlipBook>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 700 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth * 0.2, 250);
      const height = Math.min(window.innerHeight * 0.4, 350);
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="container">
      <div className="book-container">
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={dimensions.width}
          maxWidth={dimensions.width}
          minHeight={dimensions.height}
          maxHeight={dimensions.height}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          ref={book}
          className="flip-book"
          style={{ margin: '0 auto' }}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={0}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          <PageCover>BOOK TITLE</PageCover>
          <Page number={1} />
          <Page number={2} />
          <Page number={3} />
          <Page number={4} />
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default App;
