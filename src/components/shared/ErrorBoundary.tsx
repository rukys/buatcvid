'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('buatcv-resume-store');
    } catch (e) {
      console.error(e);
    }
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-gray-800 font-body">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-md text-center space-y-6">
            <div className="w-16 h-16 bg-error-50 text-error-500 rounded-full flex items-center justify-center mx-auto border border-error-100">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
                Terjadi Kesalahan Aplikasi
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mohon maaf, terjadi kesalahan teknis yang tidak terduga saat memuat halaman ini.
              </p>
              {this.state.error && (
                <div className="bg-gray-50 text-left p-3 rounded-md border border-gray-200 overflow-x-auto max-h-32 text-[10px] text-gray-500 font-mono mt-4 leading-normal">
                  {this.state.error.toString()}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => window.location.reload()}
              >
                Muat Ulang Halaman
              </Button>
              <Button
                type="button"
                variant="primary"
                className="flex-1 bg-error-600 hover:bg-error-500 hover:shadow-md border-none"
                onClick={this.handleReset}
              >
                Reset & Mulai Baru
              </Button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
