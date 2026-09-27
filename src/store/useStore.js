import { create } from 'zustand';

export const useStore = create((set, get) => ({
  storageQuota: {
    totalBytes: 50 * 1024 * 1024 * 1024, // 50 GB
    usedBytes: 18.4 * 1024 * 1024 * 1024, // 18.4 GB
    filesCount: 142,
    breakdown: {
      documents: '6.2 GB',
      media: '9.8 GB',
      archives: '2.4 GB',
      available: '31.6 GB'
    }
  },

  folders: [
    { id: 'f-all', name: 'All Files', icon: 'HardDrive' },
    { id: 'f-projects', name: 'Engineering Blueprints', icon: 'FolderGit2' },
    { id: 'f-legal', name: 'Legal & Compliance', icon: 'ShieldCheck' },
    { id: 'f-media', name: 'Media Assets & 4K Stills', icon: 'Image' },
    { id: 'f-shared', name: 'Shared With Me', icon: 'Users' }
  ],

  activeFolder: 'f-all',

  files: [
    {
      id: 'doc-1',
      name: 'Q3_Architectural_Audit_v2.4.pdf',
      folderId: 'f-projects',
      size: '14.2 MB',
      type: 'pdf',
      updatedAt: '2026-09-24',
      downloads: 48,
      shares: 12,
      accessRole: 'edit',
      isLocked: false,
      version: 'v2.4',
      versions: [
        { version: 'v2.4', date: '2026-09-24', size: '14.2 MB', author: 'Elena Rostova' },
        { version: 'v2.3', date: '2026-09-18', size: '13.9 MB', author: 'Marcus Vance' },
        { version: 'v1.0', date: '2026-08-01', size: '11.0 MB', author: 'Alexander Brody' }
      ],
      previewContent: 'OFFICIAL CIVIC SYSTEMS ARCHITECTURE SPECIFICATION\nClassification: RESTRICTED\nSection 1: Microkernel isolation protocols and zero-knowledge storage proofs.'
    },
    {
      id: 'img-1',
      name: 'Datacenter_Server_Cluster_Interior.png',
      folderId: 'f-media',
      size: '28.5 MB',
      type: 'image',
      updatedAt: '2026-09-22',
      downloads: 92,
      shares: 24,
      accessRole: 'view',
      isLocked: false,
      version: 'v1.0',
      versions: [
        { version: 'v1.0', date: '2026-09-22', size: '28.5 MB', author: 'Sarah Lin' }
      ],
      previewContent: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'doc-2',
      name: 'Municipal_Data_Privacy_Treaty.docx',
      folderId: 'f-legal',
      size: '4.8 MB',
      type: 'doc',
      updatedAt: '2026-09-20',
      downloads: 31,
      shares: 6,
      accessRole: 'view',
      isLocked: true,
      version: 'v1.2',
      versions: [
        { version: 'v1.2', date: '2026-09-20', size: '4.8 MB', author: 'Legal Counsel' }
      ],
      previewContent: 'DATA SOVEREIGNTY AGREEMENT (2026 REVISION)\nAll resident biometric and cryptographic hashes shall reside in air-gapped sovereign partitions.'
    },
    {
      id: 'code-1',
      name: 'kubernetes-cluster-deployment.yaml',
      folderId: 'f-projects',
      size: '184 KB',
      type: 'code',
      updatedAt: '2026-09-26',
      downloads: 114,
      shares: 19,
      accessRole: 'edit',
      isLocked: false,
      version: 'v3.0',
      versions: [
        { version: 'v3.0', date: '2026-09-26', size: '184 KB', author: 'DevOps Lead' }
      ],
      previewContent: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: skyvault-cluster-engine\nspec:\n  replicas: 12\n  selector:\n    matchLabels:\n      app: skyvault-node'
    }
  ],

  uploadQueue: [],
  isUploading: false,

  // Actions
  setActiveFolder: (folderId) => set({ activeFolder: folderId }),

  uploadFile: (newFile) => {
    set({ isUploading: true });
    const tempId = `file-${Date.now()}`;
    const fileObj = {
      id: tempId,
      name: newFile.name || 'Uploaded_Document.pdf',
      folderId: get().activeFolder === 'f-all' ? 'f-projects' : get().activeFolder,
      size: newFile.size || '8.4 MB',
      type: newFile.type || 'pdf',
      updatedAt: 'Today',
      downloads: 0,
      shares: 0,
      accessRole: 'view',
      isLocked: false,
      version: 'v1.0',
      versions: [
        { version: 'v1.0', date: 'Today', size: newFile.size || '8.4 MB', author: 'Current User' }
      ],
      previewContent: 'Document initialized into SkyVault encrypted storage. SHA-256 chunk validated.'
    };

    setTimeout(() => {
      set((state) => ({
        files: [fileObj, ...state.files],
        isUploading: false
      }));
    }, 1000);
  },

  deleteFile: (id) => set((state) => ({
    files: state.files.filter((f) => f.id !== id)
  })),

  updatePermissions: (fileId, { accessRole, isLocked }) => set((state) => ({
    files: state.files.map((f) => f.id === fileId ? { ...f, accessRole, isLocked } : f)
  }))
}));
