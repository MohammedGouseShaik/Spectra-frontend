
"use client";
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Play } from "lucide-react";

// export default function ChatHistoryComponent() {
//   return (
//     <div className="flex h-screen p-4 space-x-4">
//       {/* Chat History Sidebar */}
//       <Card className="w-1/3 h-full overflow-hidden">
//         <CardContent className="h-full p-4">
//           <h2 className="text-xl font-semibold mb-4">Chat History</h2>
//           <ScrollArea className="h-[calc(100%-50px)] pr-2">
//             <div className="space-y-2">
//               {[...Array(20)].map((_, i) => (
//                 <div key={i} className="p-2 bg-gray-100 rounded-md">
//                   Chat Message {i + 1}
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       </Card>

//       {/* Video Player & Chat Input */}
//       <div className="flex flex-col w-2/3 h-full">
//         {/* Video Player */}
//         <Card className="flex-1 flex items-center justify-center bg-black">
//           <CardContent className="flex items-center justify-center h-full">
//             <Play className="w-16 h-16 text-white" />
//           </CardContent>
//         </Card>
        
//         {/* Chat Input */}
//         <Card className="mt-4">
//           <CardContent className="p-4 flex items-center space-x-2">
//             <Input placeholder="Type a message..." className="flex-1" />
//             <Button>Send</Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Send, User, Bot } from "lucide-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const chatHistoryItems = [
  { id: 1, name: "Alice", message: "Hello!", date: new Date(), read: false },
  { id: 2, name: "Bob", message: "How's it going?", date: new Date(), read: true },
  { id: 3, name: "Charlie", message: "Need some help?", date: new Date(), read: false },
];

export default function ChatHistoryComponent() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 border-r bg-white p-4 shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Chat History</h2>
        <ScrollArea className="flex-1 space-y-2">
          <div className="flex flex-col gap-2">
            {chatHistoryItems.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                  !item.read && "bg-muted"
                )}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="font-semibold">{item.name}</div>
                    {!item.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                    <div className="ml-auto text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{item.message}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="relative w-full flex-1 shadow-md">
          <video controls className="w-full h-full rounded-lg object-cover">
            <source src="/path-to-your-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Chat Section */}
        <ScrollArea className="flex-1 p-4 space-y-4 bg-white">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`flex items-start space-x-3 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}> 
              {i % 2 !== 0 && <User className="w-6 h-6 text-green-500" />}
              <div className={`p-3 rounded-lg ${i % 2 === 0 ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'}`}> 
                {i % 2 === 0 ? "Hello! How can I assist you?" : "I need some information about your services."}
              </div>
              {i % 2 === 0 && <Bot className="w-6 h-6 text-blue-500" />}
            </div>
          ))}
        </ScrollArea>
        
        {/* Chat Input */}
        <div className="border-t p-4 bg-white shadow-md flex items-center space-x-3">
          <Input
            placeholder="Type a message..."
            className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <Button className="flex items-center gap-2">
            <Send className="w-4 h-4" /> Send
          </Button>
        </div>
      </main>
    </div>
  );
}
