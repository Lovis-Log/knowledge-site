---
slug: 02-jensen-huang-mindset
title: "Jensen Huang: The Mindset That Built NVIDIA"
summary: A conversation about starting with the wrong technology, keeping an organisation first-principles, and why systems thinking now matters more than writing code.
updatedAt: 2026-11-01
content_type: podcast-interview
tags:
  - entrepreneurship
  - systems-thinking
  - ai-agents
categories:
  - general-collection
sources:
  - kind: video
    title: "Jensen Huang: The Mindset That Built NVIDIA"
    url: https://www.youtube.com/watch?v=I4B37S1dyQQ
    author: Y Combinator
    publishedAt: 2026-07-27
---

## The shape of the conversation

A conversation at Y Combinator's Startup School 2026 between Garry Tan and Jensen Huang, founder and CEO of NVIDIA. The arc runs roughly: the company started with the wrong technology, was saved by textbooks, survived on a Sega cheque, turned at AlexNet, and then — organisation, systems thinking, agents, jobs, robotics, and advice for young people.

The most counterintuitive part is the opening admission: NVIDIA did not succeed by picking the right direction at the start. Its founding algorithm and technology were completely wrong, and the company learned its way out only after admitting that.

## Timeline

| Time | Topic |
| --- | --- |
| 1:18 | The founding technology was "exactly wrong": accelerators to redo 3D graphics |
| 2:25 | Discovering the error in 1995, with 35–40 competitors already building PC 3D graphics |
| 3:31 | Buying three OpenGL textbooks at Fry's and handing them to the engineers |
| 4:10 | The lesson: technology keeps changing, so confronting reality and learning matters more |
| 5:29 | The real big idea: use accelerators for problems the CPU cannot solve |
| 7:35 | Sega contracted the successor to Saturn, later Dreamcast |
| 9:01 | Admitting the work was impossible, and still receiving $5 million |
| 9:37 | The 1999 IPO valued the company at $300 million |
| 10:33 | Seeing AlexNet as a universal function approximator |
| 12:44 | Rethinking the whole stack: processor, middleware, algorithms, applications |
| 13:30 | A first-principles organisation: start from curiosity, the CEO serves the company |
| 17:01 | The F1 metaphor: build the car you can drive |
| 20:50 | Systems thinking as the new coding: inputs, outputs, constraints, bottlenecks |
| 23:26 | What agents lack is fine-grained controllability |
| 25:43 | How NVIDIA uses agents internally: let a thousand tools bloom |
| 30:51 | AI eliminates tasks, not jobs: engineers and radiologists |
| 34:21 | Physical AI: from generated video to robotic articulation |
| 37:24 | Physical AI lands first in self-driving, roughly a $10 billion business |
| 41:01 | What young people should learn: hard science and systems thinking |
| 44:09 | Fear at founding, resilience, and "how hard can it be" |

## Starting out: wrong technology, then learning it

In 1993, with the PC only rumoured to be arriving, Huang and his two co-founders set out to turn every personal computer into a game console by augmenting the CPU with accelerators.

That direction — augmenting the CPU — turned out to be right. The algorithm and technology used to pursue it were, in his words, exactly wrong. By 1995 the company realised this, with 35 or 40 other companies already building 3D graphics for PCs, and the team not only having chosen the wrong path but not knowing the right one.

His message inside the company was that without confronting the fact that the technology did not work, there would be no company.

The scene he describes next is the most vivid in the interview: he went to Fry's with a couple of hundred dollars in his pocket, bought three textbooks on OpenGL and pipeline design, and brought them back for the engineers. NVIDIA went on to reinvent computer graphics and to produce most of the major breakthroughs in the field over the following 25 years.

His conclusion: **technology keeps changing, so the technology choice is not fatal; the ability to confront reality and learn the next thing is the dividing line.**

The big idea that was right: use accelerators to solve problems the CPU cannot — molecular dynamics, image processing, inverse physics, and eventually deep learning. That reframed the company from "build a great chip" to "accelerate an algorithm domain".

His definition of a great company follows from this: not technology and not market, but **a unique perspective about the world that you deeply believe in**, ideally paired with a pursuit that is hard to execute. Having the right technology for the right market at the right time makes life easier, but those are by-products.

