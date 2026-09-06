import React, { useState, useRef, useEffect } from 'react';
import { NodeCard } from '../nodes/NodeCard';
import { NODE_TYPES_CONFIG } from '../../data/mockData';
import { 
  Plus, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Grid, 
  RotateCcw,
  Sparkles,
  Link2
} from 'lucide-react';

export function NodeCanvas({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  onUpdateNodeData,
  onDeleteNode,
  onAddNode,
  onConnectEdges,
  onDeleteEdge,
  isRunning
}) {
  const containerRef = useRef(null);
  
  // Pan and Zoom state
  const [pan, setPan] = useState({ x: 40, y: 40 });
  const [zoom, setZoom] = useState(0.9);
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Node Dragging state
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [nodeOffset, setNodeOffset] = useState({ x: 0, y: 0 });

  // Connection Dragging state
  const [connecting, setConnecting] = useState(null); // { sourceNodeId, sourcePort, currentMousePos }

  // Quick Add Menu state
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Handle Pan with Mouse Drag on Canvas
  const handleMouseDown = (e) => {
    // If clicking directly on the canvas background
    if (e.target.id === 'canvas-board' || e.target.id === 'canvas-svg') {
      setIsPanning(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      onSelectNode(null);
    }
  };

  const handleMouseMove = (e) => {
    // Panning canvas
    if (isPanning) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    // Dragging a node
    if (draggingNodeId) {
      const newX = Math.round((e.clientX - pan.x) / zoom - nodeOffset.x);
      const newY = Math.round((e.clientY - pan.y) / zoom - nodeOffset.y);
      
      onUpdateNodeData(draggingNodeId, {}, { x: newX, y: newY });
      return;
    }

    // Dragging a connection cable
    if (connecting) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - containerRect.left - pan.x) / zoom;
      const mouseY = (e.clientY - containerRect.top - pan.y) / zoom;
      
      setConnecting((prev) => ({
        ...prev,
        currentMousePos: { x: mouseX, y: mouseY }
      }));
    }
  };

  const handleMouseUp = (e) => {
    setIsPanning(false);
    setDraggingNodeId(null);

    // If we were connecting a cable, check if we dropped on an input socket
    if (connecting) {
      const targetSocket = e.target.closest('[data-socket-type="in"]');
      if (targetSocket) {
        const targetNodeId = targetSocket.getAttribute('data-node-id');
        if (targetNodeId && targetNodeId !== connecting.sourceNodeId) {
          onConnectEdges(connecting.sourceNodeId, targetNodeId);
        }
      }
      setConnecting(null);
    }
  };

  // Zoom with wheel
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.4), 1.8));
    }
  };

  // Start dragging a node
  const handleStartDragNode = (nodeId, e) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - containerRect.left - pan.x) / zoom;
    const mouseY = (e.clientY - containerRect.top - pan.y) / zoom;

    setDraggingNodeId(nodeId);
    setNodeOffset({
      x: mouseX - node.x,
      y: mouseY - node.y
    });
    onSelectNode(nodeId);
  };

  // Start dragging a connection
  const handleStartConnect = (sourceNodeId, port, e) => {
    const sourceNode = nodes.find((n) => n.id === sourceNodeId);
    if (!sourceNode) return;

    const sourceX = sourceNode.x + 320;
    const sourceY = sourceNode.y + 160;

    setConnecting({
      sourceNodeId,
      sourcePort: port,
      sourcePos: { x: sourceX, y: sourceY },
      currentMousePos: { x: sourceX, y: sourceY }
    });
  };

  // Compute Bezier path between two coordinates
  const getBezierPath = (x1, y1, x2, y2) => {
    const dx = Math.max(Math.abs(x2 - x1) * 0.5, 60);
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div
      ref={containerRef}
      id="canvas-board"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className="canvas-grid"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: isPanning ? 'grabbing' : 'default'
      }}
    >
      {/* Zoom / Pan Container */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          position: 'absolute',
          width: '5000px',
          height: '5000px',
          pointerEvents: 'none'
        }}
      >
        {/* SVG Cable Layer */}
        <svg
          id="canvas-svg"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'auto'
          }}
        >
          <defs>
            <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Render Existing Edges */}
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            // Output socket is right side: x + 320, mid height ~ 160
            const x1 = sourceNode.x + 320;
            const y1 = sourceNode.y + 160;
            // Input socket is left side: x, mid height ~ 160
            const x2 = targetNode.x;
            const y2 = targetNode.y + 160;

            const pathData = getBezierPath(x1, y1, x2, y2);
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            return (
              <g key={edge.id} className="edge-group">
                {/* Background Shadow Line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#0f121c"
                  strokeWidth="6"
                />
                {/* Colored Active Cable */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isRunning ? 'url(#cableGrad)' : 'rgba(139, 92, 246, 0.55)'}
                  strokeWidth="3"
                  className={isRunning ? 'cable-pulse cable-active' : ''}
                  filter={isRunning ? 'url(#glow)' : ''}
                />
                {/* Edge Delete Button (shown on hover or subtle) */}
                <circle
                  cx={midX}
                  cy={midY}
                  r="10"
                  fill="#1a1f2e"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEdge(edge.id);
                  }}
                  title="Click to disconnect wire"
                />
                <text
                  x={midX}
                  y={midY + 3.5}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  ×
                </text>
              </g>
            );
          })}

          {/* Render Active Dragging Connection Cable */}
          {connecting && connecting.sourcePos && connecting.currentMousePos && (
            <path
              d={getBezierPath(
                connecting.sourcePos.x,
                connecting.sourcePos.y,
                connecting.currentMousePos.x,
                connecting.currentMousePos.y
              )}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeDasharray="5, 5"
              filter="url(#glow)"
            />
          )}
        </svg>

        {/* Nodes Layer */}
        {nodes.map((node) => (
          <div
            key={node.id}
            onMouseDown={(e) => {
              // Don't drag if clicking an input, button, slider, or socket
              if (
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'SELECT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.tagName === 'BUTTON' ||
                e.target.classList.contains('node-socket')
              ) {
                return;
              }
              handleStartDragNode(node.id, e);
            }}
            style={{
              position: 'absolute',
              left: `${node.x}px`,
              top: `${node.y}px`,
              pointerEvents: 'auto',
              cursor: draggingNodeId === node.id ? 'grabbing' : 'grab',
              zIndex: selectedNodeId === node.id ? 20 : 10
            }}
          >
            <NodeCard
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={onSelectNode}
              onUpdateData={(id, data) => onUpdateNodeData(id, data)}
              onDelete={onDeleteNode}
              onStartConnect={handleStartConnect}
              isRunning={isRunning}
            />
          </div>
        ))}
      </div>

      {/* Floating Canvas Controls (Bottom Left) */}
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 8px',
          borderRadius: '10px',
          zIndex: 30
        }}
      >
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.15, 1.8))}
          className="btn-icon"
          title="Zoom In"
        >
          <ZoomIn size={15} />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.15, 0.4))}
          className="btn-icon"
          title="Zoom Out"
        >
          <ZoomOut size={15} />
        </button>
        <button
          onClick={() => {
            setZoom(0.85);
            setPan({ x: 40, y: 40 });
          }}
          className="btn-icon"
          title="Reset View"
        >
          <Maximize size={15} />
        </button>
        <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)' }} />
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', padding: '0 4px' }}>
          {Math.round(zoom * 100)}%
        </span>
      </div>

      {/* Floating Add Node Drawer / Button (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          zIndex: 30
        }}
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="btn-primary"
            style={{ padding: '8px 14px' }}
          >
            <Plus size={16} />
            <span>Add Node Rig</span>
          </button>

          {/* Dropdown Menu */}
          {showAddMenu && (
            <div
              className="glass-panel-elevated"
              style={{
                position: 'absolute',
                top: '42px',
                left: '0',
                width: '260px',
                borderRadius: '10px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.8)'
              }}
            >
              <div style={{ padding: '4px 8px', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Creative Studio Rigs
              </div>
              {Object.entries(NODE_TYPES_CONFIG).map(([typeKey, cfg]) => (
                <button
                  key={typeKey}
                  onClick={() => {
                    onAddNode(typeKey, {
                      x: Math.round((-pan.x + 300) / zoom),
                      y: Math.round((-pan.y + 200) / zoom)
                    });
                    setShowAddMenu(false);
                  }}
                  className="btn-ghost"
                  style={{
                    justifyContent: 'flex-start',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: cfg.color,
                    marginRight: '8px',
                    boxShadow: `0 0 6px ${cfg.color}`
                  }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {cfg.label}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {cfg.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
