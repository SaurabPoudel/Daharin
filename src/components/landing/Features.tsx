import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan, Activity, MessageCircle, Target } from 'lucide-react';

const features = [
  {
    title: "Quick Scan",
    description: "Snap a photo of your meal for instant analysis",
    icon: Scan,
  },
  {
    title: "Track Progress",
    description: "Monitor your daily nutrition goals",
    icon: Activity,
  },
  {
    title: "WhatsApp Integration",
    description: "Get updates and insights via WhatsApp",
    icon: MessageCircle,
  },
  {
    title: "Smart Goals",
    description: "Personalized nutrition targets",
    icon: Target,
  }
];

export function Features() {
  return (
      <div className=" flex max-w-6xl mx-auto flex-col items-center gap-2">
                <h2 className="text-3xl font-bold md:text-4xl">
Our tools for your goals
            
        </h2>

        <p className="text-sm text-gray-600 text-center my-4">
        Daharin is your seamless nutrition tracking companion, accessible right from WhatsApp.<br /> 
        No need for multiple apps; we bring you everything in one chat window.
        </p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-16 w-16 text-emerald-500" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
}