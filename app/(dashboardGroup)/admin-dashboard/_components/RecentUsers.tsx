// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Users } from 'lucide-react'
// import React from 'react'
// import { recentUsers } from '../_config/dashboardUitls'
// import { AvatarFallback } from 'radix-ui/avatar'
// import { Badge } from '@/components/ui/badge'
// import { Avatar } from '@/components/ui/avatar'

// export default function RecentUsers() {
//   return (
//     <Card className="overflow-hidden border-muted/60 transition-all duration-300 hover:shadow-lg">
//       <CardHeader className="border-b bg-linear-to-br from-blue-500/5 to-transparent">
//         <CardTitle className="flex items-center gap-2">
//           <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
//             <Users className="size-4" />
//           </div>
//           Recent Users
//         </CardTitle>

//         <p className="text-sm text-muted-foreground">
//           Recently registered users
//         </p>
//       </CardHeader>

//       <CardContent className="space-y-2 p-5">
//         {recentUsers.map((user) => (
//           <div
//             key={user.id}
//             className="group flex items-center justify-between gap-4 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-muted/40 hover:shadow-sm"
//           >
//             <div className="flex min-w-0 items-center gap-3">
//               <Avatar className="size-10 border-2 border-background shadow-sm transition-transform duration-300 group-hover:scale-105">
//                 <AvatarFallback className="bg-gradient-to-br from-primary/20 to-violet-500/20 font-semibold text-primary">
//                   {user.name.trim().charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="min-w-0">
//                 <p className="truncate text-sm font-semibold">{user.name}</p>

//                 <p className="truncate text-xs text-muted-foreground">
//                   {user.email}
//                 </p>
//               </div>
//             </div>

//             <Badge
//               variant="outline"
//               className="shrink-0 transition-colors group-hover:border-primary/30 group-hover:text-primary"
//             >
//               {user.role}
//             </Badge>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }
