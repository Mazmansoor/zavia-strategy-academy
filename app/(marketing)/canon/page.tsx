import Link from 'next/link';
import { CheckCircle, ArrowRight, BookOpen, Clock, Award } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CANON_MODULES } from '@/lib/content/canon/modules';

export default function CanonMarketingPage() {
  const totalLessons = CANON_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalTime = CANON_MODULES.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + parseInt(l.duration), 0),
    0
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-canon-primary to-canon-secondary py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white">Layer 1</Badge>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">The Canon</h1>
          <p className="mt-4 text-xl text-blue-100">
            Master the 20% of strategic knowledge that drives 80% of results
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-blue-100">
            A self-paced journey through the essential frameworks of strategic thinking.
            Five modules. Your Strategic Doctrine. Lifetime access.
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-canon-primary hover:bg-blue-50">
                Get Started - $497
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b py-12">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-12 px-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">{CANON_MODULES.length}</div>
            <div className="text-sm text-slate-500">Comprehensive Modules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">{totalLessons}</div>
            <div className="text-sm text-slate-500">In-Depth Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">{totalTime}+</div>
            <div className="text-sm text-slate-500">Minutes of Content</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">Lifetime</div>
            <div className="text-sm text-slate-500">Access</div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-zavia-navy">
            The Five Modules
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Each module builds on the previous, creating a complete strategic foundation.
          </p>

          <div className="mt-12 space-y-8">
            {CANON_MODULES.map((module) => (
              <div
                key={module.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-canon-primary text-xl font-bold text-white">
                    {module.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-zavia-navy">
                      {module.title}
                    </h3>
                    <p className="text-canon-secondary">{module.subtitle}</p>
                    <p className="mt-2 text-slate-600">{module.description}</p>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {module.lessons.length} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.lessons.reduce((a, l) => a + parseInt(l.duration), 0)} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {module.assignment.title}
                      </span>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-700">You&apos;ll learn:</p>
                      <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                        {module.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-canon-primary" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Strategic Doctrine */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-zavia-navy">
              Your Strategic Doctrine
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              The Canon culminates in your personal Strategic Doctrine—a living document
              that captures your approach to strategic thinking. This isn&apos;t just
              another certificate. It&apos;s the foundation of your strategic practice.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border-2 border-canon-primary/20 bg-white p-8">
            <h3 className="font-serif text-xl font-bold text-zavia-navy">
              Your Doctrine will include:
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                'Your strategic worldview and core beliefs',
                'Your personal diagnostic approach',
                'Your decision-making principles',
                'Your execution philosophy',
                'Your commitment to ongoing development',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-canon-primary" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Path Forward */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-zavia-navy">
            The Path Forward
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Completing The Canon qualifies you to apply for The Guild—our live,
            cohort-based experience where you&apos;ll apply your strategic knowledge
            with direct mentorship and peer collaboration.
          </p>

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canon-primary text-white">
                1
              </div>
              <div className="h-1 w-24 bg-zavia-gold" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-guild-primary text-white">
                2
              </div>
              <div className="h-1 w-24 bg-zavia-gold" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-fellowship-primary text-white">
                3
              </div>
            </div>
            <div className="flex gap-12 text-sm">
              <span className="text-canon-primary">Canon</span>
              <span className="text-guild-primary">Guild</span>
              <span className="text-fellowship-primary">Fellowship</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-canon-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold">Start Your Journey</h2>
          <p className="mt-4 text-lg text-blue-100">
            Join The Canon and begin building your strategic foundation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-canon-primary hover:bg-blue-50"
              >
                Get The Canon - $497
              </Button>
            </Link>
            <p className="text-sm text-blue-200">One-time payment. Lifetime access.</p>
          </div>
        </div>
      </section>
    </>
  );
}
