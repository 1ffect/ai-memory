const researchCases = [
  {
    "name": "Qwen-Agent",
    "owner": "QwenLM / 千问团队官方仓库",
    "group": "上下文与资料",
    "focus": "文件检索型 Memory",
    "remember": "系统文件与会话中上传的文件内容；这里的 Memory 主要服务于资料检索。",
    "write": "收集并去重支持格式的文件，交给解析与检索工具；不是自动从所有聊天提取个人偏好。",
    "read": "取最后一条用户问题，可经关键词生成策略改写查询，再调用 retrieval 返回相关资料。",
    "update": "当前模块重新汇集系统与会话文件；没有在这段代码中看到通用的个人偏好冲突合并流程。",
    "value": "说明“Memory”不一定是用户画像，也可以是按问题调取资料、控制引用量的模块。",
    "limit": "官方 Qwen-Agent 的公开模块，不足以证明千问所有跨会话记忆都按此实现。",
    "flow": [
      "收集文件",
      "提取当前问题",
      "生成检索词",
      "检索资料",
      "返回引用内容"
    ],
    "details": [
      "get_rag_files 合并系统文件与会话附件，筛选格式并去重。",
      "仅当最后一条是用户消息时提取问题。",
      "配置了模型和策略时生成检索词；否则使用原查询。",
      "retrieval 接收 query 与 files，并受 max_ref_token 等配置约束。",
      "输出名为 memory 的消息，供上层使用；这是资料返回，不是永久学会了资料。"
    ],
    "links": [
      [
        "源码：Memory._run / get_rag_files",
        "https://github.com/QwenLM/Qwen-Agent/blob/main/qwen_agent/memory/memory.py"
      ],
      [
        "官方项目说明",
        "https://github.com/QwenLM/Qwen-Agent"
      ]
    ],
    "evidence": "已读取核心源码；memory.py "
  },
  {
    "name": "Kimi Code CLI",
    "owner": "MoonshotAI / 月之暗面官方仓库",
    "group": "上下文与资料",
    "focus": "上下文压缩 + 会话文件恢复",
    "remember": "当前任务的消息历史、压缩摘要、用量与检查点。",
    "write": "Context.append_message 将消息追加到文件；压缩器将较早内容整理成摘要并保留近期消息。",
    "read": "Context.restore 从会话文件恢复；后续模型调用使用整理后的消息序列。",
    "update": "达到上下文比例阈值或预留空间阈值时可触发压缩；源码还提供检查点回退与清空。",
    "value": "展示“长任务不断线”怎样由压缩和会话状态保存实现，不需要先建用户画像库。",
    "limit": "会话恢复不等于所有新会话自动共享个人记忆；Kimi Code CLI 源码不代表 Kimi 全部内部实现。",
    "flow": [
      "追加消息",
      "检查上下文预算",
      "保留近期消息",
      "压缩较早历史",
      "摘要接续 / 恢复"
    ],
    "details": [
      "消息以逐条 JSON 记录追加到会话文件。",
      "should_auto_compact 检查比例阈值或 token 数加预留空间是否触及窗口。",
      "SimpleCompaction 将近期部分与待压缩内容分开。",
      "调用模型生成摘要，可接受自定义压缩侧重点。",
      "摘要与保留消息组成新上下文；Context 支持从文件恢复任务历史。"
    ],
    "links": [
      [
        "源码：压缩与触发条件",
        "https://github.com/MoonshotAI/kimi-cli/blob/main/src/kimi_cli/soul/compaction.py"
      ],
      [
        "源码：会话保存与恢复",
        "https://github.com/MoonshotAI/kimi-cli/blob/main/src/kimi_cli/soul/context.py"
      ],
      [
        "官方项目",
        "https://github.com/MoonshotAI/kimi-cli"
      ]
    ],
    "evidence": "已读取 compaction.py 与 context.py；分析范围为公开的上下文管理实现，未运行产品。"
  },
  {
    "name": "OpenViking",
    "owner": "volcengine / 火山引擎官方仓库",
    "group": "分层与演进",
    "focus": "目录化上下文 + 分层读取",
    "remember": "资源、用户记忆与技能，统一按目录和 URI 组织。",
    "write": "提交会话后归档对话并启动后台提取；候选记忆与已有记录比较，决定创建、合并或跳过。",
    "read": "先读 L0 简短摘要和 L1 概览判断相关性，再按需读取 L2 详情；检索利用目录结构。",
    "update": "会话持续提交，新信息逐步并入已有记忆，避免每次加载全部原始内容。",
    "value": "把“怎么组织”和“加载到哪一层”纳入记忆设计，兼顾可浏览性与上下文预算。",
    "limit": "火山引擎相关开源实现。支持或使用豆包模型，不等于豆包 App 的内部记忆系统。",
    "flow": [
      "提交会话",
      "后台提取",
      "比较已有记忆",
      "创建 / 合并 / 跳过",
      "分层读取"
    ],
    "details": [
      "会话提交是资料中明确的记忆生成触发点。",
      "从已归档会话提取候选信息，由记忆策略控制保留内容。",
      "与已有记录比较，而不是把所有片段无条件加入。",
      "将处理结果归入目录化的上下文体系。",
      "L0 用于快速判断，L1 用于了解结构，L2 按需读取原始详情。"
    ],
    "links": [
      [
        "官方机制与目录示意",
        "https://github.com/volcengine/OpenViking"
      ],
      [
        "配置与检索配置边界",
        "https://github.com/volcengine/OpenViking/blob/main/docs/en/guides/01-configuration.md"
      ]
    ],
    "evidence": "已核对官方 README "
  },
  {
    "name": "ReMe",
    "owner": "agentscope-ai / AgentScope 项目仓库",
    "group": "分层与演进",
    "focus": "日常记录 → 长期知识的持续整理",
    "remember": "原始会话、每日记录，以及长期偏好、经验和知识；持久内容采用 Markdown。",
    "write": "auto_memory 从对话生成 daily 记录；auto_dream 从变化的 daily 文件中提取可复用单元。",
    "read": "默认可用 BM25 与文件链接查询；可选向量检索后融合，并返回可继续读取的片段。",
    "update": "长期整合区分 CREATE、CORROBORATE、REFINE、CORRECT：创建、补充证据、细化、纠错。",
    "value": "直观看到普通文件如何形成长期记忆，以及“补充细节”和“改正旧结论”如何区分。",
    "limit": "分析当前 ReMe 官方开源流程，不等同于千问的内部实现。",
    "flow": [
      "捕获会话",
      "生成每日记录",
      "提取复用单元",
      "检索已有节点",
      "整合长期记忆"
    ],
    "details": [
      "保留经过过滤的会话来源，供后续追溯。",
      "将日常事实与摘要放入 daily。",
      "auto_dream 针对变化的输入提炼值得长期保留的单元。",
      "通过搜索和读取找到相关 digest 节点。",
      "创建、补充来源、细化或纠正节点；成功处理的输入更新检查记录。"
    ],
    "links": [
      [
        "官方生命周期与检索说明",
        "https://github.com/agentscope-ai/ReMe"
      ],
      [
        "Auto Dream：阶段与更新动作",
        "https://github.com/agentscope-ai/ReMe/blob/main/docs/en/auto_dream.md"
      ]
    ],
    "evidence": "已读取官方生命周期与 Auto Dream 详细流程；不是自称的通用自动学习效果测评。"
  },
  {
    "name": "MemoryOS",
    "owner": "BAI-LAB / 研究团队仓库",
    "group": "分层与演进",
    "focus": "短期、中期、长期记忆分层",
    "remember": "近期交互、中期整理结果、长期用户画像与知识。",
    "write": "通过 add_memory 接收交互，按分层更新机制整理和提升信息。",
    "read": "通过检索模块组合不同记忆层的信息，再用于生成回答。",
    "update": "公开设计包括容量与热度等配置，调节短期到中期、长期的转移。",
    "value": "用于研究“最近说过”与“值得长期留下”如何分层，而不是全部堆在同一个列表里。",
    "limit": "MemoryOS（BAI-LAB）与 MemOS（MemTensor）是不同项目；支持 Qwen 模型不代表千问官方记忆实现。",
    "flow": [
      "接收交互",
      "短期保留",
      "中期整合",
      "更新长期画像",
      "跨层检索"
    ],
    "details": [
      "add_memory 接收用户与助手交互。",
      "近期交互进入短期层。",
      "由中期层组织和整合短期信息。",
      "根据更新策略提炼长期画像或知识。",
      "检索器从不同层获取任务所需信息。具体阈值取决于版本与配置。"
    ],
    "links": [
      [
        "官方机制、模块说明与示例",
        "https://github.com/BAI-LAB/MemoryOS"
      ],
      [
        "研究论文",
        "https://arxiv.org/abs/2506.06326"
      ]
    ],
    "evidence": "已核对官方 README "
  },
  {
    "name": "MemOS",
    "owner": "MemTensor / 开源项目仓库",
    "group": "事实与关系",
    "focus": "统一记忆接口与可组合记忆集合",
    "remember": "事实、画像、工具轨迹等记忆；组织为可组合的 Memory Cube。",
    "write": "通过统一接口添加记忆，公开方案包含异步摄取与调度。",
    "read": "查询时指定可读的记忆集合，取回适用信息。",
    "update": "提供编辑、删除及自然语言反馈纠正的机制；不同部署入口应分开研究。",
    "value": "用于理解“同一套接口管理多种记忆”和“按集合选择上下文”的方案。",
    "limit": "自托管服务、本地插件与云服务不能视为同一实现；本页不据营销性能数字做选型。",
    "flow": [
      "组织记忆集合",
      "接收新信息",
      "处理并保存",
      "选择集合查询",
      "反馈修正"
    ],
    "details": [
      "使用 Memory Cube 表达不同的记忆集合。",
      "添加消息或其他公开接口支持的内容。",
      "依据具体实现处理并持久保存。",
      "根据查询和可读集合检索相关内容。",
      "反馈用于补充、纠正或替换已有信息；云端能力需与开源范围区分。"
    ],
    "links": [
      [
        "官方架构与接口示例",
        "https://github.com/MemTensor/MemOS"
      ]
    ],
    "evidence": "已核对官方 README "
  },
  {
    "name": "MemGPT / Letta",
    "owner": "letta-ai / 项目官方仓库",
    "group": "分层与演进",
    "focus": "Agent 主动调用记忆工具",
    "remember": "核心信息、历史交流与外部档案，经典设计采用分层组织。",
    "write": "模型判断何时需要新增或编辑记忆，再调用工具由程序执行。",
    "read": "任务中缺少历史依据时，Agent 主动搜索或读取外部记忆。",
    "update": "执行过程中持续维护状态；经典架构与当前 Letta 代码需分开阅读。",
    "value": "展示记忆管理如何成为 Agent 自身的动作选择，而非全部由固定后台流程决定。",
    "limit": "MemGPT 经典模式；当前 Letta 活跃源码入口与旧 V1 归档不同。",
    "flow": [
      "识别任务",
      "判断记忆需求",
      "调用读写工具",
      "程序执行",
      "继续任务"
    ],
    "details": [
      "模型接收任务与可见上下文。",
      "判断是否需要历史资料或需要保存新信息。",
      "选择记忆搜索、写入或编辑工具。",
      "运行程序执行操作并返回结果。",
      "带着新信息继续任务，后续也可能再次操作记忆。"
    ],
    "links": [
      [
        "经典论文",
        "https://arxiv.org/abs/2310.08560"
      ],
      [
        "官方仓库与历史入口",
        "https://github.com/letta-ai/letta"
      ],
      [
        "当前代码入口",
        "https://github.com/letta-ai/letta-code"
      ]
    ],
    "evidence": "依据论文与官方版本说明"
  },
  {
    "name": "Mem0",
    "owner": "mem0ai / 项目官方仓库",
    "group": "事实与关系",
    "focus": "应用读写之间插入记忆层",
    "remember": "从交流中提取的可复用事实、偏好及任务信息。",
    "write": "应用调用 add，选择直接保存或进行记忆提取，并传入用户和元数据。",
    "read": "应用调用 search，将相关记忆加入模型输入，再生成回答。",
    "update": "应按版本研究；当前官方描述包含 ADD-only 追加路线，由时间与检索信号处理新旧内容。",
    "value": "适合理解“在已有应用旁边增加记忆模块”的最小调用链。",
    "limit": "开源 SDK 与托管平台的优化不同；不能把旧版覆盖更新规则概括成所有当前实现。",
    "flow": [
      "收到问题",
      "search 查询",
      "组装上下文",
      "生成回答",
      "add 新信息"
    ],
    "details": [
      "应用识别当前用户和请求。",
      "在相应范围内查询相关记忆。",
      "把查询结果和当前要求一起交给模型。",
      "模型生成回答。",
      "应用按策略提交新信息；调用示例每轮保存，不意味着所有应用都必须如此。"
    ],
    "links": [
      [
        "官方示例与版本说明",
        "https://github.com/mem0ai/mem0"
      ],
      [
        "源码入口：add 与记忆处理",
        "https://github.com/mem0ai/mem0/blob/main/mem0/memory/main.py"
      ]
    ],
    "evidence": "依据官方示例与公开代码片段；托管服务内部优化不视为已公开实现。"
  },
  {
    "name": "Graphiti",
    "owner": "getzep / 项目官方仓库",
    "group": "事实与关系",
    "focus": "带时间的关系与历史记忆",
    "remember": "实体、事实关系及其来源事件。",
    "write": "将输入事件提取为实体与关系，并处理重复或应失效的旧关系。",
    "read": "结合语义、关键词、图关系及时间条件查询。",
    "update": "事实变化时可标记旧关系失效，保留历史，而不是只覆盖成新值。",
    "value": "解释“当前谁负责”和“过去谁负责”如何同时回答。",
    "limit": "时间结构不能保证自然语言推断正确；Graphiti 开源框架与 Zep 托管服务需区分。",
    "flow": [
      "接收事件",
      "识别实体",
      "提取关系",
      "处理有效期",
      "查询当前 / 历史"
    ],
    "details": [
      "将消息或资料作为来源事件。",
      "识别人、项目等实体，并对已有实体进行归并。",
      "提取实体之间的关系。",
      "对确实被替代的事实记录结束时间，保留历史依据。",
      "按问题的时间范围使用当前或过去关系。"
    ],
    "links": [
      [
        "官方时间图机制",
        "https://github.com/getzep/graphiti"
      ],
      [
        "源码入口：实体与关系处理",
        "https://github.com/getzep/graphiti/blob/main/graphiti_core/graphiti.py"
      ]
    ],
    "evidence": "依据官方机制说明及此前读取的实体、关系处理代码片段。"
  },
  {
    "name": "LangMem",
    "owner": "langchain-ai / 项目官方仓库",
    "group": "事实与关系",
    "focus": "旧记忆与新对话的整合",
    "remember": "固定字段的用户档案，或独立保存的事实与经历集合。",
    "write": "输入对话和旧记忆，让模型输出整合结果，再由存储层持久化。",
    "read": "按键、语义与元数据等方式读取；支持 Agent 记忆工具。",
    "update": "支持实时更新、后台整理，以及依据交互反馈生成提示词改进方案。",
    "value": "把“生成新状态”和“实际保存”分开，也展示档案与记忆集合的区别。",
    "limit": "提示词改进只是候选行为变化，不能自动证明效果提升；进程内存不等于持久存储。",
    "flow": [
      "新对话 + 旧记忆",
      "模型整合",
      "生成新状态",
      "存储管理器",
      "后续调用"
    ],
    "details": [
      "同时提供新信息与已有记忆。",
      "判断哪些内容需要新增、补充或修改。",
      "核心函数返回整理后的状态。",
      "高层存储集成执行持久写入。",
      "后续任务按需读取，实时与后台时机可分别设计。"
    ],
    "links": [
      [
        "官方概念与工作流",
        "https://langchain-ai.github.io/langmem/concepts/conceptual_guide/"
      ],
      [
        "源码仓库",
        "https://github.com/langchain-ai/langmem"
      ]
    ],
    "evidence": "依据官方概念说明与公开调用示例。"
  },
  {
    "name": "Cognee",
    "owner": "topoteretes / 项目官方仓库",
    "group": "图谱与自组织",
    "focus": "关系图谱 + 向量 + 会话蒸馏",
    "remember": "文档、代码、对话和 Agent 工作记录；内容被组织为实体、关系、可搜索片段及会话经验。",
    "write": "remember 可直接写入永久图谱，也可带 session_id 先进入快速会话记忆；会话经验随后通过 improve 蒸馏进长期图谱。",
    "read": "recall 根据问题自动选择图、向量、代码或组合检索；带 session_id 时优先查询会话层，再回落到长期图谱。",
    "update": "improve 用于丰富图谱、应用反馈和把会话知识桥接到长期层；forget 可删除条目或数据集。",
    "value": "展示关系、语义相似度和会话快写如何组合，也展示短期写入与长期图谱构建可以异步分离。",
    "limit": "默认模型调用、存储后端和生产能力取决于配置；官方报告的评测使用特定数据格式、模型与检索参数，不能直接与其他项目排行榜数字比较。",
    "flow": ["会话快速写入", "实体与关系提取", "图谱 / 向量存储", "自动路由召回", "反馈与 improve"],
    "details": [
      "带 session_id 的 remember 进入会话记忆，降低交互写入成本。",
      "永久处理把文本转换为实体、关系和可搜索片段，代码则形成符号与依赖图。",
      "不同后端可承载关系、向量和元数据；自托管时需要明确持久化与权限配置。",
      "recall 可自动路由检索策略，应用仍需检查证据再决定如何使用。",
      "improve 把会话经验沉淀为长期知识并应用反馈；forget 负责显式删除。"
    ],
    "links": [
      ["官方仓库与 remember / recall / improve", "https://github.com/topoteretes/cognee"],
      ["官方架构文档", "https://docs.cognee.ai/core-concepts/architecture"]
    ],
    "evidence": "依据官方仓库 README、公开 API 和架构文档；未把 Cognee Cloud 的托管能力视为开源核心默认能力。"
  },
  {
    "name": "A-MEM",
    "owner": "agiresearch / 研究项目官方仓库",
    "group": "图谱与自组织",
    "focus": "Zettelkasten 式记忆自组织",
    "remember": "每条记忆被整理成带内容、上下文、关键词、标签、类别、时间和链接的 Memory Note。",
    "write": "新增记忆时由模型生成结构化属性，再用 ChromaDB 找到语义邻居，分析连接并更新相关记忆的上下文与链接。",
    "read": "可按 ID 读取，或通过向量相似度搜索少量相关 Note；Agent 是否自动调用和注入由上层应用决定。",
    "update": "支持显式更新与删除；新增和更新还会触发邻居关系与元数据演化。",
    "value": "把记忆写入从“存一段文本”扩展为“生成笔记、建立链接、重组邻域”，适合研究自组织长期记忆。",
    "limit": "仓库提供记忆组件而不是完整 Agent Loop；论文复现实验使用另一个仓库，不能把组件 README 中的结果当成当前包的端到端实测。",
    "flow": ["新增内容", "生成 Note 属性", "检索语义邻居", "建立链接", "演化相关记忆"],
    "details": [
      "输入先被转换为结构化 Memory Note。",
      "模型补充上下文、关键词、标签等可检索属性。",
      "ChromaDB 搜索与新 Note 接近的历史记忆。",
      "系统判断是否建立 Zettelkasten 式关联。",
      "相关 Note 的上下文和链接可随新信息演化。"
    ],
    "links": [
      ["官方实现仓库", "https://github.com/agiresearch/A-mem"],
      ["论文复现仓库", "https://github.com/WujiangXu/AgenticMemory"],
      ["论文", "https://arxiv.org/abs/2502.12110"]
    ],
    "evidence": "依据官方仓库 README、公开类接口及论文；明确区分组件仓库与实验复现仓库。"
  },
  {
    "name": "Memobase",
    "owner": "memodb-io / 项目官方仓库",
    "group": "画像与个性化",
    "focus": "用户档案 + 事件时间线",
    "remember": "按 topic / sub_topic 组织的用户档案，以及带时间的用户事件；重点是用户而不是 Agent 自身工作轨迹。",
    "write": "聊天先作为 Blob 进入每用户缓冲区；达到约定 Token、空闲时间或手动 flush 时，批量提取并更新档案和事件。",
    "read": "profile 可直接读取结构化档案；context 按主题偏好和 Token 预算组装用户背景与近期事件，供应用注入提示词。",
    "update": "新 Blob 在 flush 时合并进既有档案；默认处理后删除原 Blob，也可配置保留。",
    "value": "展示画像型记忆与检索型记忆的差异，以及怎样用缓冲批处理降低写入成本并控制在线延迟。",
    "limit": "档案重写会压缩来源细节；默认删除原始 Blob 时应先确认审计、纠错和隐私需求是否允许。",
    "flow": ["写入聊天 Blob", "进入用户缓冲区", "门控 / 手动 flush", "更新档案与事件", "按预算生成 context"],
    "details": [
      "所有输入以用户 Blob 进入系统。",
      "缓冲区避免每条消息都触发多次模型调用。",
      "Token 阈值、空闲时间或会话结束可触发批处理。",
      "处理结果形成可配置的用户档案与事件时间线。",
      "context API 在给定 Token 预算内组装可直接注入的记忆。"
    ],
    "links": [
      ["官方仓库与完整流程", "https://github.com/memodb-io/memobase"],
      ["官方用户档案 API", "https://docs.memobase.io/api-reference/profiles/add_profile"]
    ],
    "evidence": "依据官方仓库的插入、缓冲、flush、profile 与 context 流程；性能数字未作为跨项目比较依据。"
  },
  {
    "name": "Generative Agents",
    "owner": "Stanford / Google Research 论文配套仓库",
    "group": "分层与演进",
    "focus": "记忆流 + 反思 + 计划",
    "remember": "Agent 的观察、对话和经历按时间进入 Memory Stream，并带有时间、重要性和语义相关性信号。",
    "write": "环境观察和交互形成新的记忆记录；积累到一定重要性后生成更高层反思，将多个经历概括为抽象认识。",
    "read": "行为决策前按照近期性、重要性和相关性组合评分召回一组记忆，而不是只使用最近消息。",
    "update": "原始经历保留，反思作为新记忆追加；计划又会受召回与反思影响。",
    "value": "这是“经历流—召回—反思—计划”范式的经典案例，解释为什么摘要和抽象知识可以与原始事件并存。",
    "limit": "它是研究型社会模拟架构，不是通用生产记忆服务；重要性和反思质量依赖模型判断。",
    "flow": ["感知事件", "追加记忆流", "三信号召回", "生成反思", "影响计划与行动"],
    "details": [
      "环境中的观察和对话形成带时间的原始经历。",
      "经历按追加式 Memory Stream 保存。",
      "召回综合近期性、重要性和与当前问题的相关性。",
      "累计重要性触发反思，把多个观察组织为更高层结论。",
      "召回与反思共同影响后续计划和行为。"
    ],
    "links": [
      ["官方论文配套仓库", "https://github.com/joonspk-research/generative_agents"],
      ["论文", "https://arxiv.org/abs/2304.03442"]
    ],
    "evidence": "依据论文与官方配套仓库；仓库主要用于复现 Smallville 模拟，不代表线上助手实现。"
  },
  {
    "name": "LazyMem",
    "owner": "匿名评审阶段研究仓库",
    "group": "评测与新范式",
    "focus": "查询时才构造有损记忆",
    "remember": "原始交互历史逐条保留，写入阶段不急于生成可能丢失细节的长期摘要。",
    "write": "消息以原始形式摄取；主要压缩工作推迟到收到具体查询以后。",
    "read": "查询时先用 Dense + BM25 广泛召回，经 RRF 和 Cross-Encoder 重排，再恢复邻近对话窗口。",
    "update": "轻量记忆模型对每条候选作 KEEP / DROP，并只把保留证据改写为与查询相关的压缩记忆；结果按时间排序后交给回答模型。",
    "value": "挑战“写入时立即总结”的默认做法：如果未来问题未知，保留原文并在查询时选择性构造可能更少丢失证据。",
    "limit": "截至当前处于匿名双盲评审阶段，未提供模型权重、数据集、检查点或许可证；更适合作为研究方向而非成熟依赖。",
    "flow": ["保存原始消息", "混合广泛召回", "恢复局部上下文", "KEEP / DROP", "查询相关压缩"],
    "details": [
      "写入阶段保留逐条原始历史。",
      "Dense 与 BM25 排名经 RRF 融合，再由 Cross-Encoder 重排。",
      "每条命中消息向前后扩展，重建局部会话语境。",
      "记忆处理模型独立判断消息保留或丢弃。",
      "保留证据去重、按时间排序并压缩后交给冻结的回答模型。"
    ],
    "links": [
      ["研究代码与方法说明", "https://github.com/allacnobug/LazyMem"],
      ["论文", "https://arxiv.org/abs/2607.22690"]
    ],
    "evidence": "依据公开匿名仓库的方法说明；作者、许可证、权重和完整复现实验尚未公开。"
  }
];

