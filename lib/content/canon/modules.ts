// ============================================
// THE CANON - MODULE CONTENT
// ============================================

export interface ModuleContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  lessons: LessonContent[];
  assignment: AssignmentContent;
}

export interface LessonContent {
  id: number;
  title: string;
  duration: string;
  content: string; // Markdown
}

export interface AssignmentContent {
  title: string;
  description: string;
  prompt: string;
  rubric: string[];
  wordLimit: number;
}

export const CANON_MODULES: ModuleContent[] = [
  {
    id: 1,
    title: 'Strategic Foundations',
    subtitle: 'What Strategy Actually Is',
    description:
      'Most people confuse strategy with planning, goals, or tactics. This module strips away the confusion and establishes what strategy actually means—and why it matters.',
    objectives: [
      'Distinguish strategy from planning, goals, and tactics',
      'Understand why strategy exists (hint: scarcity and competition)',
      'Learn the three elements every strategy must have',
      'Identify strategic vs. non-strategic decisions',
    ],
    lessons: [
      {
        id: 1,
        title: 'The Strategy Confusion',
        duration: '15 min',
        content: `
# The Strategy Confusion

Everyone thinks they know what strategy is. Almost everyone is wrong.

## The Common Mistakes

**Mistake 1: Strategy = Goals**
"Our strategy is to grow 20% this year." That's not a strategy. That's an aspiration.

**Mistake 2: Strategy = Plans**
"Our strategy is this 50-page document with Gantt charts." Plans tell you *what* to do. Strategy tells you *why* these actions and not others.

**Mistake 3: Strategy = Tactics**
"Our strategy is to use social media marketing." That's a tactic. It might support a strategy, but it isn't one.

## What Strategy Actually Is

Strategy is **a coherent set of choices that position you to win in your chosen arena**.

Three key words:
- **Coherent**: The choices reinforce each other
- **Choices**: Strategy is about what you *won't* do as much as what you will
- **Win**: Strategy only matters when there's competition for limited resources

## Why Strategy Exists

Strategy exists because of two realities:
1. **Scarcity**: You can't do everything. Resources are limited.
2. **Competition**: Others want what you want.

If resources were unlimited and no one competed with you, you wouldn't need strategy. You'd just... do things.

## The Three Elements

Every real strategy has three parts:
1. **Diagnosis**: What's the challenge or opportunity?
2. **Guiding Policy**: What approach will you take?
3. **Coherent Actions**: What specific moves support the policy?

We'll dive deep into each in the coming lessons.
        `,
      },
      {
        id: 2,
        title: 'Diagnosis: Seeing the Situation Clearly',
        duration: '20 min',
        content: `
# Diagnosis: Seeing the Situation Clearly

Before you can develop a strategy, you need to understand your situation with brutal clarity.

## What Diagnosis Is

Diagnosis is not a list of facts. It's an **interpretation** that:
- Identifies the critical challenge or opportunity
- Simplifies complexity into something actionable
- Reveals leverage points where action will have outsized impact

## The Diagnosis Trap

Most people skip real diagnosis. They jump straight to solutions.

"Sales are down 15%" → "Let's run a promotion!"

That's not diagnosis. That's reaction.

Real diagnosis asks: *Why* are sales down? Is it:
- Market contraction?
- Competitive pressure?
- Product-market fit erosion?
- Channel problems?
- Pricing issues?

Each diagnosis leads to a completely different strategy.

## Good Diagnosis Characteristics

**1. It names the challenge**
Not "improve performance" but "our cost structure is 20% above competitors due to legacy systems."

**2. It identifies leverage points**
Where can action have maximum impact?

**3. It's honest about constraints**
What can't you change? What must you accept?

## Exercise: Diagnosis Practice

Think about a challenge you're facing. Write one sentence that captures:
- The core problem (not symptoms)
- Why it matters
- What makes it hard to solve

This is the foundation of strategic thinking.
        `,
      },
      {
        id: 3,
        title: 'Guiding Policy: The Heart of Strategy',
        duration: '20 min',
        content: `
# Guiding Policy: The Heart of Strategy

The guiding policy is where strategy lives. It's the approach that bridges diagnosis and action.

## What a Guiding Policy Does

A guiding policy:
- **Constrains** the space of possible actions
- **Focuses** effort on what matters most
- **Aligns** diverse activities toward a common purpose

## Good vs. Bad Guiding Policies

**Bad**: "We will provide excellent customer service"
- Not a choice (who chooses bad service?)
- Doesn't constrain anything
- Provides no guidance

**Good**: "We will focus exclusively on enterprise customers with >1000 employees"
- Clear choice (not SMB, not mid-market)
- Constrains product, sales, marketing, support decisions
- Everyone knows what to do and what *not* to do

## The Guiding Policy Test

Ask: Does this policy help me decide between two reasonable options?

"Grow revenue" doesn't. Both Option A and Option B could grow revenue.

"Grow through product-led growth, not sales-led growth" does. Now you know which option to choose.

## Types of Guiding Policies

**Focus policies**: "We will own the premium segment"
**Leverage policies**: "We will exploit our data advantage"
**Hedge policies**: "We will maintain optionality by..."
**Sequential policies**: "First X, then Y, then Z"

## Your Guiding Policy

What's one choice that, if you made it clearly, would make dozens of other decisions easier?

That's the beginning of your guiding policy.
        `,
      },
      {
        id: 4,
        title: 'Coherent Actions: Strategy in Motion',
        duration: '15 min',
        content: `
# Coherent Actions: Strategy in Motion

Strategy without action is just philosophy. But actions without coherence is just busyness.

## What Coherence Means

Coherent actions:
- **Reinforce** each other
- **Support** the guiding policy
- **Address** the diagnosis

The whole is greater than the sum of parts.

## Incoherence: The Strategy Killer

Signs of incoherent actions:
- Initiatives that contradict each other
- Resources spread across unrelated priorities
- Actions that don't connect to the guiding policy
- "Strategic priorities" that number more than 3-5

## Building Coherence

**1. Start with the policy**
Every action should trace back to the guiding policy.

**2. Look for reinforcement**
Does Action A make Action B more effective? Good.

**3. Identify conflicts**
If two actions compete for the same resources or pull in different directions, you have a strategy problem.

**4. Sequence matters**
Some actions create conditions for others. Order them correctly.

## The Coherence Check

List your current major initiatives. For each one:
1. How does it support the guiding policy?
2. What other initiatives does it reinforce?
3. What does it conflict with?

If you can't answer clearly, you may have activity without strategy.

## Summary

Strategy = Diagnosis + Guiding Policy + Coherent Actions

Miss any element, and you don't have strategy. You have something else.
        `,
      },
    ],
    assignment: {
      title: 'Strategy Diagnosis',
      description: 'Apply the diagnostic framework to a real situation.',
      prompt: `Choose a strategic challenge you're currently facing (personal career, a project, your organization, or a business you know well).

Write a one-page diagnosis that includes:

1. **The Situation** (2-3 sentences): What's the context? What's at stake?

2. **The Core Challenge** (2-3 sentences): What's the fundamental problem or opportunity? Not symptoms—the root issue.

3. **Why It's Hard** (2-3 sentences): What constraints make this difficult? What tradeoffs are involved?

4. **Leverage Points** (2-3 sentences): Where could action have outsized impact? What's the 80/20?

Keep it to one page. Clarity and insight matter more than length.`,
      rubric: [
        'Shows clear distinction between symptoms and root causes',
        'Identifies specific constraints and tradeoffs',
        'Demonstrates honest assessment of the situation',
        'Identifies at least one genuine leverage point',
      ],
      wordLimit: 500,
    },
  },
  {
    id: 2,
    title: 'Competitive Positioning',
    subtitle: 'Where and How to Win',
    description:
      'Strategy only matters when you\'re competing for something. This module teaches you how to analyze competitive dynamics and position yourself to win.',
    objectives: [
      'Understand the five forces that shape competitive intensity',
      'Learn to identify sustainable competitive advantages',
      'Master positioning: differentiation vs. cost leadership',
      'Apply game theory basics to competitive decisions',
    ],
    lessons: [
      {
        id: 1,
        title: 'The Competitive Arena',
        duration: '20 min',
        content: `
# The Competitive Arena

You don't compete in a vacuum. Understanding your competitive arena is essential to strategy.

## Defining Your Arena

Your arena is not just your direct competitors. It includes:
- **Customers**: Their needs, alternatives, switching costs
- **Suppliers**: Their power over you
- **Substitutes**: Different solutions to the same problem
- **New Entrants**: Who might enter your space?
- **Rivals**: Current direct competitors

## The Five Forces

Porter's Five Forces is a classic framework because it works:

1. **Rivalry among existing competitors**
   - How intense is direct competition?
   - Price wars? Innovation races? Marketing battles?

2. **Threat of new entrants**
   - How easy is it to enter your market?
   - What barriers exist (or don't)?

3. **Bargaining power of suppliers**
   - Can suppliers squeeze your margins?
   - Are you dependent on key suppliers?

4. **Bargaining power of buyers**
   - Can customers demand lower prices?
   - How much leverage do they have?

5. **Threat of substitutes**
   - What else solves the customer's problem?
   - How close are the substitutes?

## Why This Matters

High competitive intensity = lower profits, harder positioning
Low competitive intensity = more strategic options

Your strategy must account for these forces, not ignore them.
        `,
      },
      {
        id: 2,
        title: 'Sustainable Competitive Advantage',
        duration: '25 min',
        content: `
# Sustainable Competitive Advantage

Everyone wants competitive advantage. Few understand what makes one sustainable.

## What Advantage Actually Means

Competitive advantage means you can:
- Command higher prices than competitors, OR
- Deliver at lower cost than competitors, OR
- Both (rare but powerful)

The key word is **sustainable**. Any advantage that can be copied quickly isn't really an advantage.

## Sources of Sustainable Advantage

**1. Network Effects**
The product becomes more valuable as more people use it. Hard to replicate once established.

**2. Switching Costs**
Customers find it expensive or painful to switch. Data, training, integration, habit.

**3. Scale Economies**
Larger scale = lower unit costs. Creates barriers to smaller competitors.

**4. Proprietary Technology**
Something you can do that others literally cannot. Patents, trade secrets, unique capabilities.

**5. Brand & Reputation**
Trust built over time. Takes years to build, moments to destroy.

**6. Regulatory Capture**
Rules that favor incumbents. Legal moats.

## The Imitation Test

For any advantage you think you have, ask:
- How long would it take a well-funded competitor to replicate this?
- What would they need to invest?
- What would they need to learn?

If the answer is "a few months and some money," it's not sustainable.

## The Advantage Audit

List your supposed advantages. For each:
1. What specifically is the advantage?
2. Why can't it be copied?
3. How long would replication take?

Be honest. Most "advantages" fail this test.
        `,
      },
      {
        id: 3,
        title: 'Positioning Choices',
        duration: '20 min',
        content: `
# Positioning Choices

Positioning is where you choose to compete and how you'll win there.

## The Two Generic Strategies

Porter identified two ways to win:

**1. Cost Leadership**
Be the lowest-cost producer. Compete on price while maintaining acceptable margins.

**2. Differentiation**
Offer something unique that customers value. Charge premium prices.

## The Stuck-in-the-Middle Trap

Many organizations try to be both cheap AND differentiated. They end up neither.

- Their costs are too high to win on price
- Their differentiation is too weak to command premiums
- They compete on neither dimension effectively

Pick one. Excel at it.

## Focus Strategies

You can apply either approach to a narrow segment:
- **Cost Focus**: Lowest cost within a specific segment
- **Differentiation Focus**: Unique value for a specific segment

Focus works when segments have distinct needs that broad competitors can't serve well.

## Making the Choice

Ask yourself:
1. Where can you achieve lowest cost? (Scale, process, sourcing?)
2. Where can you differentiate? (Features, service, brand, experience?)
3. Which is more sustainable given your capabilities?
4. Which fits your competitive arena better?

The answer should shape everything else you do.
        `,
      },
      {
        id: 4,
        title: 'Game Theory Basics',
        duration: '20 min',
        content: `
# Game Theory Basics

Your competitors will respond to your moves. Game theory helps you think through those dynamics.

## The Strategic Game

A strategic game has:
- **Players**: You and your competitors
- **Moves**: Actions each player can take
- **Payoffs**: Outcomes based on combined moves
- **Information**: What each player knows

## Key Concepts

**1. Nash Equilibrium**
A situation where no player can benefit by changing their strategy alone. Everyone is doing the best they can given what others are doing.

**2. Prisoner's Dilemma**
When individual rationality leads to collective irrationality. Price wars often look like this.

**3. First-Mover Advantage**
Sometimes moving first creates advantages (market position, standards). Sometimes it creates disadvantages (uncertainty, competitor learning).

**4. Signaling**
Actions that communicate information to competitors. A price cut might signal "don't enter my market." Building capacity might signal "I'm committed to this space."

## Applying Game Theory

When making strategic moves, ask:
1. How will competitors likely respond?
2. How will I respond to their response?
3. Where does this sequence end?
4. Is there a stable equilibrium?

## Avoiding Zero-Sum Thinking

Not all competition is zero-sum. Sometimes you can:
- Grow the overall market
- Find complementary positions
- Create win-win dynamics

Look for these opportunities before defaulting to direct competition.
        `,
      },
    ],
    assignment: {
      title: 'Competitive Position Analysis',
      description: 'Analyze a competitive arena and your position within it.',
      prompt: `Choose a market or competitive arena you know well (your industry, a side project, or a company you've studied).

Write a competitive position analysis that includes:

1. **Five Forces Summary** (5-7 sentences): Briefly assess each force's strength and overall industry attractiveness.

2. **Your Position** (4-5 sentences): Where do you (or the focal company) sit in this arena? What's the current competitive approach?

3. **Sustainable Advantage Assessment** (4-5 sentences): What advantages exist? Apply the imitation test—are they truly sustainable?

4. **Strategic Recommendation** (3-4 sentences): Based on your analysis, what positioning would you recommend? Cost leadership, differentiation, or focus? Why?

Be specific. Use evidence from your analysis to support your recommendation.`,
      rubric: [
        'Accurate application of five forces framework',
        'Honest assessment of competitive advantages',
        'Clear connection between analysis and recommendation',
        'Demonstrates understanding of positioning tradeoffs',
      ],
      wordLimit: 600,
    },
  },
  {
    id: 3,
    title: 'Strategic Decision-Making',
    subtitle: 'Thinking Under Uncertainty',
    description:
      'Strategy happens under uncertainty. This module builds your decision-making toolkit for navigating ambiguity, weighing options, and making high-quality choices.',
    objectives: [
      'Understand different types of uncertainty and how to handle each',
      'Learn frameworks for structuring complex decisions',
      'Master the art of strategic options and optionality',
      'Develop judgment for irreversible vs. reversible decisions',
    ],
    lessons: [
      {
        id: 1,
        title: 'Uncertainty Types',
        duration: '18 min',
        content: `
# Uncertainty Types

Not all uncertainty is the same. Different types require different approaches.

## The Four Levels

**Level 1: Clear Enough Future**
You can develop a point forecast. Traditional analysis works.
Example: Demand in a mature, stable market.

**Level 2: Alternate Futures**
A few discrete outcomes are possible. Scenario planning works.
Example: Regulation might pass or not.

**Level 3: Range of Futures**
Outcomes fall within a range, but you can't define discrete scenarios.
Example: How fast will AI adoption curve be?

**Level 4: True Ambiguity**
Can't define the range of outcomes or probabilities.
Example: Emerging technology's impact on your industry.

## Why This Matters

Level 1 → Optimize
Level 2 → Prepare for scenarios
Level 3 → Build flexibility
Level 4 → Probe and adapt

Using Level 1 tools in a Level 4 situation is strategic malpractice.

## Identifying Your Level

Ask:
- Can I forecast a single likely outcome? (Level 1)
- Can I identify a few discrete possibilities? (Level 2)
- Can I bound the range of outcomes? (Level 3)
- Am I truly in the dark? (Level 4)

Be honest. Many leaders treat Level 3 and 4 situations as Level 1 because it feels more "rigorous."
        `,
      },
      {
        id: 2,
        title: 'Decision Frameworks',
        duration: '22 min',
        content: `
# Decision Frameworks

Good strategists have a toolkit of decision frameworks. Here are the essential ones.

## Expected Value

When you can assign probabilities:
EV = Σ (Probability × Outcome)

Use for: Repeatable decisions, Level 1-2 uncertainty

Watch out for: Ignoring variance, pretending you know probabilities you don't

## Regret Minimization

Ask: "In 20 years, which choice will I regret not making?"

Use for: Major life/career decisions, irreversible choices

Watch out for: Over-weighting exciting options, under-weighting risk

## Reversibility Test

How reversible is this decision?
- Highly reversible → Move fast, iterate
- Irreversible → Slow down, analyze deeply

Bezos calls these Type 1 (irreversible) vs Type 2 (reversible) decisions.

## Kill Criteria

Pre-define conditions that would cause you to abandon a course of action.
"If X happens, we stop."

Prevents sunk cost fallacy. Enables learning.

## The OODA Loop

Observe → Orient → Decide → Act

Speed through this loop = competitive advantage in dynamic environments.

## Choosing Your Framework

The right framework depends on:
- Uncertainty level
- Reversibility
- Time pressure
- Stakes involved

No framework is universal. Match the tool to the situation.
        `,
      },
      {
        id: 3,
        title: 'Strategic Options',
        duration: '20 min',
        content: `
# Strategic Options

Options create the right to act without the obligation. This is powerful under uncertainty.

## What Strategic Options Are

An option gives you:
- The right to make a move in the future
- Without requiring you to make it
- At a known cost (the option premium)

## Types of Strategic Options

**Growth Options**
Investments that open up future opportunities.
Example: R&D that might lead to new products.

**Flexibility Options**
Capabilities that allow you to respond to changes.
Example: Multi-skilled workforce, modular architecture.

**Exit Options**
Ability to abandon or pivot.
Example: Lease vs. buy, partnerships vs. acquisitions.

**Learning Options**
Small bets that generate information.
Example: Pilots, MVPs, experiments.

## Valuing Options

Options are worth more when:
- Uncertainty is high
- The potential upside is large
- The cost of the option is low
- You have time before expiration

Traditional NPV undervalues optionality. It treats flexibility as worth nothing.

## Creating Options

Strategies that create options:
- Build platforms instead of products
- Develop general capabilities instead of narrow ones
- Maintain cash reserves
- Create reversible commitments
- Run small experiments

## The Option Mindset

Don't ask: "What should we do?"
Ask: "What options do we want to create, exercise, or let expire?"

This mindset is transformative under uncertainty.
        `,
      },
      {
        id: 4,
        title: 'Judgment and Bias',
        duration: '18 min',
        content: `
# Judgment and Bias

Even the best frameworks are useless without good judgment. And judgment requires understanding our biases.

## Key Strategic Biases

**Overconfidence**
We think we know more than we do. Our predictions are overconfident.
Counter: Seek disconfirming evidence. Assign probabilities honestly.

**Sunk Cost Fallacy**
Past investments shouldn't affect future decisions. But they do.
Counter: Use kill criteria. Ask "would I make this decision fresh?"

**Anchoring**
First information unduly influences judgment.
Counter: Generate multiple anchors. Consider the reference class.

**Confirmation Bias**
We seek evidence that confirms what we believe.
Counter: Appoint devil's advocates. Seek out criticism.

**Status Quo Bias**
We overvalue the current state.
Counter: Treat "do nothing" as an active choice with consequences.

## Improving Judgment

**1. Keep a decision journal**
Write down predictions and reasoning. Review outcomes.

**2. Seek diverse perspectives**
People with different backgrounds catch different errors.

**3. Use pre-mortems**
Imagine the decision failed. Ask why.

**4. Decompose complex judgments**
Break big predictions into components you can assess separately.

**5. Calibrate over time**
Track your accuracy. Adjust confidence accordingly.

## The Ultimate Test

Good judgment comes from experience. Experience comes from bad judgment.

The key is to learn from each decision, good or bad.
        `,
      },
    ],
    assignment: {
      title: 'Decision Analysis',
      description: 'Apply decision frameworks to a strategic choice.',
      prompt: `Identify a significant decision you're facing (or one you faced recently).

Write a decision analysis that includes:

1. **The Decision** (2-3 sentences): What's the choice? What are the main options?

2. **Uncertainty Assessment** (3-4 sentences): What level of uncertainty are you facing? What don't you know?

3. **Framework Application** (4-5 sentences): Which decision framework is most appropriate? Apply it to your situation.

4. **Options Analysis** (3-4 sentences): What options could you create? What's the value of maintaining flexibility?

5. **Bias Check** (2-3 sentences): What biases might be affecting your judgment? How can you counter them?

6. **Decision and Rationale** (2-3 sentences): What would you decide? Why?

Show your reasoning. The process matters as much as the conclusion.`,
      rubric: [
        'Correctly identifies uncertainty level',
        'Applies appropriate decision framework',
        'Demonstrates understanding of optionality',
        'Shows awareness of personal biases',
      ],
      wordLimit: 600,
    },
  },
  {
    id: 4,
    title: 'Execution & Adaptation',
    subtitle: 'Strategy in the Real World',
    description:
      'Strategy means nothing without execution. But in a changing world, execution must be adaptive. This module teaches you how to implement strategy while remaining flexible.',
    objectives: [
      'Understand the strategy-execution gap and how to close it',
      'Learn to translate strategy into aligned objectives',
      'Master the art of strategic adaptation and pivoting',
      'Build feedback loops that enable learning',
    ],
    lessons: [
      {
        id: 1,
        title: 'The Execution Gap',
        duration: '18 min',
        content: `
# The Execution Gap

Most strategies fail in execution, not conception. Understanding why is the first step.

## Why Execution Fails

**1. Strategy is unclear**
People can't execute what they don't understand. Vague strategies create execution gaps.

**2. Priorities proliferate**
When everything is important, nothing is. Focus gets lost.

**3. Resources don't align**
Budget and people flow to existing activities, not strategic priorities.

**4. Incentives contradict**
People are rewarded for things that don't support strategy.

**5. Communication breaks down**
Strategy doesn't cascade. Middle layers don't understand their role.

## The Translation Problem

Strategy speaks in abstractions: "Be the premium leader."
Execution requires specifics: "Redesign packaging by Q2. Train sales team on value selling by March."

The gap between these is where strategies go to die.

## Closing the Gap

**Make it concrete**: Translate strategy into specific, measurable outcomes.
**Make it few**: Limit strategic priorities to 3-5 maximum.
**Make it visible**: Track progress publicly.
**Make it rewarded**: Align incentives with strategic priorities.
**Make it understood**: Every level should know their role.

Strategy is not a document. It's a conversation that must happen at every level.
        `,
      },
      {
        id: 2,
        title: 'Objectives and Key Results',
        duration: '20 min',
        content: `
# Objectives and Key Results

OKRs are a powerful system for translating strategy into aligned action.

## The OKR Structure

**Objective**: What you want to achieve. Qualitative, inspiring, time-bound.
**Key Results**: How you measure progress. Quantitative, specific, measurable.

## Good OKRs

**Objective**: Become the trusted choice for enterprise customers
**Key Results**:
- Increase enterprise NPS from 42 to 60
- Close 3 Fortune 500 accounts
- Reduce enterprise churn from 8% to 4%

Note: The KRs are outcomes, not activities. "Launch feature X" is not a KR.

## Bad OKRs

**Objective**: Improve sales
**Key Results**:
- Make more sales calls
- Hire 2 salespeople
- Update CRM

Problems: Vague objective, activity-based KRs, no clear success criteria.

## The OKR Cascade

Company OKRs → Team OKRs → Individual OKRs

Each level's OKRs should contribute to the level above. But not mechanically—teams should have autonomy to determine *how* they contribute.

## Setting Good OKRs

1. **Start with strategy**: What does our guiding policy require?
2. **Identify outcomes**: What would success look like?
3. **Make it measurable**: How will we know we succeeded?
4. **Make it ambitious**: 70% achievement should be good performance.
5. **Keep it few**: 3-5 objectives, 3-5 KRs each.

## OKRs Enable Alignment Without Control

When well-done, OKRs let autonomous teams work toward common goals without constant coordination.
        `,
      },
      {
        id: 3,
        title: 'Adaptive Strategy',
        duration: '22 min',
        content: `
# Adaptive Strategy

The world changes. Your strategy must change with it.

## The Planning Fallacy

Traditional strategic planning assumes:
- You can predict the future
- Plans should be detailed
- Deviation = failure

This works in stable environments. How many environments are stable?

## Adaptive Strategy Principles

**1. Separate strategic intent from tactical plans**
Intent is stable. Plans should change constantly.

"Win the enterprise segment" = Intent
"Launch feature X in Q3" = Plan (changeable)

**2. Build feedback loops**
How will you know if strategy is working? What signals will you watch?

**3. Create decision triggers**
"If X happens, we will do Y." Pre-commit to adaptation.

**4. Run experiments**
Small bets generate information. Information reduces uncertainty.

**5. Preserve optionality**
Don't commit irrevocably. Maintain ability to change course.

## When to Adapt vs. Persist

Adapt when:
- Key assumptions prove false
- The competitive landscape shifts fundamentally
- New information changes the calculation

Persist when:
- Results are poor but diagnosis remains valid
- You haven't given the strategy enough time
- Short-term pressures conflict with long-term intent

## The Adaptation Trap

Adapting too quickly = no strategy
Adapting too slowly = obsolete strategy

Finding the balance is judgment, not formula.
        `,
      },
      {
        id: 4,
        title: 'Learning Loops',
        duration: '18 min',
        content: `
# Learning Loops

Strategy execution should generate learning. Learning should improve strategy.

## The Learning Loop

**Act** → **Measure** → **Learn** → **Adjust** → (repeat)

Without this loop, you're flying blind.

## What to Measure

**Leading indicators**: Early signals of success or failure
**Lagging indicators**: Outcomes (often too late to act on)
**Process metrics**: Are you doing what you planned?
**Outcome metrics**: Are you achieving what you intended?

The best systems track leading indicators. They provide time to adapt.

## Creating Learning Rhythms

**Weekly**: Are we on track with current initiatives?
**Monthly**: Are our tactics working?
**Quarterly**: Is our strategy working?
**Annually**: Is our strategic direction right?

Different cadences for different levels of strategy.

## The Retrospective Practice

Regularly ask:
- What went well?
- What didn't go well?
- What did we learn?
- What will we do differently?

Simple. Powerful. Rarely done well.

## Building a Learning Culture

- Celebrate learning, not just success
- Share failures openly
- Make data visible to everyone
- Reward adaptation based on evidence
- Punish only failure to learn

## The Strategic Advantage of Learning

In dynamic environments, the ability to learn and adapt faster than competitors is the ultimate competitive advantage.

Speed of learning > Quality of initial strategy
        `,
      },
    ],
    assignment: {
      title: 'Execution Plan',
      description: 'Create an execution plan for a strategic objective.',
      prompt: `Choose a strategic objective (from your own work or hypothetical).

Create an execution plan that includes:

1. **Strategic Objective** (2-3 sentences): What are you trying to achieve? Connect it to the broader strategy.

2. **Key Results** (3-4 bullets): How will you measure success? Define specific, measurable KRs.

3. **Critical Assumptions** (2-3 bullets): What must be true for this to work? What are you betting on?

4. **Adaptation Triggers** (2-3 bullets): What would cause you to change course? Define specific triggers.

5. **Learning Plan** (3-4 sentences): How will you generate feedback? What will you measure and when will you review?

Make this actionable. Someone should be able to execute from what you write.`,
      rubric: [
        'Clear connection between objective and broader strategy',
        'Key results are measurable outcomes, not activities',
        'Demonstrates understanding of adaptive execution',
        'Includes specific learning mechanisms',
      ],
      wordLimit: 500,
    },
  },
  {
    id: 5,
    title: 'Strategic Synthesis',
    subtitle: 'Your Strategic Doctrine',
    description:
      'The final module brings everything together. You\'ll synthesize your learning into a personal Strategic Doctrine—a living document that captures how you approach strategic thinking.',
    objectives: [
      'Integrate the frameworks and concepts from all modules',
      'Develop your personal strategic principles',
      'Create your Strategic Doctrine document',
      'Build habits for ongoing strategic development',
    ],
    lessons: [
      {
        id: 1,
        title: 'Integration',
        duration: '20 min',
        content: `
# Integration

You've learned the pieces. Now let's put them together.

## The Strategy Flow

1. **Diagnosis** (Module 1)
   - What's the situation?
   - What's the core challenge?

2. **Competitive Analysis** (Module 2)
   - What's the arena?
   - Where can you win?

3. **Decision Making** (Module 3)
   - What are your options?
   - How do you choose?

4. **Execution** (Module 4)
   - How do you translate to action?
   - How do you adapt?

5. **Synthesis** (This module)
   - What are your principles?
   - How do you continuously improve?

## The Strategic Cycle

Strategy is not linear. It's cyclical:
- Execute
- Learn
- Adapt diagnosis
- Adjust position
- Refine decisions
- Improve execution
- (Repeat)

## Your Synthesis Journey

Over the next lessons, you'll:
1. Reflect on what you've learned
2. Identify your strategic patterns
3. Articulate your principles
4. Create your Strategic Doctrine

This isn't academic. It's the foundation of your strategic practice.
        `,
      },
      {
        id: 2,
        title: 'Personal Strategic Patterns',
        duration: '18 min',
        content: `
# Personal Strategic Patterns

You already have strategic patterns—habitual ways you approach challenges. Let's surface them.

## Common Patterns

**The Optimizer**
Tends to analyze deeply before acting. Strength: thoroughness. Risk: analysis paralysis.

**The Experimenter**
Prefers small bets and iteration. Strength: learning speed. Risk: lack of commitment.

**The Visionary**
Focuses on where to go. Strength: inspiration. Risk: execution gaps.

**The Executor**
Focuses on getting things done. Strength: results. Risk: may optimize the wrong thing.

**The Adapter**
Responds quickly to changes. Strength: flexibility. Risk: lack of strategic persistence.

## Identifying Your Pattern

Reflect:
- When facing a challenge, what's your first instinct?
- Where do you spend most of your strategic energy?
- What comes easy? What's hard?
- What feedback do you consistently receive?

## Leveraging Your Pattern

Your pattern isn't good or bad—it's yours. The key is to:
1. Know your default tendencies
2. Leverage your strengths
3. Compensate for your weaknesses
4. Build complementary capabilities

## Growing Beyond Your Pattern

Strategic growth often means developing your weaker areas:
- If you over-analyze, practice deciding faster
- If you under-plan, practice more diagnosis
- If you're too flexible, practice commitment
- If you're too rigid, practice adaptation

Where do you need to grow?
        `,
      },
      {
        id: 3,
        title: 'Strategic Principles',
        duration: '20 min',
        content: `
# Strategic Principles

Principles are decision rules that hold across situations. They're more flexible than rules, more actionable than values.

## What Good Principles Do

A good strategic principle:
- Guides decisions when you're uncertain
- Creates consistency across situations
- Aligns others without requiring constant direction
- Reflects hard-won wisdom

## Example Strategic Principles

**On Positioning**
"We don't compete on price. Ever."
"Be the choice for the premium segment."

**On Decisions**
"When in doubt, choose the reversible option."
"Kill projects based on pre-set criteria, not sunk costs."

**On Execution**
"Ship fast, learn fast, improve fast."
"No more than 3 strategic priorities at once."

**On Competition**
"Never underestimate a focused competitor."
"Avoid commodity traps."

## Developing Your Principles

Ask yourself:
- What strategic lessons have I learned the hard way?
- What rules would I tell my younger self?
- What decisions do I always approach the same way?
- What patterns have served me well?

## Testing Your Principles

For each principle, check:
- Has it been tested in real decisions?
- Does it actually guide action?
- Is it specific enough to be useful?
- Does it reflect genuine belief?

Principles should be proven, not aspirational.
        `,
      },
      {
        id: 4,
        title: 'Creating Your Strategic Doctrine',
        duration: '22 min',
        content: `
# Creating Your Strategic Doctrine

Your Strategic Doctrine is a personal document that captures how you think about strategy.

## What a Strategic Doctrine Is

Not a strategy for a specific situation. Rather:
- Your strategic worldview
- Your decision-making principles
- Your approach to common strategic challenges
- A foundation for future strategic work

## Doctrine Structure

**1. Strategic Worldview** (How I see strategy)
- What strategy means to you
- What good strategy looks like
- Common mistakes to avoid

**2. Diagnostic Approach** (How I assess situations)
- Key questions you always ask
- Frameworks you rely on
- How you identify core challenges

**3. Decision Principles** (How I make strategic choices)
- Your personal decision rules
- How you handle uncertainty
- When you commit vs. stay flexible

**4. Execution Philosophy** (How I translate to action)
- How you bridge strategy and execution
- How you build alignment
- How you adapt

**5. Development Practices** (How I keep improving)
- How you continue learning
- How you seek feedback
- How you update your thinking

## The Living Document

Your doctrine should:
- Evolve as you learn
- Be tested against real decisions
- Be revisited regularly
- Grow with your experience

This is not a one-time exercise. It's a practice.

## Your Final Assignment

You'll create your Strategic Doctrine in the module assignment. This is your capstone—the synthesis of everything you've learned.

Make it personal. Make it practical. Make it yours.
        `,
      },
    ],
    assignment: {
      title: 'Your Strategic Doctrine',
      description: 'Create your personal Strategic Doctrine document.',
      prompt: `Create your Strategic Doctrine—a personal document that captures your strategic worldview.

Include the following sections:

**1. Strategic Worldview** (4-6 sentences)
What is strategy to you? What makes strategy good? What mistakes must be avoided?

**2. Diagnostic Approach** (3-5 sentences)
How do you assess strategic situations? What questions do you always ask? What do you look for?

**3. Decision Principles** (4-6 bullets)
Your personal rules for strategic decisions. These should be specific enough to guide action.

**4. Execution Philosophy** (3-5 sentences)
How do you translate strategy to action? How do you build alignment? How do you adapt?

**5. Development Commitment** (2-3 sentences)
How will you continue developing your strategic thinking? What practices will you maintain?

This is YOUR doctrine. It should reflect your genuine beliefs and hard-won lessons, not generic advice. Make it something you'd actually use.`,
      rubric: [
        'Demonstrates integration of course concepts',
        'Principles are specific and actionable',
        'Reflects genuine personal perspective',
        'Shows commitment to ongoing development',
      ],
      wordLimit: 800,
    },
  },
];

// Helper function to get a specific module
export function getModule(moduleId: number): ModuleContent | undefined {
  return CANON_MODULES.find((m) => m.id === moduleId);
}

// Helper function to get a specific lesson
export function getLesson(
  moduleId: number,
  lessonId: number
): LessonContent | undefined {
  const module = getModule(moduleId);
  return module?.lessons.find((l) => l.id === lessonId);
}
