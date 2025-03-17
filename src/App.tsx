import { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './components/Page';
import PageCover from './components/PageCover';
import './App.css';

interface PageFlip {
  pageFlip: () => {
    flip: (page: number) => void;
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
  };
}

function App() {
  const book = useRef<PageFlip>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 38; // Total number of pages including covers
  const [dimensions, setDimensions] = useState({ width: 1150, height: 1610 });

  // Function to get audio file for current page spread
  const getAudioFile = (page: number) => {
    // Skip cover page
    if (page === 0) return null;
    
    // Calculate which spread we're on (2 pages per spread)
    const spread = Math.ceil(page / 2);
    
    // We have 6 audio files for now
    if (spread >= 1 && spread <= 6) {
      return `/audio/${spread}.mpeg`;
    }
    
    return null;
  };

  // Handle audio playback and auto-slide
  useEffect(() => {
    const audioFile = getAudioFile(currentPage);
    
    if (audioFile) {
      // Create new audio element
      const audio = new Audio(audioFile);
      audioRef.current = audio;
      
      // Play audio
      audio.play();
      
      // When audio ends, go to next page
      audio.onended = () => {
        if (currentPage < totalPages - 1) {
          nextPage();
        }
      };
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current = null;
      }
    };
  }, [currentPage]);

  // Add page change handler
  const handlePageChange = (page: number) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }
    
    setCurrentPage(page);
    if (book.current) {
      book.current.pageFlip().flip(page);
    }
  };

  const nextPage = () => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    if (currentPage === totalPages - 1) {
      // If we're on the last page, go back to the front cover (page 0)
      setCurrentPage(0);
      if (book.current) {
        // Force flip to the first page (front cover)
        book.current.pageFlip().turnToPage(0);
      }
    } else if (currentPage < totalPages - 1) {
      // Normal next page behavior
      setCurrentPage(currentPage + 1);
      if (book.current) {
        book.current.pageFlip().flipNext();
      }
    }
  };

  const prevPage = () => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (book.current) {
        book.current.pageFlip().flipPrev();
      }
    }
  };

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
        {/* Previous Button */}
        <button 
          className="nav-button prev-button" 
          onClick={prevPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

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
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick={false}
          onFlip={(e) => setCurrentPage(e.data)}
        >
          <PageCover type="front"></PageCover>
          {Array.from({ length: 36 }, (_, i) => (
            <Page key={i + 1} number={i + 1} />
          ))}
          <div className="page hard">
            <div className="page-content" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <h2 style={{
                fontSize: '3rem',
                color: '#4a3f35',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}>THE END</h2>
            </div>
          </div>
          <PageCover type="back"></PageCover>
        </HTMLFlipBook>

        {/* Next Button */}
        <button 
          className="nav-button next-button" 
          onClick={nextPage}
          aria-label="Next page"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`carousel-dot ${currentPage === i ? 'active' : ''}`}
              onClick={() => handlePageChange(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
