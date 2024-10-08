import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin, PhoneCallIcon, Mail} from "lucide-react";
import Image from "next/image";
import Badge from "./Badge";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
    applicationUrl,
    applicationEmail  },
}: JobListItemProps) {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceholder}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{type}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {companyName}
          </p>
          {applicationEmail && <p className="flex items-center gap-1.5">
            <Mail size={16} className="shrink-0" />
            {applicationEmail}
          </p>}
          {applicationUrl && <p className="flex items-center gap-1.5">
            <PhoneCallIcon size={16} className="shrink-0" />
            {applicationUrl}
          </p>}
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{companyName}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
        <Banknote size={16} className="shrink-0" />
        {formatMoney(salary)}/hour
        </span>
      </div>
    </article>
  );
}
