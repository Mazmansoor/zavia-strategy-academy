import Link from 'next/link';
import { CheckCircle, ArrowRight, Crown, Users, Calendar, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function FellowshipMarketingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-fellowship-primary to-fellowship-secondary py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white">Layer 3</Badge>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">The Fellowship</h1>
          <p className="mt-4 text-xl text-green-100">
            An elite network of strategic minds
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-green-100">
            Annual convenings. Direct problem access. A lifetime peer community
            of leaders who think differently about strategy.
          </p>
          <div className="mt-10">
            <Badge className="bg-white/20 text-white">
              Invitation Only
            </Badge>
          </div>
        </div>
      </section>

      {/* What is The Fellowship */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-zavia-navy">
            What is The Fellowship?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            The Fellowship is not a course. It&apos;s a curated community of exceptional
            strategic thinkers who have demonstrated mastery through The Canon and
            The Guild.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-fellowship-primary/10 p-3">
                <Calendar className="h-6 w-6 text-fellowship-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">Annual Convenings</h3>
              <p className="mt-2 text-slate-600">
                In-person gatherings with fellow strategic minds. Intimate settings
                designed for deep conversation and genuine connection. Two multi-day
                events per year.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-fellowship-primary/10 p-3">
                <Lightbulb className="h-6 w-6 text-fellowship-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">Direct Problem Access</h3>
              <p className="mt-2 text-slate-600">
                Bring your most challenging strategic problems to the group.
                Get diverse perspectives from peers who understand the stakes.
                No judgment, just strategic insight.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-fellowship-primary/10 p-3">
                <Users className="h-6 w-6 text-fellowship-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">Peer Network</h3>
              <p className="mt-2 text-slate-600">
                A private community of leaders across industries. People who think
                differently about strategy. Relationships that last a lifetime.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-fellowship-primary/10 p-3">
                <Crown className="h-6 w-6 text-fellowship-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">Contribution</h3>
              <p className="mt-2 text-slate-600">
                Share your strategic insights through case studies and discussions.
                Contribute to the collective knowledge of the community. Learn by teaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-zavia-navy">
            How to Join
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            The Fellowship is invitation-only. Here&apos;s the path:
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-canon-primary text-white">
                1
              </div>
              <div>
                <h3 className="font-semibold text-zavia-navy">Complete The Canon</h3>
                <p className="mt-1 text-slate-600">
                  Master the foundational frameworks. Create your Strategic Doctrine.
                  Demonstrate your commitment to strategic thinking.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-guild-primary text-white">
                2
              </div>
              <div>
                <h3 className="font-semibold text-zavia-navy">Excel in The Guild</h3>
                <p className="mt-1 text-slate-600">
                  Join a cohort. Apply your knowledge. Demonstrate exceptional
                  strategic thinking. Show that you can both contribute and learn.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fellowship-primary text-white">
                3
              </div>
              <div>
                <h3 className="font-semibold text-zavia-navy">Receive an Invitation</h3>
                <p className="mt-1 text-slate-600">
                  Top performers in each Guild cohort are nominated for The Fellowship.
                  Invitations are extended based on demonstrated excellence and
                  potential contribution to the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-zavia-navy">
            Membership
          </h2>

          <div className="mx-auto mt-12 max-w-xl rounded-2xl border-2 border-fellowship-primary bg-white p-8 text-center">
            <Crown className="mx-auto h-12 w-12 text-fellowship-primary" />
            <h3 className="mt-4 font-serif text-2xl font-bold text-zavia-navy">
              Annual Membership
            </h3>
            <p className="mt-2 text-3xl font-bold text-fellowship-primary">$4,997/year</p>

            <ul className="mt-6 space-y-3 text-left">
              {[
                'Two annual in-person convenings',
                'Private community access',
                'Direct problem sessions',
                'Case study contributions',
                'Priority Guild mentorship opportunities',
                'Lifetime alumni network',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-fellowship-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-fellowship-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold">Begin Your Journey</h2>
          <p className="mt-4 text-lg text-green-100">
            The path to The Fellowship begins with The Canon.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-fellowship-primary hover:bg-green-50"
              >
                Start with The Canon
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