const researchCaseMeta = {
  "Qwen-Agent": {storage:"解析后的文件与检索引用", trigger:"每次资料型查询", retrieval:"问题改写 + 文件检索", consolidation:"无通用长期整合", temporal:"仅依赖资料内容", scope:"系统文件 / 会话附件", forgetting:"重新汇集或删除来源文件", deployment:"Python Agent 框架组件", maturity:"官方开源模块", evidenceLevel:"源码可核对"},
  "Kimi Code CLI": {storage:"本地会话 JSONL、摘要与检查点", trigger:"逐消息追加；预算阈值触发压缩", retrieval:"恢复会话后顺序加载", consolidation:"较早历史摘要 + 近期消息保留", temporal:"会话顺序", scope:"单个 CLI 会话", forgetting:"清空、回退检查点", deployment:"本地 CLI", maturity:"官方开源产品组件", evidenceLevel:"源码可核对"},
  "OpenViking": {storage:"目录化资源、记忆、技能与分层摘要", trigger:"会话提交后后台提取", retrieval:"目录检索 + L0/L1/L2 渐进读取", consolidation:"创建 / 合并 / 跳过", temporal:"归档会话与更新时间", scope:"应用配置决定", forgetting:"按目录和对象管理", deployment:"上下文数据库 / 服务", maturity:"官方开源项目", evidenceLevel:"文档与源码入口"},
  "ReMe": {storage:"Markdown daily / digest 与检索索引", trigger:"会话捕获；变更文件触发 Dream", retrieval:"BM25、文件链接、可选向量融合", consolidation:"CREATE / CORROBORATE / REFINE / CORRECT", temporal:"日期目录与检查记录", scope:"文件目录决定", forgetting:"编辑、删除或修正节点", deployment:"Python 文件化记忆组件", maturity:"官方开源项目", evidenceLevel:"文档可核对"},
  "MemoryOS": {storage:"短期、中期、长期分层存储", trigger:"add_memory 与容量 / 热度策略", retrieval:"跨层组合检索", consolidation:"层间提升与用户画像更新", temporal:"近期性参与层级迁移", scope:"用户级", forgetting:"容量和热度驱动淘汰", deployment:"研究型 Python 系统", maturity:"论文配套项目", evidenceLevel:"论文与 README"},
  "MemOS": {storage:"Memory Cube 与多种记忆集合", trigger:"统一添加接口 / 异步摄取", retrieval:"选择可读集合查询", consolidation:"调度、反馈和集合内更新", temporal:"依具体 Cube 实现", scope:"Cube / 用户 / 应用", forgetting:"编辑、删除与反馈修正", deployment:"服务、插件与本地组件", maturity:"活跃开源平台", evidenceLevel:"官方仓库"},
  "MemGPT / Letta": {storage:"Core Memory Blocks + Archival Memory + 会话历史", trigger:"Agent 主动调用记忆工具", retrieval:"Core 常驻；Archival 按需搜索", consolidation:"Agent 编辑 Core 或写入外部档案", temporal:"会话历史与记录时间", scope:"Agent / Block", forgetting:"工具删除或编辑", deployment:"Agent 平台与 SDK", maturity:"经典论文 + 活跃项目", evidenceLevel:"论文与官方仓库"},
  "Mem0": {storage:"向量存储、元数据与可选图记忆", trigger:"应用调用 add", retrieval:"用户 / Agent 范围内语义搜索", consolidation:"版本相关；当前路径偏追加与检索调节", temporal:"时间与元数据参与检索", scope:"user_id / agent_id / run_id", forgetting:"显式 update / delete / reset", deployment:"SDK、自托管与云服务", maturity:"成熟开源 SDK", evidenceLevel:"官方源码"},
  "Graphiti": {storage:"Episode、实体节点、事实边与向量 / 全文索引", trigger:"新增 episode", retrieval:"语义 + BM25 + 图遍历 + 时间过滤", consolidation:"实体归并、重复边处理、事实失效", temporal:"有效期与记录时间", scope:"group / graph namespace", forgetting:"失效边或显式删除", deployment:"图数据库记忆框架", maturity:"成熟开源框架", evidenceLevel:"官方源码"},
  "LangMem": {storage:"结构化 Profile 或独立 Memory Collection", trigger:"实时工具或后台 Manager", retrieval:"Store 的语义、键和元数据查询", consolidation:"新对话与旧状态共同生成更新", temporal:"由 Schema / 元数据定义", scope:"namespace", forgetting:"Store 更新或删除", deployment:"LangGraph / LangChain 组件", maturity:"官方开源库", evidenceLevel:"官方文档与代码"},
  "Cognee": {storage:"关系图、向量、关系型元数据与会话缓存", trigger:"remember；会话蒸馏 / improve", retrieval:"自动路由图、向量、代码或混合检索", consolidation:"session → graph；反馈丰富", temporal:"会话与来源记录", scope:"dataset / session / 权限配置", forgetting:"forget 条目或数据集", deployment:"本地、Docker、MCP、服务", maturity:"大型活跃开源平台", evidenceLevel:"官方源码与文档"},
  "A-MEM": {storage:"ChromaDB + 结构化 Memory Note + 语义链接", trigger:"add_note / update", retrieval:"ID 读取或 Top-k 向量搜索", consolidation:"写入时邻居分析与 Note 演化", temporal:"Note timestamp", scope:"MemorySystem 实例", forgetting:"显式 delete", deployment:"研究型 Python 库", maturity:"研究原型", evidenceLevel:"论文与官方实现"},
  "Memobase": {storage:"Postgres 用户 Profile、Event 与缓冲 Blob", trigger:"Token 阈值、空闲时间或手动 flush", retrieval:"Profile 直读；事件搜索；预算化 context", consolidation:"批量提取并重写 topic / sub_topic", temporal:"事件时间线", scope:"project_id + user_id", forgetting:"Blob 默认处理后删除；档案可管理", deployment:"FastAPI / Postgres / Redis", maturity:"生产导向开源服务", evidenceLevel:"官方源码与文档"},
  "Generative Agents": {storage:"追加式 Memory Stream", trigger:"环境观察；重要性累计触发 Reflection", retrieval:"近期性 × 重要性 × 相关性", consolidation:"Reflection 作为新记忆追加", temporal:"时间戳与衰减", scope:"单个模拟 Agent", forgetting:"主要通过近期性衰减而非删除", deployment:"研究型社会模拟", maturity:"经典研究原型", evidenceLevel:"论文与官方复现仓库"},
  "LazyMem": {storage:"逐条原始历史 + 查询时临时证据", trigger:"写入原文；查询时构造", retrieval:"Dense + BM25 + RRF + Cross-Encoder", consolidation:"KEEP / DROP + 查询相关压缩", temporal:"恢复邻近窗口并按时间排序", scope:"会话历史集合", forgetting:"原始历史不在写入时压缩", deployment:"研究代码", maturity:"匿名评审阶段", evidenceLevel:"公开方法代码，复现资产不完整"}
};

researchCases.forEach(item => Object.assign(item, researchCaseMeta[item.name] || {}));
