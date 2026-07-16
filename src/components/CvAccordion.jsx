import * as Accordion from "@radix-ui/react-accordion";

export default function CvAccordion({ items }) {
  return (
    <Accordion.Root type="single" collapsible className="flex flex-col">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="border-b border-gris-claro/60"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full cursor-pointer items-start justify-between gap-4 py-4 text-left outline-none">
              <span className="flex flex-col">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="lg:text-[1.125rem] font-medium">{item.titulo}</span>
                  <span className="lg:text-[1.125rem] text-gris-medio">|</span>
                  <span className="lg:text-[1.125rem] text-gris-medio">{item.empresa}</span>
                </span>
                <span className="mt-0.5 text-gris-medio">
                  {item.fecha}
                </span>
              </span>
              <svg
                className="mt-1 h-5 w-5 shrink-0 text-gris-medio transition-transform duration-300 group-data-[state=open]:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="pb-4 leading-6 text-gris-oscuro">
              {item.detalle}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
