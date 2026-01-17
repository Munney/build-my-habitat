import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HabitatBuilder - Build Safe Pet Habitats';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background gradient accents */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(ellipse 800px 600px at 20% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 800px 600px at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            zIndex: 1,
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #10b981 0%, #22d3ee 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            HabitatBuilder
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#e2e8f0',
              textAlign: 'center',
              marginBottom: 16,
              maxWidth: '900px',
            }}
          >
            Smart Reptile & Aquarium Setup Configurator
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.5,
              marginBottom: 40,
            }}
          >
            Build safe, complete, and species-appropriate habitats with research-backed recommendations.
          </div>
          
          {/* Call-to-Action Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #10b981 0%, #22d3ee 100%)',
              borderRadius: '12px',
              fontSize: 28,
              fontWeight: 700,
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
            }}
          >
            Start Building →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

