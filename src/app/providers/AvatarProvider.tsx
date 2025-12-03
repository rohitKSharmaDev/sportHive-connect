'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AvatarContextType {
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
  updateAvatar: (url: string) => void;
  clearAvatar: () => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const updateAvatar = (url: string) => {
    setAvatarUrl(url);
  };

  const clearAvatar = () => {
    setAvatarUrl(null);
  };

  return (
    <AvatarContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl,
        updateAvatar,
        clearAvatar,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (context === undefined) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};