import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Camera, 
  Sparkles,
  Film
} from 'lucide-react';

export function TheaterPreviewModal({ isOpen, onClose, shots, activeShotIndex }) {
  const [currentIndex, setCurrentIndex] = useState(activeShotIndex || 0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setCurrentIndex(activeShotIndex || 0);
  }, [activeShotIndex, isOpen]);

  // Sequence auto-advancer
  useEffect(() => {
    let timer;
    if (isPlaying && isOpen) {
      const currentShot = shots[currentIndex] || shots[0];
      const durationMs = parseFloat(currentShot.duration) * 1000;
      
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % shots.length);
      }, durationMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, isOpen, currentIndex, shots]);

  if (!isOpen) return null;

  const currentShot = shots[currentIndex] || shots[0];

  return (
    <div 
      className="modal-backdrop" 
      style={{ background: 'rgba(0, 0, 0, 0.94)', padding: '0' }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Top Floating Control Bar */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pingSlow 1.5s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                DIRECTOR PREVIEW (2.39:1 CINEMASCOPE)
              </span>
            </div>

            <span className="badge badge-purple" style={{ fontSize: '11px', padding: '4px 10px' }}>
              {currentShot.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,0.7)', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cinematic CinemaScope Screen with Anamorphic Letterbox */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Letterbox Bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10vh',
            background: '#000000',
            zIndex: 20
          }} />

          {/* Film Frame Display */}
          <div style={{
            width: '85vw',
            maxWidth: '1440px',
            aspectRatio: '2.39/1',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 0 100px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 92, 246, 0.25)'
          }}>
            <img
              src={currentShot.thumbnail}
              alt={currentShot.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.03)',
                transition: 'transform 4s ease-out',
                animation: isPlaying ? 'slowZoom 8s ease-in-out infinite alternate' : 'none'
              }}
            />

            {/* Director HUD Overlays */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ color: '#06b6d4' }}>RIG: {currentShot.camera}</div>
              <div style={{ color: '#f59e0b' }}>LENS: {currentShot.focalLength}</div>
              <div style={{ color: '#10b981' }}>CONTINUITY: {currentShot.continuityScore}</div>
            </div>

            {/* Crosshair Center Anchor */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '24px',
              height: '24px',
              pointerEvents: 'none',
              opacity: 0.25
            }}>
              <div style={{ position: 'absolute', top: '11px', left: 0, right: 0, height: '1px', background: '#ffffff' }} />
              <div style={{ position: 'absolute', left: '11px', top: 0, bottom: 0, width: '1px', background: '#ffffff' }} />
            </div>
          </div>

          {/* Bottom Letterbox Bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '10vh',
            background: '#000000',
            zIndex: 20
          }} />
        </div>

        {/* Bottom Playback HUD */}
        <div style={{
          height: '80px',
          background: 'rgba(10, 12, 18, 0.95)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '0 30px',
          zIndex: 30
        }}>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? shots.length - 1 : prev - 1))}
            className="btn-icon"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary"
            style={{ width: '42px', height: '42px', borderRadius: '50%', padding: 0 }}
          >
            {isPlaying ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" style={{ marginLeft: '2px' }} />}
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % shots.length)}
            className="btn-icon"
          >
            <SkipForward size={16} />
          </button>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 8px' }} />

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="btn-icon"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            Shot {currentIndex + 1} of {shots.length} ({currentShot.duration})
          </div>
        </div>
      </div>
    </div>
  );
}
