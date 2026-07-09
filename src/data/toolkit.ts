import { Database, Cloud } from 'lucide-react'
import {
  SiPython,
  SiGo,
  SiPytorch,
  SiLangchain,
  SiDjango,
  SiFastapi,
  SiReact,
  SiDatabricks,
  SiMlflow,
  SiApachespark,
  SiDocker,
  SiLinux,
} from 'react-icons/si'
import type { ToolkitItem } from '../types/content'

// Most icons are brand marks from react-icons/si, but a couple (SQL, MS
// Azure) fall back to plain lucide-react icons where no vendor-neutral or
// unrestricted brand logo is available.
export const toolkitItems: ToolkitItem[] = [
  { icon: SiPython, label: 'Python' },
  { icon: SiGo, label: 'Go' },
  { icon: Database, label: 'SQL' },
  { icon: SiPytorch, label: 'PyTorch' },
  { icon: SiLangchain, label: 'LangChain' },
  { icon: SiDjango, label: 'Django' },
  { icon: SiFastapi, label: 'FastAPI' },
  { icon: SiReact, label: 'React' },
  { icon: SiDatabricks, label: 'Databricks' },
  { icon: SiMlflow, label: 'MLflow' },
  { icon: SiApachespark, label: 'Apache Spark' },
  { icon: SiDocker, label: 'Docker' },
  { icon: Cloud, label: 'MS Azure' },
  { icon: SiLinux, label: 'Linux' },
]
