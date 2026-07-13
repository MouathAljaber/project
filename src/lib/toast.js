export function showToast(message, duration = 2500) {
  try {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      const ev = new CustomEvent('solecraft-toast', {detail: {message, duration}});
      window.dispatchEvent(ev);
      return;
    }
  } catch (e) {
    // fallback below
  }

  // Fallback for non-DOM environments: simple console message
  try {
    // eslint-disable-next-line no-console
    console.log('[toast]', message);
  } catch (e) {
    // ignore
  }
}

export default showToast;
