import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Volume2, 
  Maximize2,
  Film,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';

export function CinematicTimelinePlayer({ 
  shots, 
  activeShotIndex, 
  onSelectShot, 
  onOpenTheater 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = shots.reduce((acc, shot) => acc + parseFloat(shot.duration), 0);

  // Playback timer simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= totalDuration) {
            return 0; // loop
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalDuration]);

  // Synchronize active shot based on currentTime
  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < shots.length; i++) {
      const dur = parseFloat(shots[i].duration);
      if (currentTime >= accumulated && currentTime < accumulated + dur) {
        if (activeShotIndex !== i) {
          onSelectShot(i);
        }
        break;
      }
      accumulated += dur;
    }
  }, [currentTime, shots]);

  return (
    <div
      className="glass-panel"
      style={{
        height: 'var(--timeline-height)',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        left: '0',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(10, 12, 19, 0.94)'
      }}
    >
      {/* Top Timeline Transport Bar */}
      <div style={{
        height: '42px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        {/* Left: Playback Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setCurrentTime(0)}
            className="btn-icon"
            title="Return to Start"
          >
            <SkipBack size={14} />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary"
            style={{ width: '32px', height: '32px', padding: '0', borderRadius: '50%' }}
            title={isPlaying ? 'Pause' : 'Play Timeline'}
          >
            {isPlaying ? <Pause size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" style={{ marginLeft: '2px' }} />}
          </button>

          <button
            onClick={() => {
              const nextIndex = (activeShotIndex + 1) % shots.length;
              onSelectShot(nextIndex);
            }}
            className="btn-icon"
            title="Next Shot"
          >
            <SkipForward size={14} />
          </button>

          {/* Timecode display */}
          <div style={{
            marginLeft: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-primary)',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '3px 8px',
            borderRadius: '4px',
            border: '1px solid var(--border-subtle)'
          }}>
            00:00:{currentTime.toFixed(1).padStart(4, '0')} / 00:00:{totalDuration.toFixed(1).padStart(4, '0')}
          </div>

          <span className="badge badge-purple" style={{ fontSize: '10px' }}>24 FPS MASTER</span>
        </div>

        {/* Center: Sequence Metadata */}
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Film size={13} color="#8b5cf6" />
          <span>Timeline Coverage:</span>
          <strong style={{ color: 'var(--text-primary)' }}>{shots.length} Sequence Shots</strong>
        </div>

        {/* Right: Theater View Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenTheater}
            className="btn-ghost"
            style={{ fontSize: '11px', color: '#c4b5fd' }}
            title="Open Cinematic Fullscreen Theater View"
          >
            <Maximize2 size={13} />
            <span>Theater Screen</span>
          </button>
        </div>
      </div>

      {/* Shots Scrubber & Cards Track */}
      <div style={{
        flex: 1,
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflowX: 'auto',
        position: 'relative'
      }}>
        {shots.map((shot, index) => {
          const isSelected = activeShotIndex === index;
          return (
            <div
              key={shot.id}
              onClick={() => onSelectShot(index)}
              style={{
                width: '210px',
                height: '92px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                border: isSelected ? '2px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                boxShadow: isSelected ? '0 0 16px rgba(139, 92, 246, 0.5)' : 'none',
                transition: 'all 0.15s ease',
                flexShrink: 0
              }}
            >
              {/* Thumbnail image */}
              <img
                src={shot.thumbnail}
                alt={shot.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isSelected ? 'brightness(1)' : 'brightness(0.7)'
                }}
              />

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
              }} />

              {/* Shot Details Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '6px',
                left: '8px',
                right: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {shot.name}
                </div>
                <div style={{
                  fontSize: '9px',
                  color: '#94a3b8',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>{shot.focalLength}</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{shot.continuityScore}</span>
                </div>
              </div>

              {/* Top Badge: Duration */}
              <div style={{
                position: 'absolute',
                top: '6px',
                left: '6px',
                background: 'rgba(0,0,0,0.7)',
                padding: '1px 5px',
                borderRadius: '4px',
                fontSize: '9px',
                fontFamily: 'var(--font-mono)',
                color: '#f8fafc'
              }}>
                {shot.duration}
              </div>

              {/* Active Marker */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent-purple)',
                  boxShadow: '0 0 8px var(--accent-purple)'
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
