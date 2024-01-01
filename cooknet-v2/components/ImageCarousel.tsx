"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function ImageCarousel({ images }: { images: string[] }) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="max-w-xs md:max-w-3xl"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Dialog>
              <DialogTrigger>
                <Image
                  width={650}
                  height={650}
                  src={image}
                  alt="Uploaded Image"
                  className="rounded-lg w-full h-full"
                />
              </DialogTrigger>
              <DialogContent className="w-full h-4/5">
                <Image
                  fill
                  objectPosition="center"
                  objectFit="contain"
                  src={image}
                  alt="Uploaded Image"
                  className="w-full h-full"
                />
              </DialogContent>
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="" />
      <CarouselNext />
    </Carousel>
  );
}

function FullScreenDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
