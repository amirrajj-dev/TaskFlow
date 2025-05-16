import { Metadata } from "next";

const motivationalQuotes = [
  "Discipline is choosing between what you want now and what you want most.",
  "Start where you are. Use what you have. Do what you can.",
  "Progress, not perfection. Keep showing up.",
  "A little progress each day adds up to big results.",
  "You don't need to see the whole staircase, just take the first step.",
  "Consistency beats motivation. Build habits.",
  "Make it happen. Shock everyone.",
  "Done is better than perfect.",
  "Success is built from daily routines, not occasional effort.",
  "You're closer than you think — keep going.",
];


export const metadata : Metadata = {
  title: "Your Profile - Productivity App",
  description: "View your tasks, track progress, and stay motivated with personalized insights.",
};


const ProfilePage = () => {

  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];


  return (
    <>
      <main className="flex-1 p-6 pt-16 md:pt-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, user 👋
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Here's a quick glance at your productivity today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-background border rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-medium text-muted-foreground">
                Tasks Completed
              </h2>
              <p className="text-2xl font-semibold text-primary mt-1">7</p>
            </div>
            <div className="bg-background border rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-medium text-muted-foreground">
                In Progress
              </h2>
              <p className="text-2xl font-semibold text-yellow-500 mt-1">3</p>
            </div>
            <div className="bg-background border rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-medium text-muted-foreground">
                Pending
              </h2>
              <p className="text-2xl font-semibold text-rose-500 mt-1">5</p>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-accent/30 p-4 md:p-6 rounded-xl border text-center">
            <p className="text-md md:text-lg text-muted-foreground font-medium">
              “{randomQuote}”
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
