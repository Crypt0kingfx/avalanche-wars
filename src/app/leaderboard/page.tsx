import Link from "next/link";

export default async function LeaderboardPage() {

  const players = [
    { rank: 1, wallet: "0xA357...21cC", score: 87 },
    { rank: 2, wallet: "0x8F12...98ab", score: 76 },
    { rank: 3, wallet: "0x7Dd3...5fa1", score: 65 },
    { rank: 4, wallet: "0x9123...ab21", score: 54 },
    { rank: 5, wallet: "0x7f81...88de", score: 43 },
  ];

  const topThree = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* BACKGROUND */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')",
        }}
      />

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* CONTENT */}

      <div className="relative z-10 p-8 max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-12">

          <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
            Avalanche Leaderboard
          </h1>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
          >
            Wallet Analyzer
          </Link>

        </div>

        {/* TOP 3 PODIUM */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {topThree.map((player) => {

            const medal =
              player.rank === 1
                ? "🥇"
                : player.rank === 2
                ? "🥈"
                : "🥉";

            const glow =
              player.rank === 1
                ? "shadow-[0_0_50px_rgba(255,215,0,0.5)] border-yellow-400"
                : player.rank === 2
                ? "shadow-[0_0_40px_rgba(192,192,192,0.4)] border-gray-300"
                : "shadow-[0_0_40px_rgba(205,127,50,0.4)] border-orange-400";

            return (
              <div
                key={player.rank}
                className={`p-8 rounded-2xl bg-white/5 backdrop-blur-xl border ${glow} text-center`}
              >

                <div className="text-4xl mb-2">{medal}</div>

                <div className="text-sm text-zinc-400">
                  Rank #{player.rank}
                </div>

                <div className="mt-2 font-semibold text-lg">
                  {player.wallet}
                </div>

                <div className="mt-4 text-3xl font-bold text-cyan-400">
                  {player.score}
                </div>

                <div className="text-zinc-400 text-sm">
                  XP
                </div>

              </div>
            );
          })}

        </div>

        {/* REST OF LEADERBOARD */}

        <div className="space-y-4 max-w-4xl mx-auto">

          {rest.map((player) => (

            <div
              key={player.rank}
              className="flex justify-between items-center p-4 rounded-xl border border-zinc-800 bg-zinc-950 backdrop-blur-xl hover:border-cyan-400 transition"
            >

              <div className="text-lg font-bold">
                #{player.rank}
              </div>

              <div className="text-zinc-400">
                {player.wallet}
              </div>

              <div className="text-cyan-400 font-bold">
                {player.score} XP
              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}