import React, {useEffect, useState, useRef} from 'react';
import {createPortal} from 'react-dom';

function Toast({toast, onClose}){
  useEffect(() => {
    const t = setTimeout(() => onClose(toast.id), toast.duration || 2500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <div className="mb-2 transform transition-all duration-150 ease-in-out bg-black/90 text-white px-4 py-2 rounded-md shadow-lg" role="status" aria-live="polite">
      {toast.message}
    </div>
  );
}

export default function ToastProvider({children}){
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    function handleEvent(e){
      const {message, duration} = e.detail || {};
      if (!message) return;
      const id = `${Date.now()}-${++idRef.current}`;
      setToasts((t) => [...t, {id, message, duration}]);
    }

    window.addEventListener('solecraft-toast', handleEvent);
    return () => window.removeEventListener('solecraft-toast', handleEvent);
  }, []);

  function removeToast(id){
    setToasts((t) => t.filter(x => x.id !== id));
  }

  return (
    <>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="pointer-events-none fixed right-4 top-6 z-50 flex flex-col items-end">
          <div className="max-w-xs w-full pointer-events-auto">
            {toasts.map(toast => (
              <Toast key={toast.id} toast={toast} onClose={removeToast} />
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
