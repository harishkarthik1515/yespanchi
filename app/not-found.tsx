import { Button, Container } from '@/components/ui';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="font-mono text-accent">404</p>
      <h1 className="text-5xl font-medium">This page is off the network.</h1>
      <p className="max-w-lg text-lg text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="outline">Contact us</Button>
      </div>
    </Container>
  );
}
