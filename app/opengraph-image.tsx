import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const alt = 'YesPanchi — Cybersecurity with a Conscience';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0A0A0A', color: '#F2EDE4', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#B08D63', textTransform: 'uppercase' }}>YesPanchi · IITM Research Park</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          <span>Cybersecurity</span>
          <span style={{ color: '#B08D63' }}>with a Conscience.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#B5ADA2' }}>VAPT · ISO 27001 · PCI DSS · Post-quantum SSL · Enterprise AI</div>
      </div>
    ),
    size
  );
}
