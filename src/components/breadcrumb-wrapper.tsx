'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useSidebarStore } from '@/lib/store/sidebar-store';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from './ui/button';


export function CustomBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  const { isOpen, toggle } = useSidebarStore();

  // This part seems to belong to the sidebar itself, not the breadcrumb component.
  // It's kept here to match your original structure but consider moving it.
  if (isOpen) {
    return (
      <div className="relative w-12 h-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="absolute top-3 right-3 z-10 p-2"
          aria-label="Close sidebar"
        >
          <PanelLeftClose className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center p-2'>
      {/* Open Sidebar Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggle}
        className="mr-2" // Add margin to create space
        aria-label="Open sidebar"
      >
        <PanelLeftOpen className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </Button>

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = '/' + pathSegments.slice(0, index + 1).join('/');
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {isLast ? (
                    <span className="text-sm font-medium">{label}</span>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}