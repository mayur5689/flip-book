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
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Function to get audio file for current page spread
  const getAudioFile = (page: number) => {
    // Skip cover pages (first and last)
    if (page === 0 || page === totalPages - 1) return null;
    
    // Calculate which spread we're on (2 pages per spread)
    // We don't need to adjust page number since we want audio 1 to play on pages 1-2
    const audioNumber = Math.ceil((page) / 2);
    
    // Debug log to see the mapping
    console.log('Page:', page, 'Audio number:', audioNumber);
    
    // We have 18 audio files
    if (audioNumber >= 1 && audioNumber <= 18) {
      return `/audios/${audioNumber}.mp3`;
    }
    
    return null;
  };

  // Handle audio playback and auto-slide
  useEffect(() => {
    const audioFile = getAudioFile(currentPage);
    
    if (audioFile && !isAudioMuted) {
      // Create new audio element with preload
      const audio = new Audio(audioFile);
      audio.preload = 'auto';
      audioRef.current = audio;
      
      // When audio ends, immediately flip to next page
      audio.onended = () => {
        if (currentPage < totalPages - 1) {
          // Immediate page turn without delay
          if (book.current) {
            setCurrentPage(currentPage + 1);
            book.current.pageFlip().flipNext();
          }
        }
      };

      // Play audio immediately
      audio.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }

    // Cleanup function - important for preventing memory leaks
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current = null;
      }
    };
  }, [currentPage, isAudioMuted]);

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

  // Optimize page turning
  const nextPage = () => {
    // Immediately stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current = null;
    }

    if (currentPage === totalPages - 1) {
      setCurrentPage(0);
      if (book.current) {
        book.current.pageFlip().turnToPage(0);
      }
    } else if (currentPage < totalPages - 1) {
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

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    
    if (audioRef.current) {
      if (isAudioMuted) {
        // If currently muted, unmuting - start playing current page's audio
        const audioFile = getAudioFile(currentPage);
        if (audioFile) {
          const audio = new Audio(audioFile);
          audioRef.current = audio;
          audio.play().catch(error => {
            console.error("Audio play failed on unmute:", error);
          });
        }
      } else {
        // If currently playing, muting - stop audio
        audioRef.current.pause();
        audioRef.current = null;
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
      {/* Move audio control outside book container */}
      <button 
        className="audio-control" 
        onClick={toggleAudio}
        aria-label={isAudioMuted ? "Unmute audio" : "Mute audio"}
      >
        <i className={`fa-solid ${isAudioMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
      </button>

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
          flippingTime={600}
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
