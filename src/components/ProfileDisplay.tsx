const ProfileDisplay = ({
                          color,
                          size,
                          content
                        }: {
  color: string,
  size?: number
  content: string
}) => {
  size = size ? size : 50
  return (
    <div
      className="flex justify-center items-center rounded-full text-black font-bold"
      style={{
        backgroundColor: color,
        height: size,
        width: size
      }}
    >
      {content}
    </div>
  )
}
export default ProfileDisplay
