"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageName, setImageName] = useState("");

  // console.log(imageUrl);

  return (
    <div>
      <UploadButton
        className="ut-button:bg-red-300 ut-label:text-black ut-button:ut-readying:bg-red-300/50 ut-button:ut-uploading:bg-red-300/70"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImageUrl(res[0].url);
          setImageName(res[0].name);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrl.length ? (
        <div>
          <Card className="h-[400px] w-[250px]">
            <CardHeader>
              <CardTitle>{imageName}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={imageUrl} alt="my image" width={200} height={300} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
