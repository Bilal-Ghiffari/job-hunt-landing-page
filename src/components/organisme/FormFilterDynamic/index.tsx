import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CheckboxForms, { FilterCheckboxOptionsProps } from "./CheckboxForms";

type FormFilterValues = {
  categories: string[];
  jobtype: string[];
  industry?: string[];
};

export type FilterFormProps = {
  label: string;
  name: string;
  options: FilterCheckboxOptionsProps[];
};

type FilterFormDataProps = {
  form: any;
  onSubmit: (values: any) => Promise<void>;
  onReset: () => void;
  checkboxForm: FilterFormProps[];
  type?: "jobs" | "companies";
};

export default function FormFilterDynamic({
  onSubmit,
  form,
  checkboxForm,
  onReset,
}: FilterFormDataProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {checkboxForm.map((item: FilterFormProps, i: number) => (
          <CheckboxForms
            key={i}
            form={form}
            options={item.options}
            label={item.label}
            name={item.name}
          />
        ))}
        <Button variant="outline" onClick={onReset} className="mt-3 w-full">
          Reset
        </Button>
      </form>
    </Form>
  );
}
