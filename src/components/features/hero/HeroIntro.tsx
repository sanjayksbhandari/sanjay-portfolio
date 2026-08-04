import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { Stat } from "@/components/ui/Stat";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { Display } from "@/components/typography/Display";
import { Text } from "@/components/typography/Text";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/config/site";
import { ScrollIndicator } from "./ScrollIndicator";

/**
 * Home hero — editorial hierarchy via type tokens:
 * Eyebrow → Display (name) → Supporting (`Display`/h1) → Lead → CTAs → Metrics
 *
 * Profile photo sits left of the copy on desktop/tablet; stacks above on
 * mobile. A compact mark also lives in the sticky header.
 */
export function HeroIntro() {
  return (
    <div className="flex flex-col items-start gap-8 sm:gap-10 md:flex-row md:items-start md:gap-10 lg:gap-12 xl:gap-14">
      <ProfilePhoto priority className="md:mt-0.5 lg:mt-1" />

      <div className="reveal max-w-xl min-w-0 flex-1 lg:max-w-2xl">
        <Kicker className="mb-6">
          {site.title} · {site.yearsExperience} years
        </Kicker>

        {/* Primary headline — Display scale; only dominant line. */}
        <p className="type-display">{site.name}</p>

        {/* Supporting statement — SEO h1, supporting visual weight. */}
        <Display as="h1" className="mt-8">
          Enterprise Java platforms — from architecture to production.
        </Display>

        <Text variant="lead" className="mt-8">
          I design and build the backend systems organizations depend on — authentication that holds
          up across every client deployment, trading systems engineered not to go down, and
          financial systems underneath it all. 17+ years doing that in Java, now extending the same
          discipline into AI-powered products.
        </Text>

        <div className="mt-12 flex flex-wrap gap-3 sm:mt-14">
          <Button href="/journey" size="lg">
            Explore Engineering Journey
          </Button>
          <Button href="/resume" variant="secondary" size="lg">
            View Resume
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact
          </Button>
        </div>

        <Stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4"
          itemCount={4}
        >
          <StaggerItem>
            <Stat value={site.yearsExperience} label="Years of experience" />
          </StaggerItem>
          <StaggerItem>
            <Stat value="16" label="Microservices architected (Exchange Platform)" />
          </StaggerItem>
          <StaggerItem>
            <Stat value="99.9%" label="Production uptime (Exchange Platform)" />
          </StaggerItem>
          <StaggerItem>
            <Stat value="5–7" label="Developers led (last ~5 years at Opal)" />
          </StaggerItem>
        </Stagger>

        <ScrollIndicator targetId="home-impact" className="mt-12 sm:mt-14" />
      </div>
    </div>
  );
}
