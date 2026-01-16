'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useResumeStore } from '@/lib/resume-store';
import { ResumePDFDocument } from './ResumePDFDocument';

interface PDFDownloadButtonProps {
  filename?: string;
}

export function PDFDownloadButton({ filename = 'resume.pdf' }: PDFDownloadButtonProps) {
  const { resumeData } = useResumeStore();
  const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [PDFDownloadLink, setPDFDownloadLink] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import PDFDownloadLink on client side only
    import('@react-pdf/renderer').then((mod) => {
      setPDFDownloadLink(() => mod.PDFDownloadLink);
    });
  }, []);

  if (!isClient || !PDFDownloadLink) {
    return (
      <Button disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading PDF...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDFDocument data={resumeData} />}
      fileName={filename}
    >
      {({ loading }: { loading: boolean }) => (
        <Button disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