## Sega: admitting failure and still getting paid

The deal that exposed the wrong algorithm came from Sega, which had contracted NVIDIA to build the successor to the Saturn — what became the Dreamcast.

Huang flew to Japan and told the CEO directly that the technology did not work, that the contract could not be fulfilled, and that Sega should choose someone else. He also told him, plainly, that he still needed the money.

The reply, as he recalls it: so what you are telling me is that you cannot do what I contracted you to do, but you would like all the money anyway? Yes, exactly.

He describes the manner as polite, humble and honest, and the CEO recognised it as such. The $5 million that followed kept the company alive long enough to find the right direction. His summary is the familiar investing line: you do not invest in companies, you invest in people.

NVIDIA went public in 1999 at a $300 million valuation.

## AlexNet: seeing a method rather than a model

Many people saw AlexNet as a model with high accuracy. Huang says he saw a **universal function approximator**: give it the answer for almost any function and it can learn what the function is — and most interesting problems are imprecise by nature, and cannot be made precise.

That judgement changed the whole stack rather than a single product. He describes reasoning almost immediately about a five-layer structure — processor, middleware, algorithms, applications, and how people would use them — and starting work on computer vision, robotics and self-driving cars at once.

One methodological habit is worth extracting: his lens has always been algorithms, not chips. When something new appears, the questions are not "what product is this" but:

- What is this algorithm?
- Why is it effective?
- What else can it do?
- If you scale it, what could it solve that is unsolvable today?

## Organisation: first principles, and building a car you can drive

Asked how going deep — reading papers, talking to principal scientists — coexists with running an organisation, Huang answers with temperament rather than technique. Everything starts with curiosity. He seeks the answers himself first; when a field turns out to matter to the company, he learns as much as possible so he can be of service by sharing it. In his framing, a CEO serves the company and its people by handing them insight.

He uses surfing to explain why staying close to the ground matters: the wave looks like chaos, but a surfer can read it because they have been in the water. The faster technology changes, the more that tactile sense is required; second-hand reports make it feel too fast to understand.

The better-known image is the F1 car: founders are building the car they will race, so it should be built to fit how they drive. Asked what happens to the company when he leaves, his answer is that when he dies on the job, the next CEO will reshape the company to fit themselves.

## Systems thinking replaces coding

Asked what capability matters most, he names systems thinking: systems understanding, systems design, systems organisation.

The reasoning is direct. Low-level work is being taken over by agents. In chip design, transistors, gates and functional blocks have long been synthesised automatically, so designers are really systems designers; in software, most coding will be done agentically. What remains for people is to think abstractly about the system — what problem, what constraints, where the inputs and outputs are, at what rate information flows in and out, and whether the bottleneck is processor, memory or networking.

That knowledge, he argues, will never become useless, and will only become more useful.

## Agents: capability is there, control is not

His view of agents has a concrete edge: recursive self-improvement is already happening. Every time you use one, it updates its long-term memory, rewrites Markdown files, compacts memory or turns it into knowledge graphs.

The bottleneck is not capability but **fine-grained controllability**. His example: change one word in a plan file and it should produce a precise local difference — one pixel, one triangle, one component in a CAD file, one layer, one via, one connection — with everything else regenerated around it.

He does not require the agent to be perfect: 80% and a human finishing the rest is acceptable; 99% and a human finishing the last bit is fine too. Controllability matters more than accuracy.

On open source, he calls OpenClaw a Linux moment: the operating system that will hold a large language model, which everybody should be able to build for themselves. NVIDIA's response was to offer its engineers to those projects.

## Jobs: AI eliminates tasks

Asked what happens to the economy, he answers that many tasks will be automated — especially where all the information is already at hand and the job is to produce a response — that every job will change, and that many new jobs will appear.

He offers three counterexamples to the "AI destroys jobs" narrative:

- Programming as a task has been heavily automated, yet software engineering jobs are growing about 10% year over year.
- Reading radiology scans has been automated, yet radiology jobs have grown roughly 20% in recent years — because the backlog of patients is enormous, and seeing more patients requires more nurses and radiologists.
- Paralegal jobs were predicted to disappear, yet they are growing fast, because the backlog of lawsuits is similarly large.

