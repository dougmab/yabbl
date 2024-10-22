import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import MessageGroup from "@/components/MessageGroup.tsx";

const MessageFeed = () => {
  const messages = [
    {
      sender: "David M.",
      content: "Yoo dudes we gotta ball tonight"
    },
    {
      sender: "Steve",
      content: "Count me in"
    },
    {
      sender: "Luna Lopes",
      content: "Who's popping?"
    },
    {
      sender: "David M.",
      content: "I'm thinking about inviting Alex's crew"
    },
    {
      sender: "David M.",
      content: "They said they're down for party anytime"
    },
    {
      sender: "Cristiano",
      content: "What about game night?"
    },
    {
      sender: "Steve",
      content: "I'm in for the game night"
    },
    {
      sender: "Steve",
      content: "Got some crazy board games we can play"
    },
    {
      sender: "Allan Nunes",
      content: "Hell yeah"
    },
    {
      sender: "Allan Nunes",
      content: "I'm bringing the snacks"
    }
  ]

  const groupedMessages: {
    sender: string,
    profile: {
      color: string,
      content: string
    },
    messages: string[]
  }[] = []
  let currentSender = ""

  messages.forEach((message) => {
    if (!groupedMessages || message.sender !== currentSender) {
      groupedMessages.push({
        sender: message.sender,
        profile: {
          color: "#ff1616",
          content: "S2A"
        },
        messages: [message.content]
      })
      currentSender = message.sender
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message.content)
    }
  })

  return (
    <ScrollArea className="flex-1 flex flex-col p-3">

      {groupedMessages.map((group, i) => (
          <MessageGroup
            key={i}
            sender={group.sender}
            profile={group.profile}
            messages={group.messages}
          />
        )
      )}

    </ScrollArea>
  )
}
export default MessageFeed;
