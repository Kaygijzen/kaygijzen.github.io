import { Code2, Network, Brain, Bot } from 'lucide-react'
import type { BuildCard } from '../types/content'

export const buildCards: BuildCard[] = [
  {
    label: 'Software Engineering',
    subtitle: 'The infrastructure AI runs on',
    description:
      'Developing end-to-end solutions across the full stack, from data ingestion and machine learning pipelines to deployed APIs, frontend applications, and automated delivery workflows.',
    icon: Code2,
  },
  {
    label: 'Machine Learning & MLOps',
    subtitle: 'From experiment to deployed model',
    description:
      'Delivering end-to-end MLOps, from experimentation and feature engineering to deployment, model governance, and drift monitoring to enable timely retraining.',
    icon: Network,
  },
  {
    label: 'RAG & Knowledge Systems',
    subtitle: 'Grounding LLMs in truth',
    description:
      'Grounding AI responses in trusted knowledge through retrieval, re-ranking, and evaluation — reducing hallucinations and improving factual accuracy.',
    icon: Brain,
  },
  {
    label: 'Agents & Orchestration',
    subtitle: 'Reasoning and tool use, with guard-rails',
    description:
      'Autonomous agents that reason, plan, and call tools reliably — with the guard-rails, fallbacks, and observability that make them safe to run in production.',
    icon: Bot,
  },
]
