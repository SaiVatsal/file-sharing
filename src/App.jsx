import React, { useState } from 'react';
import {
  Folder,
  HardDrive,
  FolderGit2,
  ShieldCheck,
  Image as ImageIcon,
  Users,
  FileText,
  FileCode,
  File,
  UploadCloud,
  Share2,
  Lock,
  Unlock,
  History,
  Eye,
  Trash2,
  Download,
  Search,
  PieChart,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    storageQuota,
    folders,
    activeFolder,
    files,
    isUploading,
    setActiveFolder,
    uploadFile,
    deleteFile,
    updatePermissions
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [sharePermission, setSharePermission] = useState('view');
  const [shareExpiry, setShareExpiry] = useState('7d');
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('files'); // 'files' | 'analytics'

  const filteredFiles = files.filter((f) => {
    const matchesFolder = activeFolder === 'f-all' || f.folderId === activeFolder;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleDropSim = (e) => {
    e.preventDefault();
    uploadFile({
      name: 'Simulated_Quantum_Blueprint.pdf',
      size: '22.8 MB',
      type: 'pdf'
    });
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return <FileText className="w-5 h-5 text-[#0284c7]" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-emerald-400" />;
      case 'code':
        return <FileCode className="w-5 h-5 text-amber-400" />;
      default:
        return <File className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col font-sans">
      {/* Cloud Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284c7] to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-[#0284c7]/20">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block">SKYVAULT // DISTRIBUTED</span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">Zero-Knowledge Encrypted Object Storage</span>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-[#1e293b] p-1 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'files' ? 'bg-[#0284c7] text-white font-bold' : 'hover:text-white'}`}
          >
            File Repository
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'analytics' ? 'bg-[#0284c7] text-white font-bold' : 'hover:text-white'}`}
          >
            Storage & Telemetry
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search vault documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e293b] border border-slate-700/80 pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#0284c7]"
          />
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar: Folder Directory & Quota */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Storage Directories</h3>
            <div className="space-y-1">
              {folders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFolder(f.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
                    activeFolder === f.id
                      ? 'bg-[#0284c7] text-white font-bold shadow-md shadow-[#0284c7]/20'
                      : 'text-slate-300 hover:bg-[#1e293b]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Folder className="w-4 h-4" />
                    <span>{f.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Storage Quota Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Vault Quota</span>
              <span className="text-[#0284c7] font-bold">36.8% Used</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0284c7] to-cyan-400 rounded-full" style={{ width: '36.8%' }} />
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex justify-between">
              <span>18.4 GB Used</span>
              <span>50 GB Max</span>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 space-y-6">
          {activeTab === 'files' ? (
            <div className="space-y-6">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropSim}
                onClick={handleDropSim}
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition cursor-pointer flex flex-col items-center justify-center gap-3 ${
                  isUploading
                    ? 'border-[#0284c7] bg-[#0284c7]/10 animate-pulse'
                    : 'border-slate-700 bg-[#0f172a]/60 hover:border-[#0284c7] hover:bg-[#0f172a]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1e293b] border border-slate-700 flex items-center justify-center text-[#0284c7]">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isUploading ? 'Chunking & Encrypting File in Memory...' : 'Drop files here or click to browse'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Supports high-res imagery, PDF archives, raw datasets up to 10GB per chunk.
                  </p>
                </div>
              </div>

              {/* File Listing Table */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white">Encrypted Files ({filteredFiles.length})</h3>
                  <span className="text-xs font-mono text-slate-400">AES-256 GCM In-Flight</span>
                </div>

                <div className="space-y-2">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-4 bg-[#1e293b]/60 hover:bg-[#1e293b] border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2.5 rounded-xl bg-[#0f172a] border border-slate-800">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="truncate">
                          <h4 className="text-sm font-bold text-white truncate">{file.name}</h4>
                          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-0.5">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.updatedAt}</span>
                            <span>•</span>
                            <span className="text-cyan-400 font-bold">{file.version}</span>
                          </div>
                        </div>
                      </div>

                      {/* File Controls */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setSelectedFile(file);
                            setShowPreviewModal(true);
                          }}
                          className="p-2 bg-[#0f172a] hover:bg-slate-800 rounded-xl text-slate-300 transition"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFile(file);
                            setShowVersionModal(true);
                          }}
                          className="p-2 bg-[#0f172a] hover:bg-slate-800 rounded-xl text-slate-300 transition"
                          title="Version History"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFile(file);
                            setShowShareModal(true);
                          }}
                          className="p-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl transition"
                          title="Share Link & Permissions"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-2 bg-[#0f172a] hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-xl transition"
                          title="Delete File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ANALYTICS TAB */
            <div className="space-y-6">
              <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Storage Distribution Breakdown</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Partition utilization across cryptographic block pools</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Documents & PDF</span>
                    <div className="text-xl font-bold text-white mt-1">{storageQuota.breakdown.documents}</div>
                  </div>
                  <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Media & 4K Imagery</span>
                    <div className="text-xl font-bold text-cyan-400 mt-1">{storageQuota.breakdown.media}</div>
                  </div>
                  <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Compressed Archives</span>
                    <div className="text-xl font-bold text-amber-400 mt-1">{storageQuota.breakdown.archives}</div>
                  </div>
                  <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Free Allocation</span>
                    <div className="text-xl font-bold text-emerald-400 mt-1">{storageQuota.breakdown.available}</div>
                  </div>
                </div>

                {/* Most Downloaded and Shared Files */}
                <div className="border-t border-slate-800 pt-5 space-y-3">
                  <h4 className="text-sm font-bold text-white">Egress Activity & Most Shared Objects</h4>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="p-3 bg-[#1e293b] rounded-2xl flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200">{file.name}</span>
                        <div className="flex gap-4 text-slate-400">
                          <span>Downloads: <b className="text-white">{file.downloads}</b></span>
                          <span>Shares: <b className="text-cyan-400">{file.shares}</b></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: SHARE & PERMISSIONS */}
      {showShareModal && selectedFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Granular Access & Share Link</h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Access Role Level</label>
                <select
                  value={sharePermission}
                  onChange={(e) => setSharePermission(e.target.value)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="view">View Only (Restricted Download)</option>
                  <option value="edit">Full Editor & Version Upload</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Time-To-Live Expiry</label>
                <select
                  value={shareExpiry}
                  onChange={(e) => setShareExpiry(e.target.value)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="24h">Expires in 24 Hours</option>
                  <option value="7d">Expires in 7 Days</option>
                  <option value="30d">Expires in 30 Days</option>
                  <option value="never">Permanent Sovereign Link</option>
                </select>
              </div>

              <div className="p-3 bg-[#1e293b] rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 break-all">
                https://skyvault.io/share/{selectedFile.id}?token=e2e94a8...
              </div>

              <button
                onClick={() => {
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className="w-full py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold transition"
              >
                {isCopied ? '✓ Share Token Copied' : 'Copy Ephemeral Share Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW */}
      {showPreviewModal && selectedFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">{selectedFile.name}</h3>
              <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-800 font-mono text-xs max-h-96 overflow-y-auto whitespace-pre-wrap text-slate-200">
              {selectedFile.type === 'image' ? (
                <img src={selectedFile.previewContent} alt="Preview" className="rounded-xl max-h-72 mx-auto object-cover" />
              ) : (
                selectedFile.previewContent
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VERSION HISTORY */}
      {showVersionModal && selectedFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Immutable Version Ledger</h3>
              <button onClick={() => setShowVersionModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {selectedFile.versions.map((ver, idx) => (
                <div key={idx} className="p-3 bg-[#1e293b] rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-cyan-400">{ver.version} ({ver.size})</div>
                    <div className="text-slate-400 text-[10px]">Author: {ver.author} • {ver.date}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">Rollback</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cloud Footer */}
      <footer className="border-t border-slate-800 bg-[#0b1329] py-6 text-center text-xs text-slate-500 font-mono">
        © 2026 SKYVAULT DISTRIBUTED FILE PLATFORM. AES-256 CHUNKED OBJECT STORAGE.
      </footer>
    </div>
  );
}
