import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

interface RootErrorBoundaryProps {
  children: React.ReactNode;
}

interface RootErrorBoundaryState {
  hasError: boolean;
  error: any;
}

// Simple Error Boundary for the root
// Fixed: Explicitly typed the Component to resolve "Property 'state' does not exist" and "Property 'props' does not exist" errors.
class RootErrorBoundary extends React.Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  // Fixed: Added explicit state declaration to ensure the property exists on the class type.
  state: RootErrorBoundaryState = { hasError: false, error: null };

  constructor(props: RootErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    // Fixed: Accessed state with explicit typing through RootErrorBoundaryState interface.
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#ff2d55', fontFamily: 'monospace', backgroundColor: '#000', minHeight: '100vh' }}>
          <h1>CRITICAL BOOTSTRAP FAILURE</h1>
          <p>The application encountered a fatal error during initialization.</p>
          <pre style={{ background: '#111', padding: '20px', borderRadius: '8px', overflow: 'auto', border: '1px solid #333' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#ff2d55', color: 'white', border: 'none', cursor: 'pointer' }}>
            RETRY SYSTEM SYNC
          </button>
        </div>
      );
    }
    // Fixed: Accessed props with explicit typing through RootErrorBoundaryProps interface.
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RootErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RootErrorBoundary>
    </React.StrictMode>
  );
}
