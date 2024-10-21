import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import React from "react";

const SimpleFormItem = ({
                          label,
                          description,
                          children
                        }: {
                          label: string;
                          description?: string;
                          children: React.ReactNode;
                        }
) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {children}
      </FormControl>
      {description && (
        <FormDescription>
          {description}
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  )
}
export default SimpleFormItem;
