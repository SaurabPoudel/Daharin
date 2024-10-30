import { Button } from "@/components/ui/button";
import { FadeIn } from "./MotionWrapper";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-4 pb-8 pt-6 md:py-10">
      <FadeIn
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[980px] flex flex-col items-center gap-4 text-center"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Track calories directly through WhatsApp
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Set your goals, snap your meals, and get instant nutrition insights.
          No app needed.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
