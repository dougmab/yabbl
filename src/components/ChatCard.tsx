import ProfileDisplay from "@/components/ProfileDisplay.tsx";

const ChatCard = ({
                    title,
                    lastMessage,
                    profile
                  }: {
  title: string
  lastMessage: {
    sender: string
    content: string
  },
  profile: {
    color: string
    content: string
  }
}) => {
  return (
    <div className="bar-button relative">
      <ProfileDisplay color={profile.color} content={profile.content}/>
      <div>
        <h3 className="mb-2">{title}</h3>
        <p className="w-48 lg:w-64 truncate ..."><strong>{lastMessage.sender}</strong>: {lastMessage.content}</p>
      </div>
      <div className="h-[15px] w-[15px] bg-red-500 rounded-full absolute top-0 right-0 text-center"></div>
    </div>
  )
}
export default ChatCard
