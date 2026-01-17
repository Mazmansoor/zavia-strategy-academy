import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Crown, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zavia-navy via-slate-900 to-zavia-navy py-24 text-white">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Master the Art and Science of{' '}
              <span className="text-zavia-gold">Strategy</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 sm:text-xl">
              A three-layer system designed to transform how you think, decide,
              and lead. From foundational knowledge to elite mastery.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-zavia-gold px-6 py-3 font-semibold text-zavia-navy transition hover:bg-zavia-gold/90"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/canon"
                className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-zavia-navy"
              >
                Explore The Canon
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Layers Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-zavia-navy sm:text-4xl">
              The Three-Layer System
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Each layer builds on the previous, creating a complete journey from
              strategic foundation to elite mastery.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Layer 1: The Canon */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-canon-primary bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-canon-primary text-white">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-canon-primary">
                The Canon
              </h3>
              <p className="mt-2 text-sm font-medium text-canon-secondary">
                Layer 1 - Self-Paced Foundation
              </p>
              <p className="mt-4 text-slate-600">
                Master the 20% of strategic knowledge that drives 80% of results.
                Five modules. Your Strategic Doctrine. Lifetime access.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '5 comprehensive modules',
                  'Personal Strategic Doctrine',
                  'Guild qualification',
                  'Lifetime access',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-canon-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-2xl font-bold text-canon-primary">$497</p>
                <Link
                  href="/canon"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-canon-primary hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Layer 2: The Guild */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-guild-primary bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="absolute right-4 top-4 rounded-full bg-guild-accent px-3 py-1 text-xs font-semibold text-white">
                By Application
              </div>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-guild-primary text-white">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-guild-primary">
                The Guild
              </h3>
              <p className="mt-2 text-sm font-medium text-guild-secondary">
                Layer 2 - Live Cohort Experience
              </p>
              <p className="mt-4 text-slate-600">
                Apply your strategic knowledge with live mentorship, peer
                collaboration, and real-world challenges. 8 weeks, 16 sessions.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '16 live sessions',
                  'Direct mentorship',
                  '15 peers maximum',
                  'Fellowship nomination path',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-guild-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-2xl font-bold text-guild-primary">$2,997</p>
                <Link
                  href="/guild"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-guild-primary hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Layer 3: The Fellowship */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-fellowship-primary bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="absolute right-4 top-4 rounded-full bg-fellowship-accent px-3 py-1 text-xs font-semibold text-white">
                Invite Only
              </div>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-fellowship-primary text-white">
                <Crown className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-fellowship-primary">
                The Fellowship
              </h3>
              <p className="mt-2 text-sm font-medium text-fellowship-secondary">
                Layer 3 - Elite Network
              </p>
              <p className="mt-4 text-slate-600">
                Join an exclusive network of strategic minds. Annual convenings,
                direct problem access, and a lifetime peer community.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Annual in-person convenings',
                  'Direct problem access',
                  'Elite peer network',
                  'Lifetime membership',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-fellowship-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-2xl font-bold text-fellowship-primary">$4,997/yr</p>
                <Link
                  href="/fellowship"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-fellowship-primary hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-zavia-navy sm:text-4xl">
              Your Strategic Journey
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              A clear path from foundation to mastery
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-zavia-gold md:block" />

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex-1 text-center md:text-right">
                    <h3 className="font-serif text-xl font-bold text-zavia-navy">
                      1. Complete The Canon
                    </h3>
                    <p className="mt-2 text-slate-600">
                      Learn the fundamental frameworks. Complete all five modules.
                      Create your personal Strategic Doctrine.
                    </p>
                  </div>
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-zavia-gold font-bold text-zavia-navy">
                    1
                  </div>
                  <div className="flex-1" />
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex-1" />
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-zavia-gold font-bold text-zavia-navy">
                    2
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-serif text-xl font-bold text-zavia-navy">
                      2. Apply to The Guild
                    </h3>
                    <p className="mt-2 text-slate-600">
                      Canon completion qualifies you to apply. Join a cohort of 15
                      peers for 8 weeks of intensive application.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex-1 text-center md:text-right">
                    <h3 className="font-serif text-xl font-bold text-zavia-navy">
                      3. Earn Fellowship Nomination
                    </h3>
                    <p className="mt-2 text-slate-600">
                      Demonstrate exceptional strategic thinking in The Guild.
                      Top performers receive Fellowship invitations.
                    </p>
                  </div>
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-zavia-gold font-bold text-zavia-navy">
                    3
                  </div>
                  <div className="flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zavia-navy py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Ready to Begin?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Start with The Canon and build your strategic foundation today.
            </p>
            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-zavia-gold px-8 py-4 text-lg font-semibold text-zavia-navy transition hover:bg-zavia-gold/90"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
