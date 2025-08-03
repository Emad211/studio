import { StatsCard } from "@/components/admin/stats-card"
import { ArrowUp, Users, Eye, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/admin/overview-chart"
import { RecentMessages } from "@/components/admin/recent-messages"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Visitors"
          value="12,345"
          change="+20.1% from last month"
          icon={Users}
          changeIcon={ArrowUp}
        />
        <StatsCard
          title="Page Views"
          value="54,890"
          change="+15.2% from last month"
          icon={Eye}
          changeIcon={ArrowUp}
        />
        <StatsCard
          title="Messages Received"
          value="1,250"
          change="+5.5% from last month"
          icon={Mail}
          changeIcon={ArrowUp}
        />
        <StatsCard
          title="Conversion Rate"
          value="4.8%"
          change="-1.2% from last month"
          icon={ArrowUp} // Placeholder
          changeIcon={ArrowUp}
          isDecrease
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>
              You have 5 unread messages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentMessages />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
