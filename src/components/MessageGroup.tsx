import ProfileDisplay from "@/components/ProfileDisplay.tsx";

const MessageBubble = ({
                         sender, content, currentUser
                       }: {
  sender?: string,
  content: string,
  currentUser?: boolean
}) => {
  return <div className={`rounded-xl p-2 w-fit ${currentUser ? "items-start bg-sent-message" : "bg-received-message"}`}>
    {sender && <strong className="text-sm">{sender}</strong>}
    <p className="max-w-sm lg:max-w-xl">{content}</p>
  </div>
}

const MessageGroup = ({
                        sender, profile, messages
                      }: {
                        sender: string,
                        profile: {
                          color: string,
                          content: string
                        },
                        messages: string[]
                      }
) => {
  const isCurrentUser = sender === "Steve"

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} gap-2 mb-4`}>
      <div className="flex gap-2">

        {!isCurrentUser && <ProfileDisplay {...profile} size={40}/>}

        <div className={`flex flex-col gap-2 mb-2 ${isCurrentUser ? "items-end" : "items-start"}`}>

          {messages.map((message, i) => {
            if (isCurrentUser) {
              return (
                <MessageBubble
                  key={i}
                  content={message}
                  currentUser
                />
              )
            }

            if (i === 0)
              return (
                <MessageBubble
                  key={i}
                  sender={sender}
                  content={message}
                />
              )

            return (
              <MessageBubble
                key={i}
                content={message}
              />
            )
          })}

        </div>
      </div>
    </div>
  )
}
export default MessageGroup;
