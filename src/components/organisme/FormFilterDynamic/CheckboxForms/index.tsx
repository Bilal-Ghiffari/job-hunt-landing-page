import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export type FilterCheckboxOptionsProps = {
  id: string;
  label: string;
};

type FilterCheckboxProps = {
  form: any;
  options: FilterCheckboxOptionsProps[];
  name: string;
  label: string;
};

export default function CheckboxForms({
  form,
  options,
  label,
  name,
}: FilterCheckboxProps) {
  return (
    <Accordion
      defaultValue={name}
      type="single"
      className="border-none mt-0"
      collapsible
    >
      <AccordionItem value={name}>
        <AccordionTrigger className="font-semibold">{label}</AccordionTrigger>
        <AccordionContent>
          <FormField
            control={form.control}
            name={name}
            render={() => (
              <FormItem className="space-y-5 text-gray-600 mt-5">
                {options.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={name}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <button type="submit">
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: boolean) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: any) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </button>
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
