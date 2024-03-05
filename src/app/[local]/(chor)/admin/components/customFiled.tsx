/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "~/components/ui/form"; // replace with your actual import
import { Input } from "~/components/ui/input";

interface FieldProps {
  control: any; // replace with your actual type
  name: string;
  label: string;
  placeholder: string;
  description?: string;
}

const CustomField: React.FC<FieldProps> = ({
  control,
  name,
  label,
  placeholder,
  description,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
      </FormItem>
    )}
  />
);

export default CustomField;
