import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';

export function CinematicMotionPlayer({ 
  imageSrc, 
  title, 
  cameraMotion = 'Dolly In',
  focalLength = '35mm',
  aspectRatio = '2.39/1',
  isPlaying = true,
  onTogglePlay,
  height = '100%',
  showControls = true,
  isRendering = false,
  renderProgress = 100
}) {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [internalPlaying, setInternalPlaying] = useState(isPlaying);
  const [isMuted, setIsMuted] = useState(true);
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);

  // Sync external playing state
  useEffect(() => {
    setInternalPlaying(isPlaying);
  }, [isPlaying]);

  // Ambient Web Audio Synthesizer (Rain & Noir Drone)
  const toggleAudio = (e) => {
    e?.stopPropagation();
    if (isMuted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;

          // Pink Noise buffer for Rain
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 850;

          const gainNode = ctx.createGain();
          gainNode.gain.value = 0.25;

          whiteNoise.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          whiteNoise.start(0);

          // Sub Drone Oscillator
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = 55; // 55Hz A1 cinematic bass drone
          const oscGain = ctx.createGain();
          oscGain.gain.value = 0.05;
          osc.connect(oscGain);
          oscGain.connect(ctx.destination);
          osc.start(0);
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        setIsMuted(false);
      } catch (err) {
        console.warn('Audio autoplay blocked', err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsMuted(true);
    }
  };

  // Canvas Video Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imageSrc;
    let imgLoaded = false;
    img.onload = () => {
      imgLoaded = true;
    };

    // Rain particles
    const rainCount = 70;
    const rainParticles = Array.from({ length: rainCount }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 500,
      len: 15 + Math.random() * 25,
      speed: 12 + Math.random() * 15,
      opacity: 0.15 + Math.random() * 0.4
    }));

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (imgLoaded) {
        ctx.save();

        if (internalPlaying) {
          timeRef.current += 0.015;
        }
        const t = timeRef.current;

        // Cinematic Camera Motion: Ken Burns Dolly + Parallax
        const zoom = 1.05 + Math.sin(t * 0.5) * 0.04;
        const panX = Math.cos(t * 0.4) * 8;
        const panY = Math.sin(t * 0.3) * 4;

        ctx.translate(width / 2, height / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-width / 2 + panX, -height / 2 + panY);

        // Draw Base Image
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();

        // Neon Glow Flicker effect
        const neonPulse = Math.sin(t * 2.5) * 0.08 + 0.08;
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, `rgba(6, 182, 212, ${neonPulse * 0.7})`);
        grad.addColorStop(0.5, 'transparent');
        grad.addColorStop(1, `rgba(236, 72, 153, ${neonPulse * 0.6})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Anamorphic Cyan Streak Sweep
        const streakX = (Math.sin(t * 0.7) * 0.5 + 0.5) * width;
        const streakGrad = ctx.createRadialGradient(streakX, height * 0.35, 10, streakX, height * 0.35, 300);
        streakGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
        streakGrad.addColorStop(0.2, 'rgba(6, 182, 212, 0.08)');
        streakGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = streakGrad;
        ctx.fillRect(0, 0, width, height);

        // Animated Rain Streaks on Camera Lens
        if (internalPlaying) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          rainParticles.forEach((p) => {
            p.y += p.speed;
            p.x -= 2.5; // wind slant
            if (p.y > height) {
              p.y = -20;
              p.x = Math.random() * (width + 50);
            }
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - 4, p.y + p.len);
          });
          ctx.stroke();
        }

        // 35mm Organic Film Grain Noise
        const noiseCount = 1500;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        for (let i = 0; i < noiseCount; i++) {
          const rx = Math.random() * width;
          const ry = Math.random() * height;
          ctx.fillRect(rx, ry, 1.2, 1.2);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imageSrc, internalPlaying]);

  return (
    <div style={{
      width: '100%',
      height: height,
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      background: '#05070a',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)'
    }}>
      <canvas
        ref={canvasRef}
        width={768}
        height={322}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />

      {/* Rendering State Overlay */}
      {isRendering && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 7, 10, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 20
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(139, 92, 246, 0.2)',
            borderTopColor: '#8b5cf6',
            animation: 'spin 0.8s linear infinite'
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
              DIFFUSION ENGINE SYNTHESIZING VIDEO...
            </div>
            <div style={{ fontSize: '10px', color: '#c4b5fd', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
              Step {Math.round((renderProgress / 100) * 35)} / 35 • Denoising 35mm Motion Vectors
            </div>
          </div>
          <div style={{
            width: '180px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${renderProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #10b981)',
              transition: 'width 0.2s ease'
            }} />
          </div>
        </div>
      )}

      {/* HUD Badges */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 10
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          padding: '2px 7px',
          borderRadius: '4px',
          fontSize: '9px',
          color: internalPlaying ? '#10b981' : '#f59e0b',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: internalPlaying ? '#10b981' : '#f59e0b',
            boxShadow: internalPlaying ? '0 0 6px #10b981' : 'none'
          }} />
          {internalPlaying ? 'LIVE MOTION (24 FPS)' : 'PAUSED'}
        </div>

        <span className="badge badge-purple" style={{ fontSize: '9px' }}>
          {focalLength}
        </span>
      </div>

      {/* Quick Play & Audio Controls Overlay */}
      {showControls && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          right: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const next = !internalPlaying;
                setInternalPlaying(next);
                onTogglePlay?.(next);
              }}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={internalPlaying ? 'Pause Video' : 'Play Motion Video'}
            >
              {internalPlaying ? <Pause size={12} fill="#ffffff" /> : <Play size={12} fill="#ffffff" style={{ marginLeft: '1px' }} />}
            </button>

            <button
              onClick={toggleAudio}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: isMuted ? 'var(--text-muted)' : '#06b6d4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isMuted ? 'Enable Cinematic Ambient Sound FX' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
          </div>

          <div style={{
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            color: '#ffffff',
            background: 'rgba(0, 0, 0, 0.75)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            {cameraMotion}
          </div>
        </div>
      )}
    </div>
  );
}
