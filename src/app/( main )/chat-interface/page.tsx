//import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Send, User, Bot } from "lucide-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const chatHistoryItems = [
  { id: 1, name: "Alice", message: "Hello!", date: new Date(), read: false },
  { id: 2, name: "Bob", message: "How's it going?", date: new Date(), read: true },
  { id: 3, name: "Charlie", message: "Need some help?", date: new Date(), read: false },
];

export default function ChatHistoryComponent() {
  return (
    <>
  
    <div className="flex h-screen border-t border-gray-300">
      {/* Sidebar */}
      <aside className="w-1/4 border-r bg-white p-4 shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Chat History</h2>
        <ScrollArea className="flex-1 space-y-2">
          <div className="flex flex-col gap-2">
            {chatHistoryItems.map((item) => (
              <button
                key={item.id}
                className=
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="font-semibold">{item.name}</div>
                  
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
      <main className="flex-1 flex flex-col ">
  {/* Video Player */}
 <center>
  <div className="  relative w-[90%] max-w-2xl h-[300px] sm:h-[400px] md:h-[400px] shadow-lg pt-1">
    <video controls className="w-full h-full rounded-lg object-cover">
      <source src="/Accident Video_3.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  </center>

{/* 
<ScrollArea className="flex-1 p-4 bg-white font-sans font-normal text-sm leading-[18px]"> */}
<ScrollArea className="flex-1 p-4 bg-white font-sans font-normal text-sm leading-[18px] h-[500px] sm:h-[600px] md:h-[700px] overflow-y-auto">
  {[...Array(6)].map((_, i) => (
    <div key={i} className={`flex items-start space-x-2 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
      {i % 2 !== 0 && <User className="w-5 h-5 text-gray-500" />}
      <div className={`flex flex-col ${i % 2 === 0 ? 'items-end' : 'items-start'}`}>
        {/* Message container with name inside */}
        <div className={`p-2 rounded-lg ${i % 2 === 0 ? 'bg-gray-100 shadow-md text-right' : 'bg-light-100 shadow-md text-left'}`}>
          {/* Name */}
          <span className={`block mb-2 text-[11px] font-medium ${i % 2 === 0 ? 'text-black-500' : 'text-gray-500'}`}>
            {i % 2 === 0 ? "Spectra" : "John Doe"}
          </span>
          {/* Message */}
          <span className="block mt-0.5 text-xs">
            {i % 2 === 0 ? "Hello! How can I assist you?" : "I need some information about your services."}
          </span>
        </div>
      </div>
      {i % 2 === 0 && <Bot className="w-5 h-5 text-blue-500" />}
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
    </>
  );
}
