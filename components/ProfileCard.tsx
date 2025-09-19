import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileCardProps } from "@/lib/types";

export default function ProfileCard({
  profile,
  socialLinks,
  showSocial = true,
  showAction = true,
  className,
}: ProfileCardProps) {
  return (
    <Card
      className={`w-11/12 mx-auto max-w-sm bg-black/70 text-white border-none ${className}`}
    >
      <CardHeader className="space-y-1 relative">
        <CardTitle className="text-3xl font-medium leading-7 w-1/2">
          {profile.name}
        </CardTitle>
        <CardDescription className="leading-4 text-white text-xs font-medium">
          {profile.username}
        </CardDescription>
        <CardDescription className="leading-4 text-white/80 text-xs text-pretty w-10/12">
          {profile.description}
        </CardDescription>
        {showAction && (
          <div className="absolute top-0 right-6">
            <Link
              href="/more"
              className="text-xs font-semibold"
              aria-label="View profile"
            >
              See Profile
            </Link>
          </div>
        )}
      </CardHeader>
      {showSocial && (
        <CardContent>
          <ul className="flex gap-x-4">
            {socialLinks.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <Button asChild size="icon" aria-label={`Visit ${item.name}`}>
                  <Link href={item.url}>
                    <span className={`${item.icon} text-xl`}></span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      <CardFooter>
        <Button
          asChild
          className="w-full text-black font-semibold"
          aria-label="View more content"
        >
          <Link href="/more">View More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
