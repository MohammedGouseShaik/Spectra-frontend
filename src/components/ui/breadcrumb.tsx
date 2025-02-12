import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav"> & { separator?: React.ReactNode }>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)} {...props} />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp ref={ref} className={cn("text-primary transition-colors hover:text-foreground", className)} {...props} />
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn(" text-foreground", className)} {...props} />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("flex items-center", className)} {...props}>
    {children ?? <ChevronRight className="w-4 h-4 text-muted-foreground" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span role="presentation" aria-hidden="true" className={cn("flex h-8 w-8 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

type TBreadCrumbProps = {
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const DynamicBreadcrumbs = ({
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  if(pathname == "/dashboard"){
    return(
      <Breadcrumb>
        <BreadcrumbList className={containerClasses}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className={listClasses}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className={containerClasses}>
      <BreadcrumbList>
        <BreadcrumbItem key="/">
          <BreadcrumbLink href="/" className={listClasses}>
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.length > 0 && <BreadcrumbSeparator />}

        {pathnames.map((link, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const itemClasses =
            pathname === to ? `${listClasses} ${activeClasses}` : listClasses;
          const itemLink = capitalizeLinks
            ? link.charAt(0).toUpperCase() + link.slice(1)
            : link;

          return (
            <React.Fragment key={to}>
              <BreadcrumbItem>
                <BreadcrumbLink href={to} className={itemClasses}>
                  {itemLink}
                </BreadcrumbLink>
              </BreadcrumbItem>

              {pathnames.length !== index + 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  DynamicBreadcrumbs,
};
