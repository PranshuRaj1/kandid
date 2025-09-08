"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, Clock, CheckCircle, AlertCircle, MessageSquare, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeadWithCampaign } from "@/db/schema"; // Import the detailed type

// This function fetches leads from our API. It's used by TanStack Query.
const fetchLeads = async ({ pageParam = 0, queryKey }: any) => {
  const [, { search }] = queryKey;
  const res = await fetch(`/api/leads?offset=${pageParam}&limit=10&query=${search}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const statusConfig = {
  Pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
  },
  Contacted: {
    label: "Contacted",
    color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  },
  Responded: {
    label: "Responded",
    color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  },
  Converted: {
    label: "Converted",
    color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
  },
};

const LeadsTableSkeleton = () => (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Skeleton className="h-10 w-full max-w-sm" />
        </div>
        <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground w-2/5">Name</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground w-1/5">Campaign</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground w-1/5">Last Contact</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground w-1/5">Status</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div>
                                    <Skeleton className="h-4 w-32 mb-1" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            </div>
                        </td>
                        <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                        <td className="p-4"><Skeleton className="h-4 w-28" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Card>
);

const LeadProfileSidebar = ({
  lead,
  isOpen,
  onClose,
}: {
  lead: LeadWithCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!lead) return null;

  return (
    <>
      <div 
        className={cn("fixed inset-0 bg-black/30 z-40 transition-opacity", isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}
        onClick={onClose} 
      />
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Lead Details</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                    <X className="h-5 w-5" />
                </Button>
            </div>
            <div className="overflow-y-auto flex-grow pr-2">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} alt={lead.name || ""} />
                        <AvatarFallback>{lead.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{lead.name}</h3>
                        <p className="text-sm text-muted-foreground">{lead.company || "No company provided"}</p>
                    </div>
                </div>
                
                <div className="space-y-4 text-sm">
                   <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                       <span className="font-medium text-gray-600 dark:text-gray-400">Status</span>
                       <Badge variant="outline" className={statusConfig[lead.status as keyof typeof statusConfig].color}>
                           {statusConfig[lead.status as keyof typeof statusConfig].label}
                       </Badge>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                       <span className="font-medium text-gray-600 dark:text-gray-400">Email</span>
                       <span className="text-gray-900 dark:text-gray-100">{lead.email}</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                       <span className="font-medium text-gray-600 dark:text-gray-400">Campaign</span>
                       <span className="text-gray-900 dark:text-gray-100">{lead.campaign?.name || "N/A"}</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                       <span className="font-medium text-gray-600 dark:text-gray-400">Last Contact</span>
                       <span className="text-gray-900 dark:text-gray-100">{lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleDateString() : 'N/A'}</span>
                   </div>
                </div>
            </div>
             <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <Button className="flex-1">Contact Lead</Button>
                <Button variant="outline" className="flex-1">Update Status</Button>
            </div>
        </div>
      </div>
    </>
  );
};


export function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<LeadWithCampaign | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteQuery({
    queryKey: ['leads', { search }],
    queryFn: fetchLeads,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length * 10 : undefined;
    },
    initialPageParam: 0,
  });

  const lastElementRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const handleLeadClick = (lead: LeadWithCampaign) => {
    setSelectedLead(lead);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
  }

  if (isLoading) {
    return <div className="p-4 sm:p-6 lg:p-8"><LeadsTableSkeleton /></div>;
  }

  if (status === 'error') {
    return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;
  }

  const allLeads = data?.pages.flat() || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                    placeholder="Search leads..." 
                    className="pl-10 w-full max-w-sm"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground w-2/5">Name</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground w-1/5">Campaign</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground w-1/5">Last Contact</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground w-1/5">Status</th>
              </tr>
            </thead>
            <tbody>
              {allLeads.map((lead, index) => {
                const isLastElement = allLeads.length === index + 1;
                return (
                  <tr
                    ref={isLastElement ? lastElementRef : null}
                    key={lead.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => handleLeadClick(lead)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                           <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} alt={lead.name || ""} />
                           <AvatarFallback>{lead.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{lead.campaign?.name || 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                      {lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusConfig[lead.status as keyof typeof statusConfig].color}>
                        {statusConfig[lead.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isFetchingNextPage && (
          <div className="text-center p-4 text-muted-foreground">Loading more...</div>
        )}
        {!hasNextPage && !isLoading && (
          <div className="text-center p-4 text-muted-foreground">You've reached the end.</div>
        )}
        {allLeads.length === 0 && !isLoading && (
            <div className="text-center p-8 text-gray-500">No leads found.</div>
        )}
      </Card>

      <LeadProfileSidebar lead={selectedLead} isOpen={sidebarOpen} onClose={closeSidebar} />
    </div>
  );
}