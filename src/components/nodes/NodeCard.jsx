import React from 'react';
import { CinematicMotionPlayer } from '../video/CinematicMotionPlayer';
import { 
  NODE_TYPES_CONFIG 
} from '../../data/mockData';
import { 
  Sparkles, 
  Trash2, 
  Camera, 
  UserCheck, 
  Clapperboard, 
  SunMedium, 
  Wind, 
  Maximize2, 
  Video,
  Lock,
  Eye,
  Sliders
} from 'lucide-react';

const ICON_MAP = {
  script_scene: Clapperboard,
  character_anchor: UserCheck,
  camera_optics: Camera,
  lighting_grade: SunMedium,
  motion_dynamics: Wind,
  magnific_enhancer: Sparkles,
  render_output: Video
};

export function NodeCard({ 
  node, 
  isSelected, 
  onSelect, 
  onUpdateData, 
  onDelete, 
  onStartConnect, 
  isRunning 
}) {
  const config = NODE_TYPES_CONFIG[node.type] || {
    label: node.title,
    color: '#8b5cf6',
    badge: 'badge-purple'
  };

  const IconComponent = ICON_MAP[node.type] || Sparkles;

  const handleChange = (key, value) => {
    onUpdateData(node.id, { [key]: value });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      className="glass-card"
      style={{
        width: '320px',
        position: 'relative',
        boxShadow: isSelected 
          ? `0 0 0 2px ${config.color}, 0 16px 40px rgba(0,0,0,0.7)` 
          : '0 8px 30px rgba(0, 0, 0, 0.5)',
        border: isSelected ? `1px solid ${config.color}` : '1px solid var(--border-subtle)',
        borderRadius: '12px',
        overflow: 'visible',
        transition: 'box-shadow 0.15s ease, border-color 0.15s ease'
      }}
    >
      {/* Input Socket on Left */}
      {node.type !== 'script_scene' && (
        <div
          data-node-id={node.id}
          data-socket-type="in"
          className="node-socket socket-cyan"
          style={{
            left: '-7px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: config.color,
            boxShadow: `0 0 8px ${config.color}`
          }}
          title="Input connection"
        />
      )}

      {/* Output Socket on Right */}
      {node.type !== 'render_output' && (
        <div
          data-node-id={node.id}
          data-socket-type="out"
          onMouseDown={(e) => {
            e.stopPropagation();
            onStartConnect(node.id, 'out', e);
          }}
          className="node-socket socket-purple"
          style={{
            right: '-7px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: config.color,
            boxShadow: `0 0 8px ${config.color}`
          }}
          title="Drag to connect downstream node"
        />
      )}

      {/* Node Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.02)',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            background: `${config.color}25`,
            border: `1px solid ${config.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IconComponent size={13} color={config.color} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {node.title}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {config.label}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isRunning && (
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981',
              animation: 'pingSlow 1.5s infinite'
            }} />
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            className="btn-ghost"
            style={{ padding: '4px', color: 'var(--text-dim)' }}
            title="Delete node"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Node Body Content */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Type 1: Script Scene Node */}
        {node.type === 'script_scene' && (
          <>
            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Slugline / Location
              </label>
              <input
                type="text"
                value={node.data.slugline || ''}
                onChange={(e) => handleChange('slugline', e.target.value)}
                style={{ width: '100%', marginTop: '3px', fontWeight: 600, color: '#c4b5fd' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Scene Narrative Prompt
              </label>
              <textarea
                rows={3}
                value={node.data.prompt || ''}
                onChange={(e) => handleChange('prompt', e.target.value)}
                style={{ width: '100%', marginTop: '3px', fontSize: '11px', resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Mood</label>
                <input
                  type="text"
                  value={node.data.mood || ''}
                  onChange={(e) => handleChange('mood', e.target.value)}
                  style={{ width: '100%', marginTop: '2px', fontSize: '11px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Pacing</label>
                <input
                  type="text"
                  value={node.data.pacing || ''}
                  onChange={(e) => handleChange('pacing', e.target.value)}
                  style={{ width: '100%', marginTop: '2px', fontSize: '11px' }}
                />
              </div>
            </div>
          </>
        )}

        {/* Type 2: Character Anchor (Continuity Lock) */}
        {node.type === 'character_anchor' && (
          <>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                position: 'relative',
                flexShrink: 0
              }}>
                <img 
                  src={node.data.image} 
                  alt={node.data.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '3px',
                  padding: '1px 3px',
                  fontSize: '8px',
                  color: '#67e8f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}>
                  <Lock size={8} /> LOCK
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {node.data.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-cyan)', marginTop: '1px' }}>
                  LoRA: {node.data.loraModel}
                </div>
                <div style={{ 
                  marginTop: '4px',
                  fontSize: '10px', 
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {node.data.wardrobeLock}
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
                <span>Identity Consistency Weight</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{node.data.identityWeight}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={node.data.identityWeight || 95}
                onChange={(e) => handleChange('identityWeight', parseInt(e.target.value))}
                style={{ marginTop: '4px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Wardrobe Token Lock</label>
              <input
                type="text"
                value={node.data.wardrobeLock || ''}
                onChange={(e) => handleChange('wardrobeLock', e.target.value)}
                style={{ width: '100%', marginTop: '3px', fontSize: '11px' }}
              />
            </div>
          </>
        )}

        {/* Type 3: Camera Optics */}
        {node.type === 'camera_optics' && (
          <>
            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Focal Length & Lens</label>
              <select
                value={node.data.focalLength || '35mm Anamorphic T1.9'}
                onChange={(e) => handleChange('focalLength', e.target.value)}
                style={{ width: '100%', marginTop: '3px' }}
              >
                <option value="18mm Ultra-Wide Cine">18mm Ultra-Wide Cine (Establishing)</option>
                <option value="24mm Wide Prime">24mm Wide Prime (Environmental)</option>
                <option value="35mm Anamorphic T1.9">35mm Anamorphic T1.9 (Cinematic)</option>
                <option value="50mm f/1.2 Standard">50mm f/1.2 Standard (Natural Eyesight)</option>
                <option value="85mm T2.0 Prime">85mm T2.0 Prime (Intimate Portrait)</option>
                <option value="100mm Macro Cine">100mm Macro Cine (Extreme Detail)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Shot Framing</label>
                <input
                  type="text"
                  value={node.data.shotType || ''}
                  onChange={(e) => handleChange('shotType', e.target.value)}
                  style={{ width: '100%', marginTop: '2px', fontSize: '11px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Aperture / DOF</label>
                <input
                  type="text"
                  value={node.data.dof || ''}
                  onChange={(e) => handleChange('dof', e.target.value)}
                  style={{ width: '100%', marginTop: '2px', fontSize: '11px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Camera Movement</label>
              <input
                type="text"
                value={node.data.cameraMotion || ''}
                onChange={(e) => handleChange('cameraMotion', e.target.value)}
                style={{ width: '100%', marginTop: '3px', fontSize: '11px' }}
              />
            </div>
          </>
        )}

        {/* Type 4: Lighting & Grade */}
        {node.type === 'lighting_grade' && (
          <>
            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Film Stock / Palette</label>
              <select
                value={node.data.preset || 'Kodak Vision3 500T'}
                onChange={(e) => handleChange('preset', e.target.value)}
                style={{ width: '100%', marginTop: '3px' }}
              >
                <option value="Kodak Vision3 500T / Neon Noir">Kodak Vision3 500T (Organic Grain)</option>
                <option value="Fujifilm Eterna / Golden Glow">Fujifilm Eterna (Warm Radiance)</option>
                <option value="Neo-Tokyo Cyberpunk Bleed">Neo-Tokyo Cyberpunk (Magenta/Cyan)</option>
                <option value="Nordic Winter Chiaroscuro">Nordic Winter (Desaturated Blue)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
                  <span>35mm Grain</span>
                  <span style={{ color: '#f472b6' }}>{node.data.grain}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={node.data.grain || 50}
                  onChange={(e) => handleChange('grain', parseInt(e.target.value))}
                  style={{ marginTop: '4px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
                  <span>Halation</span>
                  <span style={{ color: '#f472b6' }}>{node.data.halation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={node.data.halation || 30}
                  onChange={(e) => handleChange('halation', parseInt(e.target.value))}
                  style={{ marginTop: '4px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Key / Fill Lighting Ratio</label>
              <input
                type="text"
                value={node.data.keyLight || ''}
                onChange={(e) => handleChange('keyLight', e.target.value)}
                style={{ width: '100%', marginTop: '3px', fontSize: '11px' }}
              />
            </div>
          </>
        )}

        {/* Type 5: Motion Dynamics */}
        {node.type === 'motion_dynamics' && (
          <>
            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Atmospheric Particles</label>
              <input
                type="text"
                value={node.data.particles || ''}
                onChange={(e) => handleChange('particles', e.target.value)}
                style={{ width: '100%', marginTop: '3px', fontSize: '11px' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
                <span>Motion Intensity</span>
                <span style={{ color: 'var(--accent-blue)' }}>{node.data.motionIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={node.data.motionIntensity || 45}
                onChange={(e) => handleChange('motionIntensity', parseInt(e.target.value))}
                style={{ marginTop: '4px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span>Temporal Coherence:</span>
              <span style={{ color: '#60a5fa', fontWeight: 600 }}>{node.data.temporalStability || 90}%</span>
            </div>
          </>
        )}

        {/* Type 6: Magnific Enhancer */}
        {node.type === 'magnific_enhancer' && (
          <>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scale Factor:</span>
              <span className="badge badge-emerald">{node.data.upscaleFactor}</span>
              <span className="badge badge-cyan" style={{ marginLeft: 'auto' }}>HDR Relight ON</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
                <span>Hallucination / Creativity</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{node.data.creativity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={node.data.creativity || 35}
                onChange={(e) => handleChange('creativity', parseInt(e.target.value))}
                style={{ marginTop: '4px' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
                <span>Structural Resemblance</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{node.data.resemblance}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={node.data.resemblance || 88}
                onChange={(e) => handleChange('resemblance', parseInt(e.target.value))}
                style={{ marginTop: '4px' }}
              />
            </div>
          </>
        )}

        {/* Type 7: Master Render Output with Live Motion Video */}
        {node.type === 'render_output' && (
          <>
            <CinematicMotionPlayer
              imageSrc={node.data.previewImage}
              title={node.title}
              cameraMotion={node.data.cameraMotion || 'Dolly In + Parallax'}
              focalLength="35mm Cine"
              height="150px"
              isPlaying={true}
              isRendering={isRunning}
              renderProgress={node.data.renderProgress || 100}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Format:</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {node.data.format}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Aspect Ratio:</span>
              <span className="badge badge-amber" style={{ fontSize: '10px' }}>
                {node.data.resolution.split(' ')[2] || '2.39:1'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Node Footer Info */}
      <div style={{
        padding: '6px 14px',
        background: 'rgba(0, 0, 0, 0.25)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '9px',
        color: 'var(--text-dim)'
      }}>
        <span>ID: {node.id}</span>
        <span style={{ color: config.color }}>● {config.category}</span>
      </div>
    </div>
  );
}
