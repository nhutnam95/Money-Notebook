import { useEffect, useState } from 'react';
import './InstallPrompt.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    const checkInstalled = async () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setInstalled(true);
        setShowPrompt(false);
      }
    };

    checkInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setInstalled(true);
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || installed) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <div className="install-prompt-header">
          <span className="install-prompt-icon">📱</span>
          <h3>Cài đặt ứng dụng</h3>
        </div>
        <p>Cài đặt "Quản Lý Chi Tiêu" trên màn hình chính của bạn để truy cập nhanh hơn!</p>
        <div className="install-prompt-actions">
          <button className="install-btn" onClick={handleInstall}>
            Cài đặt
          </button>
          <button className="dismiss-btn" onClick={handleDismiss}>
            Sau này
          </button>
        </div>
      </div>
    </div>
  );
}
