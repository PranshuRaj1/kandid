'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useSidebarStore } from '@/lib/store/sidebar-store';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from './ui/button';

export function AppHeader() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  const { isOpen, toggle } = useSidebarStore();

  return (
    <header className='flex items-center p-2  flex-shrink-0'>
      {/* 1. Always-visible toggle button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggle}
        className="mr-2"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <PanelLeftClose className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <PanelLeftOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </Button>

      {/* 2. Always-visible breadcrumb */}
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
    </header>
  );
}