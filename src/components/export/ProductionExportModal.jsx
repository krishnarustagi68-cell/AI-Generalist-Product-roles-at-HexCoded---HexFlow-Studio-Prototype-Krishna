import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Terminal, 
  Share2, 
  Layers 
} from 'lucide-react';

export function ProductionExportModal({ isOpen, onClose, nodes, edges, templateId }) {
  const [activeTab, setActiveTab] = useState('hexcoded');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate HexCoded API Payload
  const hexcodedPayload = {
    version: '2.4.0',
    studio_target: 'hexcoded-creative-cloud',
    timestamp: new Date().toISOString(),
    workflow_id: `hexflow_${templateId}_${Date.now()}`,
    graph: {
      total_nodes: nodes.length,
      total_edges: edges.length,
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        coordinates: { x: n.x, y: n.y },
        parameters: n.data
      })),
      edges: edges.map((e) => ({
        id: e.id,
        from: e.source,
        to: e.target,
        socket: `${e.sourcePort}->${e.targetPort}`
      }))
    },
    render_config: {
      engine: 'LTX-Video-v2.1 + Magnific-Relight-Pass',
      fps: 24,
      color_space: 'ACEScc / Rec.709',
      export_codec: 'ProRes 422 HQ'
    }
  };

  // Generate ComfyUI JSON Schema
  const comfyPayload = {
    client_id: 'hexcoded_client_worker_01',
    prompt: nodes.reduce((acc, node, idx) => {
      acc[node.id] = {
        class_type: `HexCoded_${node.type.toUpperCase()}`,
        inputs: {
          ...node.data,
          connected_sources: edges.filter((e) => e.target === node.id).map((e) => e.source)
        }
      };
      return acc;
    }, {})
  };

  // Generate Director Call Sheet
  const callSheetMarkdown = `# HEXCODED PRODUCTION CALL SHEET
**Project:** ${templateId.toUpperCase()}  
**Target Studio:** HexCoded Creative Studio  
**Date:** ${new Date().toLocaleDateString()}  

---

## SEQUENCE BREAKDOWN & SHOT LIST:
${nodes
  .filter((n) => n.type === 'script_scene' || n.type === 'camera_optics' || n.type === 'character_anchor')
  .map(
    (n, i) => `### ${i + 1}. ${n.title} (${n.type})
- **Details:** ${JSON.stringify(n.data, null, 2)}
`
  )
  .join('\n')}

---
*Generated via HexFlow Studio - Agentic Node Director*
`;

  const getActiveText = () => {
    if (activeTab === 'hexcoded') return JSON.stringify(hexcodedPayload, null, 2);
    if (activeTab === 'comfy') return JSON.stringify(comfyPayload, null, 2);
    return callSheetMarkdown;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = getActiveText();
    const ext = activeTab === 'callsheet' ? 'md' : 'json';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hexflow_${activeTab}_export.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel-elevated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '780px',
          maxWidth: '95vw',
          maxHeight: '88vh',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Download size={17} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Production Export Pipeline
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Compile active node graph into HexCoded API payload, ComfyUI schema, or Director Call Sheet
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          padding: '10px 22px',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          <button
            onClick={() => setActiveTab('hexcoded')}
            className={activeTab === 'hexcoded' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '11px' }}
          >
            HexCoded API JSON
          </button>
          <button
            onClick={() => setActiveTab('comfy')}
            className={activeTab === 'comfy' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '11px' }}
          >
            ComfyUI Pipeline
          </button>
          <button
            onClick={() => setActiveTab('callsheet')}
            className={activeTab === 'callsheet' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '11px' }}
          >
            Director Call Sheet (MD)
          </button>
        </div>

        {/* Code Editor Preview Box */}
        <div style={{ flex: 1, padding: '16px 22px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <pre style={{
            flex: 1,
            margin: 0,
            padding: '14px',
            background: 'rgba(0, 0, 0, 0.55)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '11px',
            lineHeight: '1.6',
            color: '#a5f3fc',
            fontFamily: 'var(--font-mono)'
          }}>
            <code>{getActiveText()}</code>
          </pre>
        </div>

        {/* Modal Footer with Actions */}
        <div style={{
          padding: '12px 22px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {nodes.length} Nodes • {edges.length} Interconnected Data Pipes
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleCopy} className="btn-secondary" style={{ padding: '7px 14px', fontSize: '12px' }}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>

            <button onClick={handleDownload} className="btn-primary" style={{ padding: '7px 16px', fontSize: '12px' }}>
              <Download size={14} />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
