import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/navbar/Header';
import { NodeCanvas } from './components/canvas/NodeCanvas';
import { AgenticDirectorChat } from './components/agent/AgenticDirectorChat';
import { CinematicTimelinePlayer } from './components/timeline/CinematicTimelinePlayer';
import { ContinuityMatrixModal } from './components/continuity/ContinuityMatrixModal';
import { TheaterPreviewModal } from './components/theater/TheaterPreviewModal';
import { ProductionExportModal } from './components/export/ProductionExportModal';
import { PitchModal } from './components/pitch/PitchModal';
import { ProductSpecModal } from './components/prd/ProductSpecModal';
import { PromptInspectorModal } from './components/inspector/PromptInspectorModal';
import { INITIAL_TEMPLATES, NODE_TYPES_CONFIG } from './data/mockData';

export function App() {
  const [currentTemplateId, setCurrentTemplateId] = useState('cyberpunk_noir');
  const [nodes, setNodes] = useState(INITIAL_TEMPLATES.cyberpunk_noir.nodes);
  const [edges, setEdges] = useState(INITIAL_TEMPLATES.cyberpunk_noir.edges);
  const [timelineShots, setTimelineShots] = useState(INITIAL_TEMPLATES.cyberpunk_noir.timelineShots);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeShotIndex, setActiveShotIndex] = useState(0);

  // States
  const [isRunning, setIsRunning] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(true);

  // Modal visibility
  const [showContinuityModal, setShowContinuityModal] = useState(false);
  const [showTheaterModal, setShowTheaterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [showInspectorModal, setShowInspectorModal] = useState(false);

  // Switch Template
  const handleSelectTemplate = (templateId) => {
    const template = INITIAL_TEMPLATES[templateId];
    if (!template) return;
    setCurrentTemplateId(templateId);
    setNodes(template.nodes);
    setEdges(template.edges);
    setTimelineShots(template.timelineShots);
    setSelectedNodeId(null);
    setActiveShotIndex(0);
  };

  // Node CRUD operations
  const handleUpdateNodeData = (nodeId, dataUpdate = {}, posUpdate = {}) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            x: posUpdate.x !== undefined ? posUpdate.x : n.x,
            y: posUpdate.y !== undefined ? posUpdate.y : n.y,
            data: { ...n.data, ...dataUpdate }
          };
        }
        return n;
      })
    );
  };

  const handleDeleteNode = (nodeId) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.source !== nodeId && e.target !== nodeId));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
  };

  const handleAddNode = (typeKey, coords) => {
    const config = NODE_TYPES_CONFIG[typeKey] || { label: 'Node' };
    const newNodeId = `node-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: typeKey,
      title: `${config.label} Rig`,
      x: coords.x || 300,
      y: coords.y || 200,
      data: getDefaultDataForType(typeKey)
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newNodeId);
  };

  const handleConnectEdges = (sourceId, targetId) => {
    const edgeId = `e-${sourceId}-${targetId}`;
    if (edges.some((e) => e.source === sourceId && e.target === targetId)) return;

    setEdges((prev) => [
      ...prev,
      {
        id: edgeId,
        source: sourceId,
        target: targetId,
        sourcePort: 'out',
        targetPort: 'in'
      }
    ]);
  };

  const handleDeleteEdge = (edgeId) => {
    setEdges((prev) => prev.filter((e) => e.id !== edgeId));
  };

  // Agent Actions execution
  const handleExecuteAgentAction = (action) => {
    if (action === 'SWITCH_85MM') {
      setNodes((prev) =>
        prev.map((n) => {
          if (n.type === 'camera_optics') {
            return {
              ...n,
              title: 'Optics: 85mm Portrait Prime',
              data: {
                ...n.data,
                focalLength: '85mm T2.0 Prime',
                shotType: 'Intimate Medium Close-Up',
                dof: 'f/1.4 Creamy Bokeh',
                streakFlare: 'Warm Golden Sunlight Streak'
              }
            };
          }
          return n;
        })
      );
    } else if (action === 'LOCK_CONTINUITY') {
      setNodes((prev) =>
        prev.map((n) => {
          if (n.type === 'character_anchor') {
            return {
              ...n,
              data: {
                ...n.data,
                identityWeight: 99
              }
            };
          }
          return n;
        })
      );
    } else if (action === 'ATTACH_MAGNIFIC') {
      if (!nodes.some((n) => n.type === 'magnific_enhancer')) {
        handleAddNode('magnific_enhancer', { x: 1100, y: 140 });
      }
    } else if (action === 'BUILD_NEO_NOIR') {
      handleSelectTemplate('cyberpunk_noir');
    } else if (action === 'EXPORT_GRAPH') {
      setShowExportModal(true);
    }
  };

  // Run Pipeline Simulation
  const handleRunPipeline = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.2 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']
        });
      } catch (e) {
        // ignore
      }
    }, 2800);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: 'var(--canvas-bg)',
      overflow: 'hidden'
    }}>
      {/* Top Studio Header */}
      <Header
        currentTemplate={currentTemplateId}
        onSelectTemplate={handleSelectTemplate}
        onRunPipeline={handleRunPipeline}
        isRunning={isRunning}
        onOpenContinuity={() => setShowContinuityModal(true)}
        onOpenExport={() => setShowExportModal(true)}
        onOpenPitch={() => setShowPitchModal(true)}
        onOpenTheater={() => setShowTheaterModal(true)}
        onOpenSpec={() => setShowSpecModal(true)}
        onOpenInspector={() => setShowInspectorModal(true)}
      />

      {/* Main Studio Workspace: Canvas + Agentic Drawer */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        paddingBottom: 'var(--timeline-height)'
      }}>
        {/* Infinite Node Canvas */}
        <NodeCanvas
          nodes={nodes}
          edges={edges}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          onUpdateNodeData={handleUpdateNodeData}
          onDeleteNode={handleDeleteNode}
          onAddNode={handleAddNode}
          onConnectEdges={handleConnectEdges}
          onDeleteEdge={handleDeleteEdge}
          isRunning={isRunning}
        />

        {/* Agentic Co-Director Chat Sidebar */}
        <AgenticDirectorChat
          isOpen={isAgentOpen}
          onToggle={() => setIsAgentOpen(!isAgentOpen)}
          onExecuteAgentAction={handleExecuteAgentAction}
          nodes={nodes}
          currentTemplate={currentTemplateId}
        />
      </div>

      {/* Bottom Cinematic Storyboard Timeline */}
      <CinematicTimelinePlayer
        shots={timelineShots}
        activeShotIndex={activeShotIndex}
        onSelectShot={setActiveShotIndex}
        onOpenTheater={() => setShowTheaterModal(true)}
      />

      {/* Modals */}
      <ProductSpecModal
        isOpen={showSpecModal}
        onClose={() => setShowSpecModal(false)}
      />

      <PromptInspectorModal
        isOpen={showInspectorModal}
        onClose={() => setShowInspectorModal(false)}
        nodes={nodes}
        edges={edges}
      />

      <ContinuityMatrixModal
        isOpen={showContinuityModal}
        onClose={() => setShowContinuityModal(false)}
        shots={timelineShots}
      />

      <TheaterPreviewModal
        isOpen={showTheaterModal}
        onClose={() => setShowTheaterModal(false)}
        shots={timelineShots}
        activeShotIndex={activeShotIndex}
      />

      <ProductionExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        nodes={nodes}
        edges={edges}
        templateId={currentTemplateId}
      />

      <PitchModal
        isOpen={showPitchModal}
        onClose={() => setShowPitchModal(false)}
      />
    </div>
  );
}

// Default Data generator
function getDefaultDataForType(type) {
  switch (type) {
    case 'script_scene':
      return {
        slugline: 'INT. STAGE STUDIO - NIGHT',
        prompt: 'Cinematic tracking shot through volumetric smoke and warm key light.',
        mood: 'Dramatic / Intense',
        pacing: '24 FPS Standard'
      };
    case 'character_anchor':
      return {
        name: 'Lead Actor',
        identityWeight: 96,
        wardrobeLock: 'Signature Jacket & Dark Denim',
        expression: 'Intense Focus',
        image: '/assets/actor_anchor.jpg',
        loraModel: 'Actor_LoRA_v1.safetensors'
      };
    case 'camera_optics':
      return {
        focalLength: '35mm Anamorphic T1.9',
        shotType: 'Medium Close-Up (Profile)',
        cameraMotion: 'Slow Dolly In',
        dof: 'f/1.8 Shallow Focus'
      };
    case 'lighting_grade':
      return {
        preset: 'Kodak Vision3 500T / Neon Noir',
        keyLight: 'Key Light (70%)',
        fillLight: 'Ambient Fill (30%)',
        grain: 50,
        halation: 35
      };
    case 'motion_dynamics':
      return {
        particles: 'Atmospheric Fog & Sparks',
        motionIntensity: 40,
        fps: 24,
        temporalStability: 90
      };
    case 'magnific_enhancer':
      return {
        upscaleFactor: '4x Ultra-Res',
        creativity: 30,
        resemblance: 90,
        hdrRelight: true,
        microPores: 'High Detail Pass'
      };
    case 'render_output':
      return {
        resolution: '3840 x 1606 (2.39:1 CinemaScope)',
        format: 'ProRes 422 HQ',
        duration: '4.5s',
        previewImage: '/assets/detective_rain.jpg',
        renderProgress: 100,
        status: 'ready'
      };
    default:
      return {};
  }
}
