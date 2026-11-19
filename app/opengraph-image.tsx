import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const alt = 'YesPanchi | Quantum-Safe Security and AI Governance';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFFFF', color: '#0F1F38', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#1F4E79', textTransform: 'uppercase' }}>YesPanchi · Chennai</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          <span>Quantum-safe,</span>
          <span style={{ color: '#1F4E79' }}>starting today.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#5A6878' }}>Post-quantum security · AI governance · Digital trust</div>
      </div>
    ),
    size
  );
}
