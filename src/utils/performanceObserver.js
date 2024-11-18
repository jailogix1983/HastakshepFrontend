export function observeLCP() {
    if (typeof window === 'undefined') return; // Skip if running on the server
  
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP candidate:', entry.startTime, entry);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }
  