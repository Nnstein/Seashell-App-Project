import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image, Type, Upload, Trash2, Eye, Check,
  FileImage, FileVideo, FileText, Save, RotateCcw
} from 'lucide-react';
import { LoadingButton } from '@/components/loading';

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  url: string;
  section: string;
  uploadedAt: string;
}

interface ContentBlock {
  id: string;
  key: string;
  label: string;
  value: string;
  section: string;
  lastEdited: string;
}

const mockAssets: MediaAsset[] = [
  { id: 'a1', name: 'hero-beach-sunset.jpg', type: 'image', size: '2.4 MB', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', section: 'Hero Banner', uploadedAt: '2026-06-20' },
  { id: 'a2', name: 'promo-video-2026.mp4', type: 'video', size: '18.7 MB', url: '#', section: 'Promotional Video', uploadedAt: '2026-06-22' },
  { id: 'a3', name: 'room-presidential.jpg', type: 'image', size: '1.8 MB', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', section: 'Room Gallery', uploadedAt: '2026-06-18' },
  { id: 'a4', name: 'dining-avenue.jpg', type: 'image', size: '3.1 MB', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', section: 'Dining', uploadedAt: '2026-06-15' },
  { id: 'a5', name: 'pool-aerial.jpg', type: 'image', size: '4.2 MB', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80', section: 'Facilities', uploadedAt: '2026-06-10' },
  { id: 'a6', name: 'resort-tour-video.mp4', type: 'video', size: '42.3 MB', url: '#', section: 'Virtual Tour', uploadedAt: '2026-06-25' },
];

const mockContent: ContentBlock[] = [
  { id: 'c1', key: 'hero_title', label: 'Hero Title', value: 'SeaShell Hotel & Resort', section: 'Homepage', lastEdited: '2026-06-20' },
  { id: 'c2', key: 'hero_tagline', label: 'Hero Tagline', value: "Where the golden sun shines, blue skies and seas shimmer", section: 'Homepage', lastEdited: '2026-06-20' },
  { id: 'c3', key: 'welcome_text', label: 'Welcome Paragraph', value: 'Our hotel and resort embodies three elements: serenity, enjoyment and leisure, as we prioritize to accommodate our guests who are looking to de-stress and re-energize.', section: 'Homepage', lastEdited: '2026-06-18' },
  { id: 'c4', key: 'about_extended', label: 'About Extended', value: 'Come along with your family and be a part of SeaShell\'s experience that must truly be enjoyed under the sun.', section: 'About', lastEdited: '2026-06-15' },
  { id: 'c5', key: 'contact_phone', label: 'Resort Phone', value: '+965 1844444', section: 'Contact', lastEdited: '2026-06-01' },
  { id: 'c6', key: 'contact_email', label: 'Resort Email', value: 'info@seashell-kuwait.com', section: 'Contact', lastEdited: '2026-06-01' },
  { id: 'c7', key: 'promo_banner', label: 'Promo Banner Text', value: 'Summer Special — 20% off all chalets through July!', section: 'Marketing', lastEdited: '2026-06-25' },
  { id: 'c8', key: 'spa_offer', label: 'Spa Offer Text', value: 'Book any massage and get a complimentary pool day pass.', section: 'Marketing', lastEdited: '2026-06-24' },
];

/* ═══════════════ File Upload Progress Component ═══════════════ */
function UploadProgress({ fileName, progress, status, onCancel }: {
  fileName: string; progress: number; status: 'uploading' | 'processing' | 'done' | 'error'; onCancel: () => void;
}) {
  const statusColors = {
    uploading: '#89C1D8',
    processing: '#FBBF24',
    done: '#4ADE80',
    error: '#EF4444',
  };
  const statusLabels = {
    uploading: 'Uploading...',
    processing: 'Processing...',
    done: 'Complete',
    error: 'Failed',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
      className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #21262d' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileImage size={14} style={{ color: statusColors[status] }} />
          <span className="text-xs text-white/70 truncate">{fileName}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold" style={{ color: statusColors[status] }}>{statusLabels[status]}</span>
          {status !== 'done' && (
            <button onClick={onCancel} className="p-1 rounded hover:bg-white/5 text-white/30 hover:text-red-400">
              <Trash2 size={12} />
            </button>
          )}
          {status === 'done' && <Check size={14} className="text-green-400" />}
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: statusColors[status] }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-[10px] text-white/30 mt-1">{progress}%</p>
    </motion.div>
  );
}

/* ═══════════════ Main Content Management Page ═══════════════ */
export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'media' | 'text'>('media');
  const [assets, setAssets] = useState<MediaAsset[]>(mockAssets);
  const [contents, setContents] = useState<ContentBlock[]>(mockContent);
  const [uploads, setUploads] = useState<{ id: string; name: string; progress: number; status: 'uploading' | 'processing' | 'done' | 'error' }[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated file upload
  const simulateUpload = (fileName: string) => {
    const id = 'up-' + Date.now();
    setUploads(prev => [...prev, { id, name: fileName, progress: 0, status: 'uploading' }]);

    // Progress animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploads(prev => prev.map(u => u.id === id ? { ...u, progress: 100, status: 'processing' } : u));
        // Processing delay
        setTimeout(() => {
          setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'done' } : u));
          // Add to assets after done
          setTimeout(() => {
            setAssets(prev => [{
              id: 'a-' + Date.now(),
              name: fileName,
              type: fileName.match(/\.(mp4|mov|avi)$/i) ? 'video' : 'image',
              size: (Math.random() * 5 + 1).toFixed(1) + ' MB',
              url: '#',
              section: 'Uncategorized',
              uploadedAt: new Date().toISOString().split('T')[0],
            }, ...prev]);
            setUploads(prev => prev.filter(u => u.id !== id));
          }, 800);
        }, 1200);
      } else {
        setUploads(prev => prev.map(u => u.id === id ? { ...u, progress: Math.round(progress) } : u));
      }
    }, 300);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(f => simulateUpload(f.name));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(f => simulateUpload(f.name));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveContent = (id: string) => {
    setSavingId(id);
    setTimeout(() => {
      setContents(prev => prev.map(c => c.id === id ? { ...c, value: editValue, lastEdited: new Date().toISOString().split('T')[0] } : c));
      setSavingId(null);
      setEditingId(null);
    }, 600);
  };

  const handleStartEdit = (block: ContentBlock) => {
    setEditingId(block.id);
    setEditValue(block.value);
  };

  const sections = ['All', ...Array.from(new Set(assets.map(a => a.section)))];
  const [sectionFilter, setSectionFilter] = useState('All');
  const filteredAssets = sectionFilter === 'All' ? assets : assets.filter(a => a.section === sectionFilter);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Content Management</h1>
          <p className="text-sm text-white/40">Manage images, videos, and text across all app views</p>
        </div>
        <div className="flex gap-2">
          {(['media', 'text'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${activeTab === tab ? 'text-white' : 'text-white/40'}`}
              style={{ backgroundColor: activeTab === tab ? 'rgba(137,193,216,0.15)' : '#161b22', border: '1px solid #21262d' }}>
              {tab === 'media' ? 'Media Assets' : 'Text Content'}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'media' ? (
          <motion.div key="media" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            {/* Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all text-center ${dragOver ? 'border-cyan-400 bg-cyan-400/5' : 'border-[#21262d] hover:border-white/20 hover:bg-white/[0.02]'}`}
            >
              <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(137,193,216,0.1)' }}>
                <Upload size={24} style={{ color: '#89C1D8' }} />
              </div>
              <p className="text-sm font-semibold text-white mb-1">Drop files here or click to browse</p>
              <p className="text-xs text-white/30">Supports JPG, PNG, GIF, MP4, MOV up to 100MB</p>
            </div>

            {/* Upload Progress */}
            <AnimatePresence>
              {uploads.length > 0 && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="space-y-2 overflow-hidden">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/30">Uploading {uploads.length} file{uploads.length > 1 ? 's' : ''}</p>
                  {uploads.map(u => (
                    <UploadProgress key={u.id} fileName={u.name} progress={u.progress} status={u.status}
                      onCancel={() => setUploads(prev => prev.filter(x => x.id !== u.id))} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Section Filter */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {sections.map(s => (
                <button key={s} onClick={() => setSectionFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${sectionFilter === s ? 'text-white' : 'text-white/40'}`}
                  style={{ backgroundColor: sectionFilter === s ? 'rgba(137,193,216,0.15)' : '#161b22', border: '1px solid #21262d' }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Assets Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAssets.map((asset, i) => (
                <motion.div key={asset.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="group rounded-2xl overflow-hidden" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
                  {/* Thumbnail */}
                  <div className="relative h-36 overflow-hidden">
                    {asset.type === 'image' ? (
                      <img src={asset.url} alt={asset.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(137,193,216,0.06)' }}>
                        <FileVideo size={36} style={{ color: '#89C1D8' }} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase text-white"
                      style={{ backgroundColor: asset.type === 'image' ? 'rgba(74,222,128,0.8)' : 'rgba(167,139,250,0.8)' }}>
                      {asset.type}
                    </div>
                    {/* Hover actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                        <Eye size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id); }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'rgba(239,68,68,0.6)', backdropFilter: 'blur(4px)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <p className="text-xs font-medium text-white truncate">{asset.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-white/30">{asset.size}</span>
                      <span className="text-[10px] text-cyan-300/50">{asset.section}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredAssets.length === 0 && (
              <div className="p-12 text-center">
                <Image size={32} className="mx-auto mb-3 text-white/10" />
                <p className="text-sm text-white/30">No assets in this section</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
            {contents.map(block => {
              const isEditing = editingId === block.id;
              const isSaving = savingId === block.id;
              return (
                <motion.div key={block.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-4 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <FileText size={13} style={{ color: '#89C1D8' }} />
                        <span className="text-xs font-bold text-white">{block.label}</span>
                      </div>
                      <span className="text-[10px] text-cyan-300/40">{block.section} · Edited {block.lastEdited}</span>
                    </div>
                    {!isEditing && (
                      <button onClick={() => handleStartEdit(block)}
                        className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all flex-shrink-0">
                        <Type size={14} />
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2.5 rounded-xl text-sm bg-[#0f1117] text-white placeholder:text-white/20 outline-none border border-[#21262d] focus:border-cyan-400/40 resize-none"
                      />
                      <div className="flex gap-2">
                        <LoadingButton
                          loading={isSaving}
                          loadingText="Saving..."
                          onClick={() => handleSaveContent(block.id)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
                          style={{ backgroundColor: '#89C1D8' }}
                        >
                          <Save size={13} /> Save Changes
                        </LoadingButton>
                        <button onClick={() => setEditingId(null)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-white/50 flex items-center gap-1.5"
                          style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                          <RotateCcw size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-white/60 leading-relaxed">{block.value}</p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
