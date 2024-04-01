import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import React, { ChangeEvent, useRef, useState } from "react";

type Props = {
  form: any;
};

export default function UploadField({ form }: Props) {
  const [nameFile, setNameFile] = useState<string>("attach Resume / CV");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = () => {
    inputRef.current?.click();
  };

  const handleFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNameFile(e.target.files[0].name);
      form.setValue("resume", e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="font-semibold">Attach your resume</div>
      <div>
        <div>
          <div
            onClick={handleSelectFile}
            className="text-sm text-primary font-semibold p-3 cursor-pointer border-2 border-dashed border-primary"
          >
            {nameFile}
          </div>
        </div>
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileOnChange}
          ref={inputRef}
        />
      </div>
    </div>
  );
}
