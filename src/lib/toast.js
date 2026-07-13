export function showToast(message, duration = 2500) {
  try {
    const id = `solecraft-toast-${Date.now()}`;
    const el = document.createElement('div');
    el.id = id;
    el.className = 'fixed right-4 top-6 z-50 rounded-md bg-black/90 text-white text-sm px-4 py-2 shadow-lg';
    el.style.opacity = '0';
    el.style.transition = 'opacity 160ms ease-in-out, transform 160ms ease-in-out';
    el.style.transform = 'translateY(-6px)';
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      setTimeout(() => el.remove(), 180);
    }, duration);
  } catch (e) {
    // ignore
  }
}

export default showToast;
