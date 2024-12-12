import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const LandingPage = () => {
  // State to hold the API reference for carousel
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  // State to track current slide number
  const [current, setCurrent] = React.useState(1);
  // State to track total number of slides
  const [count, setCount] = React.useState(5);

  // Use effect to set up the carousel and listen for "select" event
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1); // Carousel starts from 0, so add 1

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    return () => {
      // Cleanup when component unmounts
      api.off("select");
    };
  }, [api]);

  return (
    <>
      <div className="mx-auto max-w-md"> {/* Adjusted to max-w-md for larger screens */}
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {Array.from({ length: count }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
