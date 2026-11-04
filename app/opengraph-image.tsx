import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const alt = 'YesPanchi — Cybersecurity with a Conscience';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFFFF', color: '#1A1517', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#C81E3A', textTransform: 'uppercase' }}>YesPanchi · IITM Research Park</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          <span>Cybersecurity</span>
          <span style={{ color: '#C81E3A' }}>with a Conscience.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#8F8386' }}>VAPT · ISO 27001 · PCI DSS · Post-quantum SSL · Enterprise AI</div>
      </div>
    ),
    size
  );
}
