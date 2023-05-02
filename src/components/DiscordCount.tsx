export default async function DiscordCount() {
  const res = await fetch("https://discord.com/api/guilds/1015095797689360444/widget.json");
  const data = await res.json();

  return (
    data && (
      <>
        <span className="inline-flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>{" "}
        <span className="text-green-500 font-display text-lg">{data.presence_count}</span> members online
      </>
    )
  );
}
