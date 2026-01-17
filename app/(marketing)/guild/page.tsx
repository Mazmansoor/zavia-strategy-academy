import Link from 'next/link';
import { CheckCircle, ArrowRight, Users, Calendar, Video, Award } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function GuildMarketingPage() {
  const weeks = [
    {
      week: 1,
      title: 'Strategic Assessment',
      description: 'Deep dive into your current strategic situation and challenges.',
    },
    {
      week: 2,
      title: 'Competitive Dynamics',
      description: 'Analyze your competitive arena and identify positioning opportunities.',
    },
    {
      week: 3,
      title: 'Strategic Options',
      description: 'Generate and evaluate strategic alternatives.',
    },
    {
      week: 4,
      title: 'Decision Architecture',
      description: 'Build frameworks for making strategic decisions under uncertainty.',
    },
    {
      week: 5,
      title: 'Resource Allocation',
      description: 'Align resources with strategic priorities.',
    },
    {
      week: 6,
      title: 'Execution Planning',
      description: 'Translate strategy into actionable plans.',
    },
    {
      week: 7,
      title: 'Adaptation Systems',
      description: 'Build feedback loops and adaptation mechanisms.',
    },
    {
      week: 8,
      title: 'Strategic Integration',
      description: 'Synthesize learning and present your strategic plan.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-guild-primary to-guild-secondary py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white">Layer 2</Badge>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">The Guild</h1>
          <p className="mt-4 text-xl text-orange-100">
            Apply your strategic knowledge with live mentorship and peer collaboration
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-orange-100">
            An intensive 8-week cohort experience. 16 live sessions. 15 peers maximum.
            Direct mentorship. Real strategic challenges.
          </p>
          <div className="mt-10">
            <Badge className="bg-white/20 text-white">
              Requires Canon Completion
            </Badge>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b py-12">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-12 px-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">8</div>
            <div className="text-sm text-slate-500">Weeks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">16</div>
            <div className="text-sm text-slate-500">Live Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">15</div>
            <div className="text-sm text-slate-500">Max Cohort Size</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-zavia-navy">2</div>
            <div className="text-sm text-slate-500">Sessions/Week</div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-zavia-navy">
            The Guild Experience
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-guild-primary/10 p-3">
                <Video className="h-6 w-6 text-guild-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">16 Live Sessions</h3>
              <p className="mt-2 text-slate-600">
                Two 90-minute sessions per week. Interactive workshops, not lectures.
                Case studies, exercises, and real-time problem solving.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-guild-primary/10 p-3">
                <Users className="h-6 w-6 text-guild-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">Small Cohort</h3>
              <p className="mt-2 text-slate-600">
                Maximum 15 participants ensures deep engagement. Learn from peers
                facing similar challenges. Build lasting professional relationships.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-guild-primary/10 p-3">
                <Award className="h-6 w-6 text-guild-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">Direct Mentorship</h3>
              <p className="mt-2 text-slate-600">
                Personal feedback on your strategic work. Office hours for 1:1
                guidance. Expert perspective on your specific challenges.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <div className="mb-4 inline-flex rounded-lg bg-guild-primary/10 p-3">
                <Calendar className="h-6 w-6 text-guild-primary" />
              </div>
              <h3 className="font-semibold text-zavia-navy">Real Application</h3>
              <p className="mt-2 text-slate-600">
                Apply frameworks to your actual strategic challenges. Leave with
                a working strategic plan, not just knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-zavia-navy">
            8-Week Curriculum
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Each week builds on the previous, creating a comprehensive strategic plan.
          </p>

          <div className="mt-12 space-y-4">
            {weeks.map((week) => (
              <div
                key={week.week}
                className="flex items-start gap-4 rounded-xl border bg-white p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-guild-primary font-bold text-white">
                  {week.week}
                </div>
                <div>
                  <h3 className="font-semibold text-zavia-navy">{week.title}</h3>
                  <p className="text-sm text-slate-600">{week.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-zavia-navy">
            Requirements
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border-2 border-guild-primary/20 bg-white p-6">
              <h3 className="font-semibold text-zavia-navy">Prerequisites</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-guild-primary" />
                  Complete The Canon (all 5 modules)
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-guild-primary" />
                  Pass all module assignments
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-guild-primary" />
                  Submit your Strategic Doctrine
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-guild-primary/20 bg-white p-6">
              <h3 className="font-semibold text-zavia-navy">Commitment</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-guild-primary" />
                  Attend all 16 live sessions
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-guild-primary" />
                  Complete weekly assignments
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-guild-primary" />
                  Participate actively in discussions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Fellowship */}
      <section className="bg-guild-primary py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold">Path to The Fellowship</h2>
          <p className="mt-4 text-lg text-orange-100">
            Top performers in The Guild receive invitations to The Fellowship—our
            elite annual membership for strategic leaders.
          </p>
          <div className="mt-8">
            <p className="text-2xl font-bold">$2,997</p>
            <p className="text-sm text-orange-200">Application required. Canon completion required.</p>
          </div>
          <div className="mt-8">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-guild-primary hover:bg-orange-50"
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
