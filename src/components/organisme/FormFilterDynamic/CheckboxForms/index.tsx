import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";

type Props = {
  formFilter: any;
  items: any[];
  name: string;
  label: string;
};

export default function CheckboxForms({
  formFilter,
  items,
  label,
  name,
}: Props) {
  return (
    <Accordion
      defaultValue={name}
      type="single"
      className="border-none mt-0"
      collapsible
    >
      <AccordionItem value={name}>
        <AccordionTrigger className="font-semibold first:pt-0">
          {label}
        </AccordionTrigger>
        <AccordionContent>
          <FormField
            control={formFilter.control}
            name={name}
            render={() => (
              <FormItem className="space-y-5 text-gray-600 mt-5">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={formFilter.control}
                    name={name}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                console.log("field", `${field}`);
                                // console.log("cheked", `${checked}`);
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
