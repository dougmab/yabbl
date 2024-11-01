const AvatarDisplay = ({
                         backgroundHexColor,
                         foregroundHexColor,
                         ascii,
                         size,
                       }: {
  backgroundHexColor: string,
  foregroundHexColor: string,
  ascii: string,
  size?: number
}) => {
  size = size ? size : 40;
  return (
    <div
      className="flex justify-center items-center rounded-full text-black font-bold"
      style={{
        backgroundColor: backgroundHexColor,
        height: size,
        width: size,
        fontSize: size / 3,
        color: foregroundHexColor
      }}
    >
      {ascii}
    </div>
  );
};
export default AvatarDisplay;
