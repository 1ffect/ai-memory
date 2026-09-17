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
  }
];
