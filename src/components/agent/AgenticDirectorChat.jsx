import React, { useState, useRef, useEffect } from 'react';
import { QUICK_DIRECTOR_PROMPTS } from '../../data/mockData';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Wand2,
  Sliders,
  Film
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
      text: "Welcome to HexFlow Director. I'm your agentic co-director. I can build entire scenes, lock character identity across shots, configure camera rigs, or optimize your generation graph for production. What are we filming?",
      actionsTaken: null,
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

    // Add user message
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // Simulate Agent Reasoning & Canvas Manipulation
    setTimeout(() => {
      let agentResponseText = '';
      let actions = [];

      const lower = query.toLowerCase();

      if (lower.includes('85mm') || lower.includes('close-up') || lower.includes('portrait')) {
        agentResponseText = "Switching your camera setup to an 85mm T2.0 Prime with f/1.4 shallow depth of field. I've updated the optics node and added subtle creamy bokeh to emphasize the actor's intense gaze.";
        actions = [
          'Inspected active camera node (node-3)',
          'Updated focalLength -> 85mm T2.0 Prime',
          'Adjusted aperture -> f/1.4 Creamy Bokeh',
          'Recalibrated depth-of-field blur profile'
        ];
        onExecuteAgentAction('SWITCH_85MM');
      } else if (lower.includes('continuity') || lower.includes('lock') || lower.includes('character') || lower.includes('elena') || lower.includes('ren')) {
        agentResponseText = "Character identity retention locked to 99%. I have bound the facial embedding LoRA and locked the wardrobe token across all downstream scene nodes to prevent shot-to-shot hallucination drift.";
        actions = [
          'Extracted facial reference anchors',
          'Enforced LoRA weight -> 0.99',
          'Synchronized wardrobe token across all timeline shots',
          'Continuity score verified: 99.4%'
        ];
        onExecuteAgentAction('LOCK_CONTINUITY');
      } else if (lower.includes('magnific') || lower.includes('upscale') || lower.includes('4k') || lower.includes('detail')) {
        agentResponseText = "Attached a Magnific 4K Detail Pass node with 35% hallucination creativity and HDR relighting. Your render will now output rich skin micro-pores and sharp fabric textures.";
        actions = [
          'Instantiated Magnific Enhancer node',
          'Wired input from Color Grade node',
          'Wired output to Master Render node',
          'Enabled HDR Relighting pass'
        ];
        onExecuteAgentAction('ATTACH_MAGNIFIC');
      } else if (lower.includes('neo-noir') || lower.includes('rain') || lower.includes('cyberpunk') || lower.includes('diner')) {
        agentResponseText = "Generating a 3-shot Neo-Noir sequence. I've established the Shinjuku diner setting, rigged the 35mm anamorphic camera with rain streaks, dialed in Kodak 500T grain, and connected the pipeline to our master render output.";
        actions = [
          'Created ScriptSceneNode: The Wet Diner',
          'Connected CharacterAnchor: Detective Ren',
          'Configured CameraOpticsNode: 35mm Anamorphic T1.9',
          'Applied ColorGradeNode: Kodak 500T / Neon Magenta-Cyan',
          'Added ParticlePhysicsNode: Rain & Smoke'
        ];
        onExecuteAgentAction('BUILD_NEO_NOIR');
      } else if (lower.includes('export') || lower.includes('comfy') || lower.includes('payload') || lower.includes('api')) {
        agentResponseText = "Compiled your active node graph into an executable ComfyUI pipeline and HexCoded API payload. You can open the Export modal to inspect the JSON schema or copy it directly into your render farm.";
        actions = [
          'Validated graph DAG topology',
          'Serialized 7 nodes and 7 edges',
          'Generated ComfyUI custom node mappings',
          'Compiled Director Shot Call Sheet'
        ];
        onExecuteAgentAction('EXPORT_GRAPH');
      } else {
        agentResponseText = `Understood. I've analyzed your current scene graph with ${nodes.length} nodes. I've optimized prompt weights, ensured character facial anchors are coherent, and verified that camera lenses follow standard cinematic coverage.`;
        actions = [
          'Analyzed scene graph semantic tokens',
          'Balanced prompt token weights (+0.15 lighting, +0.20 anamorphic)',
          'Verified pipeline execution flow'
        ];
      }

      const agentMsg = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: agentResponseText,
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
      {/* Toggle Button on Left Edge */}
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

      {/* Sidebar Header */}
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
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)'
          }}>
            <Bot size={15} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              HexAgent Co-Director
            </div>
            <div style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
              Canvas Live Link Connected
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
              maxWidth: '90%',
              padding: '10px 14px',
              borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: msg.sender === 'user' 
                ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' 
                : 'rgba(26, 32, 48, 0.85)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
              fontSize: '12px',
              lineHeight: '1.5',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)'
            }}>
              {msg.text}

              {/* Action Log if agent performed actions on canvas */}
              {msg.actionsTaken && msg.actionsTaken.length > 0 && (
                <div style={{
                  marginTop: '10px',
                  padding: '8px 10px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: '#67e8f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '4px'
                  }}>
                    <Terminal size={11} />
                    <span>CANVAS MUTATIONS EXECUTED:</span>
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

        {/* Thinking Indicator */}
        {isThinking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', width: 'fit-content' }}>
            <Sparkles size={13} className="cable-pulse" color="#8b5cf6" />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Director is reasoning & altering node graph...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{
        padding: '8px 14px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Suggested Directing Commands:
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

      {/* Chat Input Field */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '8px',
        background: 'rgba(14, 17, 26, 0.95)'
      }}>
        <input
          type="text"
          placeholder="Ask Director (e.g. 'Switch camera to 85mm anamorphic')..."
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
