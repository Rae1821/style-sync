"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/auth";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MdOutlineLibraryAddCheck } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CalculateShape = () => {
  const router = useRouter();

  const [shapeResults, setShapeResults] = useState<string>("");
  const [addToDashboard, setAddToDashboard] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      shoulders: formData.get("shoulders") as string,
      waist: formData.get("waist") as string,
      hips: formData.get("hips") as string,
    };

    const shoulders = parseInt(data.shoulders);
    const waist = parseInt(data.waist);
    const hips = parseInt(data.hips);

    try {
      if (hips / shoulders >= 1.05 && waist < hips) {
        setShapeResults("Pear");
      } else if (shoulders / hips >= 1.05 && waist === shoulders) {
        setShapeResults("Apple");
      } else if (
        waist / shoulders <= 0.75 &&
        waist / hips < 0.75 &&
        hips * 0.95 < shoulders
      ) {
        setShapeResults("Hourglass");
      } else if (shoulders / hips >= 1.05 && waist < shoulders) {
        setShapeResults("Triangle");
      } else if (waist / shoulders >= 0.75 && shoulders * 0.95 < hips) {
        setShapeResults("Rectangle");
      } else if (shoulders === null || waist === null || hips === null) {
        console.log("Please fill in all fields");
      }

      return shapeResults;
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setShapeResults("");
    setAddToDashboard(false);
  };

  // save shape to database
  const handleSaveShape = async () => {
    try {
      const result = await updateUser({ bodyShape: shapeResults });
      setAddToDashboard((prevAddToDashboard) => !prevAddToDashboard);

      console.log("Update result:", result);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error saving to profile: ", error);
    }
  };

  return (
    <div className="container">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="gap-2">
          <Label htmlFor="shoulders">Shoulders Measurement</Label>
          <Input
            name="shoulders"
            type="shoulders"
            placeholder="shoulders"
            id="shoulders"
          />
        </div>
        <div>
          <Label htmlFor="waist">Waist Measurement</Label>
          <Input name="waist" type="waist" placeholder="waist" id="waist" />
        </div>
        <div>
          <Label htmlFor="hips">Hip Measurement</Label>
          <Input name="hips" type="hips" placeholder="hips" id="hips" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Button type="submit">Calculate Shape</Button>
            <Button
              type="reset"
              variant="ghost"
              onClick={handleReset}
              className="decoration-red-300 decoration-2 hover:bg-transparent hover:underline hover:underline-offset-4"
            >
              Start Over
            </Button>
          </div>
        </div>
      </form>
      <div className="flex items-center gap-2 mt-8">
        <p className="text-sm font-medium leading-none">
          Your body shape is:{" "}
          <span className="ml-2 text-lg font-semibold text-red-300">
            {shapeResults}
          </span>
        </p>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleSaveShape}>
              {addToDashboard ? (
                <MdOutlineLibraryAddCheck />
              ) : (
                <MdOutlineLibraryAdd />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CalculateShape;
