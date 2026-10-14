# academic-research-skills

DeepSeek Harness（dsh）的学术研究技能套件插件：把 5 个学术技能打包成单个插件，便于安装和传播。

## 包含的技能

| 技能 | 说明 |
|---|---|
| `deep-research` | 深度文献研究 / 系统综述检索 |
| `academic-paper` | 学术论文写作 |
| `academic-paper-reviewer` | 多视角审稿 + 魔鬼代言人 |
| `academic-pipeline` | 十阶段全流程编排 |
| `sr-screener` | 系统综述文献筛选 |

核心方法论（与任何特定上游无关，原创整理）：人在环中、逐阶段确认、完整性门禁、引用核查、多视角审稿。

## 安装

```bash
# 远程（推荐，需先发布到 GitHub）：
dsh plugin --profile <profile> add github:<user>/academic-research-skills

# 本地开发：
dsh plugin --profile <profile> add link:<本目录绝对路径>
```

例如：

```bash
dsh plugin --profile web add link:D:\skills\academic-research-skills
```

> 桌面端（`desktop` profile）由 Electron 应用管理，用桌面应用自带的 `dsh.cmd` 安装，或直接在桌面应用的「设置 → 插件」里添加。

## 目录结构

```
academic-research-skills/
├── package.json          # dsh.bundle.patch 指向 cordis.patch.yml
├── cordis.patch.yml      # 挂载声明（insert bundle entry）
├── index.js              # 入口：读取 SKILL.md 并注册到 ctx.skills
├── README.md
└── skills/
    ├── deep-research/SKILL.md
    ├── academic-paper/SKILL.md
    ├── academic-paper-reviewer/SKILL.md
    ├── academic-pipeline/SKILL.md
    └── sr-screener/SKILL.md
```

技能正文以 `skills/*/SKILL.md` 为唯一来源；`index.js` 在插件挂载时读取并解析 frontmatter（`name` / `description` / `whenToUse`），通过 `ctx.skills.register(...)` 注册为运行时技能。

## 许可证

MIT
