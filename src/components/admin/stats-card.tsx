import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  changeIcon: LucideIcon;
  isDecrease?: boolean;
}

export function StatsCard({ title, value, change, icon: Icon, changeIcon: ChangeIcon, isDecrease = false }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <ChangeIcon className={cn("h-3 w-3 mr-1", isDecrease ? "text-red-500 transform rotate-180" : "text-green-500")} />
          <span className={cn(isDecrease ? "text-red-500" : "text-green-500", "mr-1")}>
            {change.split(' ')[0]}
          </span>
          {change.substring(change.indexOf(' '))}
        </p>
      </CardContent>
    </Card>
  )
}
