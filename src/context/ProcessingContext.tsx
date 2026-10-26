import React, { createContext, useContext, useState, useCallback } from 'react';
import { ProcessingScreen, ProcessingCustomStages } from '../components/ProcessingScreen';
import { ToolRoute } from '../types';

export interface StartProcessingOptions {
  fileName: string;
  fileSize?: number;
  targetToolRoute?: ToolRoute;
  onComplete: () => void;
  durationMs?: number;
  customStages?: ProcessingCustomStages;
}

interface ProcessingContextValue {
  startProcessing: (options: StartProcessingOptions) => void;
  isProcessing: boolean;
}

const ProcessingContext = createContext<ProcessingContextValue | null>(null);

export const useProcessing = () => {
  return useContext(ProcessingContext);
};

interface ProcessingProviderProps {
  children: React.ReactNode;
  onProcessingFinished?: (route?: ToolRoute) => void;
}

export const ProcessingProvider: React.FC<ProcessingProviderProps> = ({
  children,
  onProcessingFinished,
}) => {
  const [activeJob, setActiveJob] = useState<StartProcessingOptions | null>(null);

  const startProcessing = useCallback((options: StartProcessingOptions) => {
    setActiveJob(options);
  }, []);

  const handleComplete = useCallback(() => {
    if (activeJob) {
      const savedJob = activeJob;
      setActiveJob(null);
      savedJob.onComplete();
      if (onProcessingFinished) {
        onProcessingFinished(savedJob.targetToolRoute);
      }
    }
  }, [activeJob, onProcessingFinished]);

  return (
    <ProcessingContext.Provider
      value={{
        startProcessing,
        isProcessing: activeJob !== null,
      }}
    >
      {children}
      {activeJob && (
        <ProcessingScreen
          isOpen={true}
          fileName={activeJob.fileName}
          fileSize={activeJob.fileSize}
          durationMs={activeJob.durationMs}
          customStages={activeJob.customStages}
          onComplete={handleComplete}
        />
      )}
    </ProcessingContext.Provider>
  );
};
