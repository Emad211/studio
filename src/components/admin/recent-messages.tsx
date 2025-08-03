import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const messages = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", message: "+$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", message: "+$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", message: "+$299.00" },
    { name: "William Kim", email: "will@email.com", message: "+$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", message: "+$39.00" },
]

export function RecentMessages() {
  return (
    <div className="space-y-8">
      {messages.map((msg, index) => (
        <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
            <AvatarImage src={`https://placehold.co/40x40.png?text=${msg.name.charAt(0)}`} alt="Avatar" data-ai-hint="person avatar"/>
            <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{msg.name}</p>
            <p className="text-sm text-muted-foreground">{msg.email}</p>
            </div>
            <div className="ml-auto font-medium">{msg.message}</div>
        </div>
      ))}
    </div>
  )
}
