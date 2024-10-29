// src/components/Icons/index.jsx
export const IconTrack = ({ className }:any) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  
  export const IconScan = ({ className }:any) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M7 3H5a2 2 0 00-2 2v2M17 3h2a2 2 0 012 2v2M7 21H5a2 2 0 01-2-2v-2m12 4h2a2 2 0 002-2v-2" strokeWidth="2"/>
      <rect x="9" y="9" width="6" height="6" strokeWidth="2"/>
    </svg>
  );
  
  export const IconCommunity = ({ className }:any) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" strokeWidth="2"/>
    </svg>
  );
  
  export const IconCalories = ({ className }:any) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 4v16m4-8H8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );