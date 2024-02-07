import { Form } from "@/components/ui/form";
import React from "react";
import CheckboxForms from "./CheckboxForms";
import { CATEGORIES_OPTIONS } from "@/constant";
import { filterFormType, optionType } from "../../../../types";
import { Button } from "@/components/ui/button";

type Props = {
  formFilter: any;
  filterForms: filterFormType[];
  onSubmitFilter: (val: any) => Promise<void>;
};

export default function FormFilterDynamic({
  onSubmitFilter,
  filterForms,
  formFilter,
}: Props) {
  return (
    <Form {...formFilter}>
      <form onSubmit={formFilter.handleSubmit(onSubmitFilter)}>
        {filterForms.map((item: filterFormType, i: number) => (
          <CheckboxForms
            key={i}
            formFilter={formFilter}
            items={item.items}
            label={item.label}
            name={item.name}
          />
        ))}
        <Button className="mt-5 w-full">Apply Filter</Button>
        <Button variant="outline" className="mt-3 w-full">
          Reset
        </Button>
      </form>
    </Form>
  );
}