His explanation: a job has a purpose, and the purpose consists of many tasks. Tasks can be removed; the purpose is not removed. Capacity freed by automation runs into demand that was never being met.

## Physical AI: from generated video to robots

What convinced him robotics was close was generative video: if you can generate video of a finger moving, or a hand picking up a glass, why can't a robot do the same?

That raises the central question of how a robot generates motion that obeys physics — causality, friction, tension. This is what he calls physical AI, built on world foundation models and three pieces: real-to-sim, physics-grounded and generative simulation, and sim-to-real.

He argues the ChatGPT moment for robots already happened about two years ago: just as early ChatGPT produced nothing useful but expanded what people imagined, robots two years ago could already be reinforcement-learned, fine-tuned and grounded in physics. What remains is environments, evaluation and post-training.

On sequencing, they judged that the first application with a large enough market and sufficiently standardised technology was self-driving. NVIDIA chips and software are in Waymo, Tesla and Mercedes vehicles and data centres, and they open-sourced the self-driving stack (Alpamayo) because agriculture, mail delivery and warehouse AMRs all need it, and none of those markets alone justifies building one. His figure: the robotics and autonomous vehicle business is close to $10 billion now, will become the next hundred-billion-dollar business, and will take between three and ten years.

## Advice for young people

- **Simple work gets automated.** He compares it to long division: his generation had to learn it, nobody does it by hand now. Sitting at a computer writing code is next.
- **Hard problems remain.** Physics, chemistry, biology, computer science, computer engineering, systems thinking — especially where fields intersect, plus the intersection of technology and social issues, and spotting gaps in markets.
- **Systems thinking compounds.** The better you can orchestrate millions of agents solving problems autonomously, the better placed you are.
- **Still go to school.** His words: stay in school.
- **Adopt "how hard can it be".** He concedes it is always harder than you think, but the point is not to convert that difficulty into anxiety before you start; let the suffering arrive a little at a time.
- **Resilience is the single most important trait.** You do not have to overcome life in one day — only this morning, only today, then work towards tomorrow.

## Comprehension check

1. **NVIDIA started with technology that was "exactly wrong". Why did the company survive?**
   Answer: They admitted the technology did not work and immediately went to learn the right approach, buying OpenGL textbooks for the engineers. Huang's conclusion is that the technology choice is not fatal; confronting reality and continuing to learn is what matters.

2. **Why did the $5 million from Sega matter?**
   Answer: The company had found its algorithm unworkable and could not fulfil the contract. Huang told Sega so, advised them to choose another partner, and said he still needed the money. Sega paid based on trust in the people, which kept NVIDIA alive until it found the right direction.

3. **What did he see when he saw AlexNet?**
   Answer: Not a single model but a universal function approximator — give it the answer and it learns the function, and most interesting problems are imprecise anyway. From that he reasoned about rebuilding the entire stack.

4. **What does the "build a car you can drive" metaphor mean?**
   Answer: Founders should shape the organisation around their own temperament and working style rather than adopt a generic management template, because they are the ones racing the car; the next CEO will reshape it for themselves.

5. **Why does he consider systems thinking more important than coding?**
   Answer: Low-level work is being taken over by agents — chip synthesis and most coding are automated. What remains is defining the problem, constraints, inputs and outputs, and locating bottlenecks, and that judgement is not automated away.

6. **What do agents most lack today?**
   Answer: Fine-grained controllability. The ideal is changing one word in a plan file and getting a precise local difference with everything else regenerated; 80% accuracy is acceptable because controllability matters more than accuracy.

7. **How does he argue that AI eliminates tasks rather than jobs?**
   Answer: Programming has been automated yet software engineering jobs grow about 10%; radiology reading is automated yet radiology jobs grow about 20%; paralegal roles are growing too. A job's purpose contains many tasks, and freed capacity goes to demand that was already backlogged.

## Relation to the rest of this book

This chapter is about pushing an organisation and a technology forward under uncertainty; the previous chapter is about making an idea clear enough to say out loud. Both point the same way: structure the problem in your head before acting. The next chapter applies exactly that structuring to everyday AI workflows.
