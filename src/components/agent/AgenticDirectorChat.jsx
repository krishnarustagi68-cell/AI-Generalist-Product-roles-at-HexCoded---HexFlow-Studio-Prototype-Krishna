import React, { useState, useRef, useEffect } from 'react';
import { QUICK_DIRECTOR_PROMPTS } from '../../data/mockData';
import { 
  Sparkles, 
  Send, 
  Bot, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Film,
  Camera,
  Compass,
  AlertCircle
} from 'lucide-react';

export function AgenticDirectorChat({ 
  isOpen, 
  onToggle, 
  onExecuteAgentAction, 
  nodes, 
  currentTemplate 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'agent',
      text: "I'm your DP & Co-Director engine. I don't just generate prompts—I enforce cinematic coverage, 180° eyeline continuity, key-to-fill lighting ratios, and focal length compression across your scene graph. Tell me what scene you're directing, or ask me to restructure the coverage.",
      actionsTaken: null,
      dpNotes: 'Current Camera Axis: 35mm Anamorphic T1.9 • Kodak 500T Stock • Chiaroscuro 4:1',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = (textToSend = inputText) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      let agentResponseText = '';
      let actions = [];
      let dpNotes = '';

      const lower = query.toLowerCase();

      if (lower.includes('85mm') || lower.includes('close-up') || lower.includes('portrait')) {
        agentResponseText = "Switching optics to an 85mm T2.0 Prime. Cinematographic Rationale: Cutting from the wide establishing shot to an 85mm compresses the background neon signage while generating an intimate f/1.4 creamy bokeh. This forces the viewer's psychological focus onto the actor's gaze. I've preserved the 180-degree axis so the eyeline stays locked toward the diner counter.";
        dpNotes = "Coverage: Intimate Medium Close-Up • Bokeh: Elliptical Anamorphic • Eyeline: Left-to-Right Verified";
        actions = [
          'Evaluated spatial geometry relative to Shot 1',
          'Swapped lens rig -> 85mm T2.0 Prime (f/1.4 DOF)',
          'Recalibrated depth-of-field blur profile',
          'Eyeline orientation confirmed on 180° line'
        ];
        onExecuteAgentAction('SWITCH_85MM');
      } else if (lower.includes('continuity') || lower.includes('lock') || lower.includes('character') || lower.includes('elena') || lower.includes('ren')) {
        agentResponseText = "Character identity retention locked to 99%. Cinematographic Rationale: Vanishing the character morphing flaw. I've bound the actor's facial embedding vectors directly to the IP-Adapter cross-attention layers and locked the wardrobe token seed to prevent button, lapel, and seam hallucinations across sequential cuts.";
        dpNotes = "Facial Vector Variance: <0.02 • Wardrobe Token: Pinned to Latent Seed • Drift Status: Negligible";
        actions = [
          'Pinned facial embedding vectors to cross-attention',
          'Locked wardrobe token seed (#Noir-Coat-v2)',
          'Synchronized latent identity across all DAG branches',
          'Verified Continuity Matrix score: 99.4%'
        ];
        onExecuteAgentAction('LOCK_CONTINUITY');
      } else if (lower.includes('magnific') || lower.includes('upscale') || lower.includes('4k') || lower.includes('detail')) {
        agentResponseText = "Injected Magnific 4K Hallucination Pass. Cinematographic Rationale: Vanilla video diffusion models over-smooth organic micro-textures like wet leather, rain streaks on glass, and skin pores. Magnific's regional relighting pass re-injects high-frequency specularity and fabric weave without altering facial bone geometry.";
        dpNotes = "Upscale: 4x Cinema Master • Creativity: 35% • Structural Resemblance: 88% • HDR Relight: Active";
        actions = [
          'Instantiated Magnific Enhancer DAG node',
          'Wired input stream from Color Grade node',
          'Enabled HDR Relighting & Micro-porosity pass',
          'Routed high-frequency pass into Master Render node'
        ];
        onExecuteAgentAction('ATTACH_MAGNIFIC');
      } else if (lower.includes('neo-noir') || lower.includes('rain') || lower.includes('cyberpunk') || lower.includes('diner')) {
        agentResponseText = "Assembled 3-shot Neo-Noir coverage following A24 film syntax: Establishing Exterior Wide (24mm rain reflections) -> Profile Medium Close-Up (35mm anamorphic) -> Tight Emotional Macro (85mm flame/cigarette). Graded in organic Kodak Vision3 500T with a high-contrast 4:1 chiaroscuro lighting ratio.";
        dpNotes = "Coverage: 3-Angle Master Setup • Stock: Kodak 500T • Contrast: 4:1 Key:Fill • Aspect: 2.39:1 CinemaScope";
        actions = [
          'Constructed ScriptSceneNode: The Wet Diner',
          'Anchored CharacterNode: Detective Ren (LoRA Lock)',
          'Rigged CameraOptics: 35mm Anamorphic T1.9',
          'Timed LightingGrade: Kodak 500T with 4:1 Key/Fill',
          'Attached Atmospheric Particle Physics (Rain & Smoke)'
        ];
        onExecuteAgentAction('BUILD_NEO_NOIR');
      } else if (lower.includes('export') || lower.includes('comfy') || lower.includes('payload') || lower.includes('api')) {
        agentResponseText = "Compiled DAG into an execution pipeline. The JSON payload maps all node token weights, camera motion trajectories, and LoRA references into ComfyUI custom classes and HexCoded's API schema.";
        dpNotes = "Graph Status: Valid DAG • 7 Nodes • 7 Interconnects • Formats: ComfyUI + HexCoded API";
        actions = [
          'Validated Directed Acyclic Graph (DAG) topology',
          'Calculated token weights & negative safety vectors',
          'Generated ComfyUI custom node schema',
          'Compiled Director Call Sheet'
        ];
        onExecuteAgentAction('EXPORT_GRAPH');
      } else {
        agentResponseText = `Understood. Analyzing scene coverage across your ${nodes.length} nodes. I've rebalanced prompt token weights (+0.15 key light specular, +0.20 anamorphic flare) and confirmed that camera motion vectors do not introduce disorienting parallax jumps.`;
        dpNotes = `Scene Token Balance: Optimized • Node Graph: ${nodes.length} Active Rigs • Parallax Status: Smooth`;
        actions = [
          'Analyzed scene graph semantic tokens',
          'Checked camera vector delta between shots',
          'Verified pipeline execution flow'
        ];
      }

      const agentMsg = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: agentResponseText,
        dpNotes,
        actionsTaken: actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <aside
      className="glass-panel"
      style={{
        width: isOpen ? 'var(--sidebar-width)' : '0px',
        height: 'calc(100vh - var(--header-height))',
        position: 'absolute',
        top: 'var(--header-height)',
        right: '0',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: isOpen ? '1px solid var(--border-subtle)' : 'none',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="glass-panel"
        style={{
          position: 'absolute',
          left: '-32px',
          top: '20px',
          width: '32px',
          height: '36px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderRight: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)'
        }}
        title={isOpen ? 'Collapse AI Director' : 'Expand AI Director'}
      >
        {isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)'
          }}>
            <Bot size={15} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              HexDirector Copilot
            </div>
            <div style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
              Active DP Reasoning Mode
            </div>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: '4px'
            }}
          >
            <div style={{
              maxWidth: '92%',
              padding: '12px 14px',
              borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: msg.sender === 'user' 
                ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' 
                : 'rgba(24, 29, 44, 0.9)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
              fontSize: '12px',
              lineHeight: '1.6',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)'
            }}>
              {msg.text}

              {/* DP Cinematography HUD Tag */}
              {msg.dpNotes && (
                <div style={{
                  marginTop: '8px',
                  padding: '5px 8px',
                  background: 'rgba(6, 182, 212, 0.12)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '5px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: '#67e8f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Camera size={11} />
                  <span>{msg.dpNotes}</span>
                </div>
              )}

              {/* Action Log */}
              {msg.actionsTaken && msg.actionsTaken.length > 0 && (
                <div style={{
                  marginTop: '10px',
                  padding: '8px 10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: '#a78bfa',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '4px'
                  }}>
                    <Terminal size={11} />
                    <span>CANVAS GRAPH MUTATIONS:</span>
                  </div>
                  {msg.actionsTaken.map((act, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '2px'
                      }}
                    >
                      <span style={{ color: '#10b981' }}>✓</span> {act}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span style={{ fontSize: '9px', color: 'var(--text-dim)', padding: '0 4px' }}>
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isThinking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', width: 'fit-content' }}>
            <Sparkles size={13} className="cable-pulse" color="#8b5cf6" />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              DP is evaluating coverage & mutating node rigs...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Directing Commands */}
      <div style={{
        padding: '8px 14px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Cinematic Directing Directives:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {QUICK_DIRECTOR_PROMPTS.slice(0, 3).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt.title)}
              className="btn-ghost"
              style={{
                fontSize: '10px',
                padding: '3px 7px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                color: '#c4b5fd'
              }}
            >
              + {prompt.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '8px',
        background: 'rgba(14, 17, 26, 0.95)'
      }}>
        <input
          type="text"
          placeholder="Direct scene (e.g. 'Switch camera to 85mm portrait')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{ flex: 1, fontSize: '12px', padding: '8px 12px' }}
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="btn-primary"
          style={{ padding: '8px 12px' }}
        >
          <Send size={14} />
        </button>
      </div>
    </aside>
  );
}
