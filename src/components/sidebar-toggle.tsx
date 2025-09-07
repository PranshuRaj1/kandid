    "use client"

    import { Button } from "@/components/ui/button"
    import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
    import { useSidebarStore } from "@/lib/store/sidebar-store"
    import { cn } from "@/lib/utils"

    interface SidebarToggleProps {
    className?: string
    size?: "sm" | "default" | "lg"
    variant?: "ghost" | "outline" | "default"
    }

    export function SidebarToggle({ className, size = "sm", variant = "ghost" }: SidebarToggleProps) {
    const { isOpen, toggle } = useSidebarStore()

    return (
        <Button
        variant={variant}
        size={size}
        onClick={toggle}
        className={cn("p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors", className)}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
        {isOpen ? (
            <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
        ) : (
            <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
        )}
        </Button>
    )
    }
