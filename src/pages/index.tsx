import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageData, generateMessage } from "@/utils/MessageGenerator";
import { AnimatedListItem } from "@/components/AnimatedListItem";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-300">
      <div className="h-[400px] w-full max-w-lg">
        <EmailComponent />
      </div>
    </main>
  );
}

const EmailComponent = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const addMessage = () => {
    const newMessage = generateMessage();

    setMessages((prev) => {
      return [...prev, newMessage];
    });
  };

  const toggleMessage = (id: string) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages((prev) => {
        return prev.filter((i) => i != id);
      });
    } else {
      setSelectedMessages((prev) => {
        return [...prev, id];
      });
    }
  };

  const archiveMessages = () => {
    setMessages((prev) =>
      prev.filter((message) => !selectedMessages.includes(message.id))
    );
    setSelectedMessages([]);
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between w-full border-b-zinc-100 border-b-[1px] p-4">
        <button
          className="text-zinc-400 -mx-2 rounded px-2 py-1 hover:text-zinc-500"
          onClick={addMessage}
        >
          Add
        </button>
        <button
          className="text-zinc-400 -mx-2 rounded px-2 py-1 hover:text-zinc-500"
          onClick={archiveMessages}
        >
          Archive
        </button>
      </div>
      <div className="overflow-y-scroll px-3 py-2 max-h-[400px]">
        <ul>
          <AnimatePresence initial={false}>
            {messages.length == 0 && (
              <AnimatedListItem>
                <h1 className="text-center font-semibold py-4">
                  You have no messages.
                </h1>
              </AnimatedListItem>
            )}
            {[...messages].reverse().map((message) => (
              <AnimatedListItem key={message.id}>
                <div className="py-0.5 transition">
                  <button
                    onClick={() => toggleMessage(message.id)}
                    className={`flex flex-col w-full p-4 rounded-md transition-colors ${
                      selectedMessages.includes(message.id)
                        ? "bg-blue-400"
                        : "bg-white"
                    }`}
                  >
                    <p
                      className={`font-medium transition-colors ${
                        selectedMessages.includes(message.id)
                          ? "text-white"
                          : "text-zinc-600"
                      }`}
                    >
                      {message.content[0]}
                    </p>
                    <span
                      className={`text-sm transition-colors ${
                        selectedMessages.includes(message.id)
                          ? "text-zinc-100"
                          : "text-zinc-400"
                      }`}
                    >
                      {message.content[1]}
                    </span>
                  </button>
                </div>
              </AnimatedListItem>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};
