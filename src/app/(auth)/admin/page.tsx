import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/admin/overview-chart"
import { RecentMessages } from "@/components/admin/recent-messages"
import { StatsCard } from "@/components/admin/stats-card"
import { DollarSign, Users, CreditCard, Activity, ArrowUp, ArrowDown } from "lucide-react"

export default function AdminDashboardPage() {
  return (
      <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard 
                title="درآمد کل" 
                value="۴۵,۲۳۱,۸۹۰ تومان" 
                change="+۲۰.۱٪ از ماه گذشته"
                icon={DollarSign}
                changeIcon={ArrowUp}
              />
              <StatsCard 
                title="دنبال‌کنندگان" 
                value="+۲۳۵۰" 
                change="+۱۸۰.۱٪ از ماه گذشته"
                icon={Users}
                changeIcon={ArrowUp}
              />
              <StatsCard 
                title="فروش" 
                value="+۱۲,۲۳۴" 
                change="+۱۹٪ از ماه گذشته"
                icon={CreditCard}
                changeIcon={ArrowUp}
              />
               <StatsCard 
                title="فعالیت کاربران" 
                value="+۵۷۳" 
                change="+۲٪ از ماه گذشته"
                icon={Activity}
                changeIcon={ArrowUp}
                isDecrease={true}
              />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                  <CardHeader>
                      <CardTitle>بررسی اجمالی</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                      <OverviewChart />
                  </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                  <CardHeader>
                      <CardTitle>پیام‌های اخیر</CardTitle>
                      <CardDescription>
                          شما ۲۶۵ پیام خوانده نشده دارید.
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
