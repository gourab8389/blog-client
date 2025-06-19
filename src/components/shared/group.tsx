import { cn } from "@/lib/utils";

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup = (
  { children, className }: FormGroupProps
) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
        {children}
    </div>
  )
}

export default FormGroup;
