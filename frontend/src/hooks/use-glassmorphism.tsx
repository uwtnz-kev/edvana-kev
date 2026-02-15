import { useState, useCallback } from 'react';
import { GlassSettings, defaultGlassSettings, generateCSS, generateTailwindConfig } from '@/lib/glassmorphism';

export function useGlassmorphism() {
  const [settings, setSettings] = useState<GlassSettings>(defaultGlassSettings);

  const updateBlur = useCallback((blur: number) => {
    setSettings(prev => ({ ...prev, blur }));
  }, []);

  const updateOpacity = useCallback((opacity: number) => {
    setSettings(prev => ({ ...prev, opacity }));
  }, []);

  const updateBorderOpacity = useCallback((borderOpacity: number) => {
    setSettings(prev => ({ ...prev, borderOpacity }));
  }, []);

  const updateBorderStyle = useCallback((borderStyle: GlassSettings['borderStyle']) => {
    setSettings(prev => ({ ...prev, borderStyle }));
  }, []);

  const updateBrandColor = useCallback((brandColor: GlassSettings['brandColor']) => {
    setSettings(prev => ({ ...prev, brandColor }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultGlassSettings);
  }, []);

  const exportCSS = useCallback(() => {
    return generateCSS(settings);
  }, [settings]);

  const exportTailwindConfig = useCallback(() => {
    return generateTailwindConfig(settings);
  }, [settings]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }, []);

  return {
    settings,
    updateBlur,
    updateOpacity,
    updateBorderOpacity,
    updateBorderStyle,
    updateBrandColor,
    resetSettings,
    exportCSS,
    exportTailwindConfig,
    copyToClipboard
  };
}
