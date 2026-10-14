/**
 * academic-research-skills — DSH 学术研究技能套件（插件入口）。
 *
 * 把 5 个学术技能作为运行时技能注册到 dsh 的技能注册中心（ctx.skills）。
 * 技能正文以 `skills/<name>/SKILL.md` 为唯一来源，此处只读取 + 解析 frontmatter + 注册。
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))

const SKILL_NAMES = [
  'deep-research',
  'academic-paper',
  'academic-paper-reviewer',
  'academic-pipeline',
  'sr-screener',
]

export const name = 'academic-research-skills'
export const inject = ['skills']

/**
 * 解析 SKILL.md 的 YAML frontmatter，返回 { meta, content }。
 * frontmatter 形如：
 *   ---
 *   name: academic-paper
 *   description: "..."
 *   whenToUse: "..."
 *   ---
 *   <正文>
 */
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw)
  if (!match) throw new Error('SKILL.md missing YAML frontmatter')
  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']/, '').replace(/["']$/, '')
  }
  return { meta, content: match[2].trim() }
}

export function apply(ctx) {
  for (const skillName of SKILL_NAMES) {
    const raw = readFileSync(join(HERE, 'skills', skillName, 'SKILL.md'), 'utf8')
    const { meta, content } = parseFrontmatter(raw)
    ctx.skills.register({
      name: meta.name,
      description: meta.description,
      ...(meta.whenToUse ? { whenToUse: meta.whenToUse } : {}),
      content,
      source: name,
    })
  }
}
