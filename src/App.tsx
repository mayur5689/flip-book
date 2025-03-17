import { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './components/Page';
import PageCover from './components/PageCover';
import './App.css';

function App() {
  const book = useRef<typeof HTMLFlipBook>(null);
  const [dimensions, setDimensions] = useState({ width: 1150, height: 1610 });

  useEffect(() => {
    const updateDimensions = () => {
      const baseWidth = 1150;
      const baseHeight = 1610;
      const aspectRatio = baseHeight / baseWidth;
      
      let width = Math.min(window.innerWidth * 0.8, baseWidth);
      let height = width * aspectRatio;

      if (height > window.innerHeight * 0.9) {
        height = window.innerHeight * 0.9;
        width = height / aspectRatio;
      }

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
          showCover={false}
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
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick={false}
        >
          <div className="page page-cover-top" data-density="hard">
            <img 
              src="/image/back00.jpg"
              alt="Front Cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          {Array.from({ length: 36 }, (_, i) => (
            <Page key={i + 1} number={i + 1} />
          ))}
          <PageCover type="back">THE END</PageCover>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default App;
