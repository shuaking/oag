# 李笑来 · 重大决策与行动调研（2026-09-29）

## 〇、本次调研的方法学限制（务必先读）

**这是本文件最重要的免责声明，直接影响所有"证据强度"结论。**

本次调研环境中：

1. `web_search` **可用**，但只返回**标题 + URL**（部分查询附带被索引的页面描述片段），**不返回正文**。
2. `web_fetch` **完全不可用**：本会话沙箱的出网 DNS 被劫持到 `198.18.0.0/15`（基准测试黑洞网段），任何主机名——包括 `github.com`、`en.wikipedia.org`、`lixiaolai.com`、`caixin.com`——都被判定为 "resolves to a non-public IP address" 而拒绝。
3. PowerShell `Invoke-WebRequest` / `Resolve-DnsName` 已验证同样不可用（`github.com` → `198.18.0.59`，TCP 连接被重置）。

**因此本文件的所有证据都停在"标题级 / 索引片段级"。**这对本任务（核验具体数字）是**严重削弱**：

- 我**无法**打开任何一篇文章核对正文里的数字、引语、上下文。
- 凡标题/片段中直接出现的数字，我按"该来源如此表述"记录，**不等于我核对了它**。
- 凡我无法在标题或片段中看到的数字，一律标 **"数字无法证实"**，绝不从常识或训练语料补齐。
- 本文件**不包含任何非来自检索结果的引语**。凡引号内容均为**检索结果标题或摘要片段的原文**，已逐条标注。
- 标注为"本人自述"的，指的是**检索结果显示该媒体以直接引语/转述形式报道了他的说法**，我未能核对原始出处全文。

旧版调研（`_legacy-2026-04/05-decisions.md`）自称"基于 AI 训练数据，未进行实时网络搜索"。本次核验的结论是：**旧版的框架大体不错，但几乎所有具体数字都不可靠，其中若干可判定为错误或无法证实。**详见第四章。

---

## 一、决策时间轴表

| 年份 | 决策 / 事件 | 背景 | 他的逻辑（公开表述） | 结果 | 来源 URL | 证据强度 |
|---|---|---|---|---|---|---|
| 2001–2008 | 入职新东方，任托福教师，约 7 年后离开 | 早年经历（销售、服装、电脑配件等），后进入教培 | 公开表述侧重"要为自己工作"、个人品牌价值（旧版推测，未见直接引语） | 成为明星教师；离开后转为独立作者/讲师 | [界面·【人物】李笑来的"逃跑计划"](https://www.jiemian.com/article/2530586.html)、[界面·想创业，就来新东方](https://www.jiemian.com/article/2363837_qq.html)、[虎嗅·两位从新东方走出的韭菜收割师](https://pro.huxiu.com/article/299894.html) | **部分成立**（"新东方教师"身份坐实；"2001 入职 / 2008 离开"的具体年份未在可检索来源中直接确认；旧版所引"离开新东方是正确的决定""体制内限制了发展"两句**在本次检索中找不到任何来源，判定为旧版编造或臆测**） |
| 约 2009 | 出版《把时间当作朋友》（原题《运用心智获得解放》） | 由博客/讲义积累成书 | 未检索到他对出版机缘的直接表述 | 成为其影响力起点，多次再版（"青少版修订本"等） | [电子工业出版社书目](https://cbjj.phei.com.cn/module/goods/wssd_content.jsp?bookid=62917)、[浙江图书馆书目](https://opac.zjlib.cn/opac/book/2117454)、[QQ阅读·把时间当作朋友（第3版）再版前言](https://book.qq.com/book-read/23437994/6) | **部分成立**（书存在、原题《运用心智获得解放》有图书馆编目支持；**首版年份未在可检索来源中确认**） |
| 2011 | 开始接触并买入比特币 | 比特币极早期，主流不认可 | 后来表述为"看到区块链 / 去中心化货币的价值"（旧版表述，未获直接引语） | 成为中文币圈最有名的早期持有者之一 | [界面·中国比特币首富李笑来：曾拥有过6位数比特币](https://www.jiemian.com/article/1971690.html)、[王峰十问李笑来](http://www.iheima.com/article-167471.html)、[新浪财经·李笑来：中国至少有2个人比特币数量比我多](http://finance.sina.com.cn/blockchain/roll/2018-10-18/doc-ifxeuwws5619380.shtml) | **部分成立**（"曾持有 6 位数比特币"为他本人自述；**买入价格、买入年份的精确表述、是否"押光身家"均无法证实**） |
| 2013-05 | 发起比特基金（BitFund），国内首只比特币基金开募 | 比特币第一轮牛市；他已有"比特币首富"标签 | 媒体报道其"称获益百倍"（注：此为他 2013 年的说法，非基金业绩） | 完成私募募集；后续由老猫在 2018 年清算 | [人民网·国内首只比特币基金开募 法律人士称风险大](http://finance.people.com.cn/stock/BIG5/n/2013/0529/c222942-21658192.html)、[中新网·中国首只比特币基金开募 发起人称获益百倍](https://www.chinanews.com/fortune/2013/05-30/4875445.shtml)、[每经·原新东方教师开募国内首只比特币基金](http://www.nbd.com.cn/articles/2013-05-29/745199.html)、[证券时报电子报](http://epaper.stcn.com/paper/zqsb/html/2013-05/29/content_474060.htm)、[股转系统公告（比特资产）](https://www.neeq.com.cn/disclosure/2016/2016-04-14/1460619485_902628.pdf)、[blockvalue·老猫18年清算了13年李笑来的比特基金](https://www.blockvalue.com/news/20200601424458.html) | **成立（基金开募事实）/ 存疑（回报数字）** |
| 2016 | 在"得到"开设专栏《通往财富自由之路》 | 知识付费兴起，罗振宇邀请 | 知识变现 / 传播财富理念 | 成为"得到"头部专栏之一，被媒体称为"一个专栏卖2000多万" | [豆瓣·李笑来 开了"得到"专栏](https://www.douban.com/note/581237611/)、[界面·已经有7万多人上路了，中国另类"首富"新生意经](https://www.jiemian.com/article/889231.html)、[新浪科技·得到公布运营数据：总营收1.4亿 最高者入2千万](https://tech.sina.cn/i/gn/2017-02-21/detail-ifyarrcf5303139.d.html)、[搜狐·李笑来：一个专栏卖2000多万](https://www.sohu.com/a/122754732_108964) | **成立（开设事实）/ 部分成立（金额）/ 存疑（订阅总数）** |
| 2017-06 | 发起 PressOne ICO（并涉 ico.info） | ICO 热潮顶峰 | "区块链内容分发"；对外称配合监管、拥护监管 | 白皮书未发布即完成募资；9·4 后宣布清退；成为后续全部争议的源头 | [界面·深访币圈（PressOne 募集 8200 万美元）](https://www.jiemian.com/article/1885972.html)、[新浪财经·失控的ICO：项目书都没有就融了1亿美元](https://finance.sina.cn/forex/whzx/2017-08-28/detail-ifykkfat0193335.d.html)、[中国网·用一个没有白皮书的ICO项目融资近2亿美元](https://economy.china.com/domestic/11173294/20170901/31251706_2.html)、[中国报·空手套8亿](https://www.chinapress.com.my/20170904/%e4%b8%ad%e5%9b%bd%e6%af%94%e7%89%b9%e5%b8%81%e9%a6%96%e5%af%8c%e6%9d%8e%e7%ac%91%e4%be%86-%e7%84%a1%e9%9c%80%e8%a8%88%e5%8a%83%e6%9b%b8-%e7%a9%ba%e6%89%8b%e5%a5%978%e5%84%84/)、[财新·李笑来谈ICO专题](https://www.caixin.com/hot/lixiaolaitanico.html)、[财新·PressOne 专题](https://www.caixin.com/hot/pressone.html) | **成立（ICO 事实）/ 数字严重冲突 → 全部标存疑** |
| 2017-09 | 9·4 监管后宣布配合清退、下线区块链资产 | 央行等七部门叫停代币发行融资 | "积极拥护""配合清退工作""组织员工学习政策精神" | 云币网等停止相关交易；PressOne、ico.info 等清退 | [新浪财经·"比特币首富"李笑来：拥护ICO监管 下线部分区块链资产](https://finance.sina.com.cn/roll/2017-09-06/doc-ifykpzey4811913.shtml)、[新浪财经·李笑来回应代币监管：配合清退](https://finance.sina.com.cn/chanjing/cyxw/2017-09-06/doc-ifykpysa3674381.shtml)、[界面·央行禁止ICO后 李笑来首次发声称"配合清退工作"](https://m.jiemian.com/article/1605577.html)、[江苏网络电视台·李笑来谈ICO政策：积极拥护](http://news.jstv.com/a/20170906/1504679153524.shtml) | **成立**（表态有多方来源；**清退的具体退款比例、完成率无权威来源，标为无法证实**） |
| 2018-07 | 录音门：私下谈话被录音曝光，随后发文回应 | ICO 泡沫破裂、币价大跌，他成为舆论靶心 | 承认"自己傻逼"，但坚称"录音大多数被曲解""没有骂用户傻逼"，指"录音者真的有问题" | 公众形象重创；随后与陈伟星长期诉讼；出版《韭菜的自我修养》 | [新浪财经·李笑来私聊遭录音：骗割散户 嘲讽软银（附录音）](https://finance.sina.com.cn/blockchain/coin/2018-07-04/doc-ihevauxi9827249.shtml)、[江苏网络电视台·李笑来发文回应录音泄露事件：自己傻逼 但录音大多数被曲解](http://news.jstv.com/a/20180706/153086413281.shtml)、[TechWeb·李笑来回应录音门:没有骂用户傻逼 录音者真的有问题](https://m.techweb.com.cn/article/2018-07-07/2683611.shtml)、[经济观察网·李笑来露馅了](http://www.eeo.com.cn/2018/0713/332330.shtml)、[完整录音文字版 PDF（第三方站转载）](https://www.bj-xinghe.com/wp-content/uploads/2020/08/%e5%ae%8c%e6%95%b4%e6%96%87%e5%ad%97-%e6%9d%8e%e7%ac%91%e6%9d%a5%e5%86%85%e9%83%a8%e5%bd%95%e9%9f%b3%ef%bc%8c%e5%b8%81%e5%9c%88%e5%89%b2%e9%9f%ad%e8%8f%9c%e9%bb%91%e5%b9%95.pdf) | **成立**（录音曝光、他的回应表述）；**"发布道歉信"不成立**——可检索来源显示的是微博长文回应 + 否认，而非道歉信 |
| 2018-09-30 | 宣布"不会再做投资，准备转行" | 舆论压力、币价崩塌 | "个人不会做任何项目投资，准备花时间转行" | **42 天后即复出站台**（2018-11） | [新浪财经·"比特币首富"李笑来：不会再做投资 准备转行](http://finance.sina.com.cn/blockchain/roll/2018-09-30/doc-ifxeuwwr9757362.shtml)、[TechWeb·李笑来：个人不会做任何项目投资 准备花时间转行](https://people.techweb.com.cn/2018-09-30/2705019.shtml) | **成立**（原话有多方来源）；**与后续行为不一致，见第三章** |
| 2018-09 | 出版《韭菜的自我修养》 | 录音门后两个月 | 媒体解读为"为自己辩驳"（[新浪标题：「李笑来发新书 一场新收割拉开序幕」](https://finance.sina.com.cn/blockchain/2018-09-17/doc-ifxeuwwr5114152.shtml)） | 成为畅销书；江苏凤凰文艺出版社 | [新浪财经·李笑来发新书 一场新收割拉开序幕](https://finance.sina.com.cn/blockchain/2018-09-17/doc-ifxeuwwr5114152.shtml)、[当当电子书·韭菜的自我修养(2019)](http://e.dangdang.com/touch/products/1901128001.html) | **成立（出版事实）** |
| 2018-11 | 退出币圈 42 天后复出，为一暴跌项目站台 | 币价反弹 | 未见公开自述 | 被媒体记为"多次食言退出币圈" | [新浪财经·退出币圈42天后 李笑来又复出站台暴跌94.5%的项目](http://finance.sina.com.cn/blockchain/roll/2018-11-14/doc-ihnvukfe6652784.shtml)、[未央网（清华金融科技研究院孵化）·退出币圈42天后，李笑来复出了](https://www.weiyangx.com/310498.html)、[零壹财经·退出币圈42天后，李笑来复出了](https://www.01caijing.com/blog/329454.htm) | **成立** |
| 2018-12-03 | 出任港股上市公司雄岸科技（01647.HK）执行董事及联席行政总裁 | 与"转行"声明仅隔两个月 | 未见公开自述 | 消息公布后股价涨近 20%；约 5 个月后辞任 | [港交所公告 PDF（雄岸科技 2018-12-03）](http://www.grandshorestech.com/uploadfile/file/20181203/201812030815410.pdf)、[新浪财经·比特币大佬又火了 刚当上联席CEO雄岸科技就涨近20%](https://finance.sina.com.cn/stock/hkstock/ggscyd/2018-12-04/doc-ihmutuec6111489.shtml)、[新浪财经·李笑来多次食言退出币圈!出任CEO公司股票还涨20%](https://finance.sina.cn/blockchain/2018-12-05/detail-ihmutuec6435165.d.html)、[澎湃·李笑来转行？出任香港上市公司雄岸科技执行董事及联席CEO](https://www.thepaper.cn/newsDetail_forward_2701717) | **成立**（**言行不一致的核心证据，一手公告 + 多家媒体**） |
| 2019-05 | 辞任雄岸科技职务；转头做"高级荐币群"（投资人门槛约 50 万） | 舆论对其"食言"质疑加剧 | 未见公开自述 | 被媒体称为"不做港股高管做荐币群"，"小韭菜"被排挤于门槛之外 | [新浪财经·李笑来回归：做"高级荐币群""小韭菜"被排挤](https://finance.sina.com.cn/blockchain/roll/2019-05-15/doc-ihvhiqax8892786.shtml)、[搜狐·比特币翻倍李笑来回归：不做港股高管做"荐币群"](https://www.sohu.com/a/314068326_250147)、[智通财经·雄岸科技：李笑来辞任执行董事及联席行政总裁](https://m.zhitongcaijing.com/contentnew/appcontentdetail.html?content_id=202465)、[新浪财经·李笑来退出、姚勇杰减持、雄岸科技退出区块链](https://finance.sina.com.cn/stock/relnews/hk/2019-05-10/doc-ihvhiews1084512.shtml) | **成立**（**言行不一致第二证据**） |
| 2019-07-03 | 首届"七三韭菜节"；发行 BOX 代币、建"定投践行群" | 录音门一周年 | "定投改变命运"、长期主义、社群陪伴 | BOX 成为其社群核心标的；社群持续多年（至 2025 年仍在办"韭菜节"） | [36氪·录音门事件"退圈"一周年，李笑来再发新币「BOX」](https://36kr.com/p/1723959853057)、[36氪·李笑来发新币、建新群，你还愿意帮他拉人头么？](https://36kr.com/p/1723965816833)、[Odaily·李笑来发新币、建新群](https://www.odaily.news/post/5138866)、[GitHub·regular-investing-in-box（《定投改变命运》）](https://raw.githubusercontent.com/xiaolai/regular-investing-in-box/b7dd6694b2310c6eb0a075844ebf03227a005a38/Z-Appendix.02.md) | **成立（发行事实）** |
| 2019 至今 | 开源《自学是门手艺》/《定投改变命运》，转向开源写作 | 形象受损后以免费/开源重建信任 | 旧版称"教育是初心""开源是回馈社会"（**本次检索未获直接引语**） | GitHub 上形成生态（多个 fork/译本，含西班牙语 PDF 等） | [GitHub 生态：selfteaching-book_Python](https://github.com/charliehower/selfteaching-book-_python)、[the-craft-of-selfteaching 笔记仓库](https://github.com/leaball/the-craft-of-selfteaching)、[the-craft-of-selfteaching 前言 PDF](https://github.com/kent666/the-craft-of-selfteaching-PDF/blob/55faee481d4b713d090e60718b4c12a7a6667ac7/01.preface.pdf)、[GitHub·regular-investing-in-box 西语译本](https://github.com/xiaoqie007/regular-investing-in-box/blob/gitlocalize-9394/Translations/Spanish.pdf) | **部分成立**（生态存在；**"2019 年出版"的年份未获权威来源确认，"教育是初心"等引语无来源**） |
| 2019-12 起 | 为 Mixin Network 站台/背书，引发"骗局"质疑 | Mixin 以"签到送比特币"拉新 | 未见其对这些质疑的系统公开回应 | 2023-09 Mixin 被盗约 2 亿美元，赔付方案仅约 50%（含债券），他在微博被追问"用户的钱呢" | [新浪财经·签到10年到手30万？李笑来站台的Mixin被质疑是骗局](https://finance.sina.cn/blockchain/2019-12-24/detail-iihnzhfz7973082.d.html)、[blockvalue·"签到就送比特币"，李笑来站台的钱包被质疑是骗局](https://www.blockvalue.com/jingyan/20191226139112.html)、[PANews·李笑來背書、羅永浩入股，深扒Mixin背後的陳年往事](https://t-www.panewslab.com/zh_hk/articledetails/b8u1oqt6Ft.html)、[华夏时报·2亿美元不翼而飞，项目方却仅赔付50%](https://www.chinatimes.net.cn/article/130921.html)、[比推·Mixin被盗约2亿美元后续：赔付方案包含债券，李笑来微博被问"用户的钱呢"](https://api2.bitpush.news/articles/5131235)、[Foresight News·被盗 2 亿美元，深扒 Mixin 背后的那些事儿](https://foresightnews.pro/article/detail/43822) | **成立（站台与被盗赔付事实）/ 存疑（"早期投资人"身份，见第四章第 10 条）** |
| 2020–2022 | 出版《让时间陪你慢慢变富》《微信互联网平民创业》；"韭菜节"逐年举办（第二届 2020、第三届 2021、第四届 2022） | 定投社群商业化；微信视频号红利 | 定投、长期主义、"平民创业" | 保持小圈层影响力 | [湖南师大图书馆·让时间陪你慢慢变富](https://opaclib.hunnu.edu.cn/opac/book/a53d1340dd46640894e100ab327eb160)、[多抓鱼·微信互联网平民创业](https://www.duozhuayu.com/books/514865473746244991)、[第四届韭菜节直播领会（2022-07-03）](https://lou-kaiqiang.github.io/2022/07/03/record_of_xiaolai's_video/) | **成立** |
| 2023 前后 | 出版《财富的真相》 | — | 财富认知类内容 | 与其后《思考的真相》《专注的真相》《好的家庭教育》组成"四本套" | [文轩网·李笑来4本套](https://m.winxuan.com/product/1204322653)、[文轩·财富的真相](https://fenxiao.winxuan.com/product/1203250796)、[上海图书馆馆藏](https://vufind.library.sh.cn/Record/6dd15d94-e0bb-4e37-a9ec-e7e07ff36809) | **成立（出版事实）/ 年份待核** |
| 2024-07-12 | 《思考的真相》开售 | — | 思维方法 | 人民论坛网发新书推介 | [人民论坛网·新书推介｜李笑来新作《思考的真相》于7月12日晚开售](https://rmlt.com.cn/2024/0712/707250.shtml) | **成立** |
| 2024–2025 | 开设得到课程《李笑来谈AI时代的家庭教育》；出版《好的家庭教育》 | AI 冲击教育 | "AI 时代家庭教育逻辑重构"，从知识传递转向能力培养 | 进入家庭教育赛道，被图书馆/读书会（青岛西海岸图书馆等）共读 | [得到·李笑来谈AI时代的家庭教育](https://www.dedao.cn/course/detail?id=93N5e6Rya4ZJjQYspEVOmGApwlo08D)、[文轩·好的家庭教育](https://m.winxuan.com/product/1204266503)、[微信读书·好的家庭教育](https://weread.qq.com/web/bookDetail/1e432b80813abb5ddg017b40)、[ResoHub·AI 时代家庭教育的逻辑重构](https://www.resohub.net/2024/10/06/ai-era-family-education-logic-reconstruction/)、[青岛西海岸图书馆共读《好的家庭教育》](https://huangdaolib.net/home/pages/detail?id=8154) | **成立** |
| 2025 | 出版《专注的真相》 | 注意力经济 | 专注力是未来人与人的差距 | **人民论坛网、中国城市网先后发书评**——这是其 2025 年最明确的主流媒体曝光 | [当当·专注的真相（李笑来2025年新书上市）](http://product.dangdang.com/29858159.html)、[人民论坛网·找回被"偷走"的注意力](https://www.rmlt.com.cn/2025/0620/733295.shtml)、[中国城市网·找回被"偷走"的注意力——评李笑来《专注的真相》](https://zgcsb.com/news/pinDao/2025-06/24/a_601541.html) | **成立** |
| 2025-07-03 | 第七届"七三韭菜节"（2019 起算第七年） | — | 年度反思 | 社群内部事件，主流媒体未见报道 | [搜狐·七三韭菜节七年反思与学习心得](https://www.sohu.com/a/910791019_121127926) | **部分成立**（仅见社群/自媒体转述） |
| 2025–2026 | 转向英文写作 + AI 辅助写作；出版/开源两本英文书 | AI 写作工具成熟 | 公开分享"如何用 AI 快速写书"的方法论 | ①《The Half Second》；②《No One Did It: Responsibility Laundering, from the Scapegoat to the Algorithm》，并在 GitHub 开源（2026 年第一版） | [本人站点·How The Half Second was written（2026-05-17）](https://lixiaolai.com/articles/2026-05-17/how-the-half-second-was-written)、[GitHub·xiaolai/no-one-did-it README](https://github.com/xiaolai/no-one-did-it/blob/main/README.md)、[GitHub commit·Initial public release — No One Did It (first edition, 2026)](https://github.com/xiaolai/no-one-did-it/commit/d0ea0d6a8d729af5ec05353319fae5665334ef51)、[AbeBooks·No One Did It（ISBN 9781808260032）](https://www.abebooks.co.uk/products/isbn/9781808260032)、[Gate 广场·李笑来《The Half Second》核心观点解读](https://apim.gateapi.io/zh/post/status/21180777)、[新浪·用一天时间读完李笑来的新书《The Half Second》](https://sina.cn/news/detail/5307813347197980.html)、[lmmsoft·深度拆解他是如何用GPT-4o写书（《美国常用俚语》）](https://lmmsoft.github.io//how_did_xiaolai_write_book_with_gpt4o/)、[lijinma·笑来老师是如何快速写完两本英文书籍的？](https://lijinma.com/how-lixiaolai-wrote-two-english-books/) | **成立（项目/书籍存在）/ 部分成立（出版细节）** |
| 2025–2026 | 继续卖课与线下授课（《相约七年后》《家庭成长年度社群》《写作课》《学习的真相》），并为企业访学班授课 | — | — | 收入模式转向课程 + 社群 | [好教师网·李笑来全领域付费课程合集（含《相约七年后》《家庭成长年度社群》《写作课》）](http://www.goodjiaoshi.com/content/763011.html)、[家办访学课程·李笑来等授课（2025）](http://pre.official.ijiabin.com/info/2138/arc/26)、[linux.do·李笑来丨相约七年后](https://linux.do/t/topic/1371697) | **部分成立**（课程名与授课事实有来源；**"《学习的真相》1999元"仅见知乎提问标题，不采用**） |

---

## 二、关键决策逐一分析

### 决策 1｜离开新东方（约 2008）

- **背景**：2001 年前后进入新东方教托福，成为知名教师。
- **他当时的逻辑**：本次检索**没有拿到**他对离开原因的一手表述。旧版所写"体制内限制了发展""离开新东方是正确的决定"**在本次全部检索中找不到任何来源，判定为旧版虚构或训练语料幻觉**。
- **结果**：转型独立作者/讲师；《把时间当作朋友》成为其影响力起点；多年后他在港交所公告中以"原新东方教师"之外的身份出现（雄岸科技联席 CEO）。
- **事后反思原话**：**未找到可信原话。** 可用的间接线索是[界面·【人物】李笑来的"逃跑计划"](https://www.jiemian.com/article/2530586.html) 的索引片段描述其备课与课堂反应（"第一节课就爆了""学生们听得很嗨，鼓掌超过两分钟"），但那是描述新东方时期，不是离开的反思。
- **证据强度**：**部分成立**（任职事实坐实；离职年份与动机**不成立/无来源**）。
- **言行是否一致**：公开倡导"为自己工作"（此主张本身在本次检索中亦无直接来源）→ **无法核验**。

### 决策 2｜买入比特币（2011 起）

- **背景**：比特币极早期。
- **他当时的逻辑**：检索到的最近似表述来自 2018 年 3 月[王峰十问](http://www.iheima.com/article-167471.html)，标题即"曾经确实有过6位数比特币"——即他的自述是**"曾经有过"**，不是"一直持有"。
- **关键事实与数字**：
  - 他本人承认曾持有 **6 位数**比特币（[界面](https://www.jiemian.com/article/1971690.html)、[王峰十问](http://www.iheima.com/article-167471.html)、[腾讯云社区转载](https://cloud.tencent.cn/developer/article/1096132)、[凤凰科技转载](https://tech.ifeng.com/a/20180306/44896659_0.shtml)）。
  - 2018-10-18 他说**"中国至少有2个人比特币数量比我多"**（[新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-10-18/doc-ifxeuwws5619380.shtml)）——主动淡化"首富"标签。
  - 自媒体广泛流传的**"10 万枚比特币""套现 135 亿""押光身家/倾家荡产"**（如 [搜狐](https://www.sohu.com/a/1052553463_122159917)、[网易](https://m.163.com/dy/article/KHFSGPG80553V6MP.html)、[今日头条](https://m.toutiao.com/article/7427009902868005428/)、[Gate 广场](https://www.gate.ac/zh/post/status/10162673)、[Binance 广场](https://www.binance.com/zh-CN/square/post/1125009)）：**全部来自自媒体/交易所广场，没有任何权威来源支持"135 亿"这一数字。判定：无法证实，且与本人"曾经有过 6 位数""至少 2 人比我多"的自述张力明显。**
- **事后反思原话**：**未找到可信原话。** 旧版所引"这是我人生最重要的决策""长期主义的胜利""认知升级带来的财富"**在本次检索中无任何来源，判定为旧版虚构。** 相反，检索到一条方向相反的本人表述标题：[铅笔道·李笑来谈币圈成就：我是困在大树枝头的熊猫……我是下不去了](https://pencilnews.cn/p/18066.html)。
- **证据强度**：**部分成立**（持有过 6 位数 = 本人自述，多源；买入价、总持有量、套现额 = 无法证实）。
- **言行是否一致**：旧版判"✓ 高度一致（长期持有）"——**这个判断缺乏依据**：他自己用的是过去式"曾经有过"，且 2013 年后他做的是募资、发币、社群，不是被动长期持有。**旧版此处评级应下调为"存疑"。**

### 决策 3｜创立比特基金（2013-05）

- **背景**：2013 年比特币第一轮牛市；他以"比特币首富"身份募资。
- **他当时的逻辑**：媒体报道他在路演中**"称获益百倍"**（[中新网 2013-05-30 标题](https://www.chinanews.com/fortune/2013/05-30/4875445.shtml)）。这是本次检索到的唯一"本人说法"痕迹，且是 2013 年的市场行情表述，不是基金业绩。
- **结果**：
  - 被人民网、中新网、每经、证券时报等多家主流财经媒体报道为**"国内首只比特币基金"**，且**同期法律/专家明确警示风险大**（[人民网](http://finance.people.com.cn/stock/BIG5/n/2013/0529/c222942-21658192.html)、[人民网·专家警示风险大](http://finance.people.com.cn/money/n/2013/0530/c218900-21677845.html)）。
  - **一手文件**：全国股转系统 2016-04-14 披露文件提到"比特资产系由普通合伙人**北京睿铂极因投资管理中心（有限合伙）**管理的以投资活动为目的设立的合伙企业……已履行私募基金备案程序"（[neeq.com.cn PDF](https://www.neeq.com.cn/disclosure/2016/2016-04-14/1460619485_902628.pdf)）——**这是本次调研中唯一接近"官方文书"的证据**，但全文不可读，无法确认与李笑来的直接股权关系。
  - 清算：二手来源称**"老猫 18 年清算了 13 年李笑来的比特基金，10 万变 430 万"**（[blockvalue 2020-06](https://www.blockvalue.com/news/20200601424458.html)）。**"10 万变 430 万"仅有此一处二手表述，判定存疑。**
- **事后反思原话**：**无。** 旧版自己承认"公开言论较少"——这一判断本次得到印证。
- **证据强度**：**成立（2013-05 开募事实，多源主流媒体）+ 存疑（回报倍数、清算细节）+ 无法证实（与股转系统文件主体的确切关系）**。
- **言行是否一致**：旧版判"?"→ 结论相同：**信息不足**。

### 决策 4｜得到专栏《通往财富自由之路》（2016）

- **背景**：知识付费风口，罗振宇邀请。
- **结果与数字**：
  - 上线即有报道：**"已经有 7 万多人上路了"**（[界面](https://www.jiemian.com/article/889231.html)）——这是**可追溯的订阅量级锚点（7 万余）**。
  - 得到 2017-02 公布运营数据：**总营收 1.4 亿，最高者入 2 千万**（[新浪科技](https://tech.sina.cn/i/gn/2017-02-21/detail-ifyarrcf5303139.d.html)；另有后期口径"2亿营收"见[蓝鲸财经](https://www.lanjinger.com/d/32586)）。媒体标题未点名"最高者"就是李笑来。
  - 媒体以直接引语形式报道他本人的说法：**"一个专栏卖 2000 多万"**（[搜狐](https://www.sohu.com/a/122754732_108964)、[百家号](https://baijiahao.baidu.com/s?id=1568302752010819)，标题：「李笑来：一个专栏卖2000多万，赚钱不是故意的但很爽」）。
- **事后反思原话**：**没有可信的一手引语。** 旧版所引"知识付费是趋势""帮助了很多人""物有所值"**无任何来源，判定为旧版虚构。**
- **证据强度**：**成立（专栏存在）+ 部分成立（收入约 2000 万级，媒体转述本人说法，非财务披露）+ 存疑（"订阅超 20 万"无来源）**。
- **言行是否一致**：公开倡导"知识变现、注意力是资源"是**旧版推测**；本次未获直接引语。→ **无法核验**。

### 决策 5｜PressOne / ico.info 与 ICO 热潮（2017）

- **背景**：ICO 顶峰，他以个人影响力募资。
- **他当时的逻辑**：做"区块链内容分发"；对监管则公开表态"积极拥护""配合清退"。
- **结果数字——四种互相冲突的口径（本次调研最重要的"矛盾原样保留"）**：
  1. **8200 万美元**：[界面·深访币圈](https://www.jiemian.com/article/1885972.html) 索引片段原文："2017年6月，李笑来的PressOne项目进行ICO，在白皮书都没发布的情况下，瞬间募集到价值8200万美元的代币"。
  2. **1 亿美元**：[新浪财经 2017-08-28](https://finance.sina.cn/forex/whzx/2017-08-28/detail-ifykkfat0193335.d.html) 标题："失控的ICO：比特币首富项目书都没有就融了1亿美元"。
  3. **近 2 亿美元**：[中国网](https://economy.china.com/domestic/11173294/20170901/31251706_2.html) 标题："用一个没有白皮书的ICO项目融资近2亿美元，李笑来是谁？"
  4. **8 亿**（币种不明）：[中国报（马来西亚）2017-09-04](https://www.chinapress.com.my/20170904/%e4%b8%ad%e5%9b%bd%e6%af%94%e7%89%b9%e5%b8%81%e9%a6%96%e5%af%8c%e6%9d%8e%e7%ac%91%e4%be%86-%e7%84%a1%e9%9c%80%e8%a8%88%e5%8a%83%e6%9b%b8-%e7%a9%ba%e6%89%8b%e5%a5%978%e5%84%84/) 标题："中國比特幣首富李笑來 無需計劃書 空手套8億"。
  5. 另有[搜狐](https://www.sohu.com/a/167852908_640245)："没有项目书就能融个上亿美刀"。
  - → **"募资超 2 亿美元"是这些口径中的上限，不是共识值。** 币价计价时点不同（募集时 vs 峰值）会造成巨大差异，但本会话无法打开正文核对计价口径。
- **监管与清退**：2017-09 央行叫停后，他公开表态"配合清退""下线部分区块链资产"（[新浪财经](https://finance.sina.com.cn/roll/2017-09-06/doc-ifykpzey4811913.shtml)、[新浪财经](https://finance.sina.com.cn/chanjing/cyxw/2017-09-06/doc-ifykpysa3674381.shtml)、[界面](https://m.jiemian.com/article/1605577.html)、[江苏网络电视台](http://news.jstv.com/a/20170906/1504679153524.shtml)）。
- **清退结果**：**具体的退还比例、完成率、覆盖人数，本次检索找不到任何权威来源 → 数字无法证实。** 仅有投资者侧叙述"9 元接盘 9 毛离场"（[凤凰网](https://news.ifeng.com/a/20170920/52091133_0.shtml)）和[界面·ICO三方亲述清退经历](https://m.jiemian.com/article/1637618.html)、[PRS 清算那些事儿](https://quill.im/34305390/eed8d93a-8853-400c-aefb-bfbcbfe2d795) 等非权威/个人叙述。他本人对[搜狐万字长文采访](https://www.sohu.com/a/224918755_100111153) 的索引片段显示他谈过"从日本回来之后，退掉的不止 PressOne，ico…"。
- **事后反思原话**：**未获可信完整引语。** 旧版所引"承认项目进展不如预期……技术开发需要时间"**无来源，判定为旧版虚构。**
- **证据强度**：**成立（ICO 与清退表态事实）+ 已被反驳/存疑（"超 2 亿美元"作为唯一口径不成立，四种口径冲突）**。
- **言行是否一致**：公开称"拥护监管、配合清退" ↔ 实际行为上，他在 2018-11 又复出为项目站台（42 天后），2018-12 出任区块链公司 CEO。**不一致，见第三章。**

### 决策 6｜BigONE 交易所 / 云币网（2017–2018）

- **事实**：云币网在 9·4 后停止相关代币交易（他公开称"下线部分区块链资产"，[新浪财经](https://finance.sina.com.cn/roll/2017-09-06/doc-ifykpzey4811913.shtml)）。BigONE 由币圈人物"老猫"主导、李笑来被市场视为关联方，被行业媒体称为"李笑来、老猫的'币圈活化石'"，并在 2020 年代被列入某风险榜单（[WikiBit：BigONE——李笑来、老猫的"币圈活化石"，怎么活成了"监管黑名单"？](https://www.wikibit.com/zh-cn/news/cryptocurrency-regulatory-blacklist-exchange-wikibit-xiaolai)；BigONE 官方公告：[Spot Flashing 上线公告](https://bigone.zendesk.com/hc/en-us/articles/900001639546-The-Function-of-Spot-Flashing-Function-is-getting-listed)）。
- **数字**：**持仓比例、股权、收益一律无法证实。**
- **证据强度**：**部分成立**（关联性有行业媒体来源；**"李笑来在 BigONE 的具体角色"无一手来源**）。WikiBit 的"跑路风险榜"属第三方评级，**不作为事实依据，仅记为"存在此类第三方指控"**。

### 决策 7｜录音门（2018-07）与《韭菜的自我修养》

- **背景**：ICO 泡沫破裂，他成为舆论靶心。
- **曝光**：2018-07-04 前后，[新浪财经](https://finance.sina.com.cn/blockchain/coin/2018-07-04/doc-ihevauxi9827249.shtml) 标题："李笑来私聊遭录音：骗割散户 嘲讽软银（附录音）"。完整文字版以 PDF 形式在第三方站点流传（[bj-xinghe.com PDF](https://www.bj-xinghe.com/wp-content/uploads/2020/08/%e5%ae%8c%e6%95%b4%e6%96%87%e5%ad%97-%e6%9d%8e%e7%ac%91%e6%9d%a5%e5%86%85%e9%83%a8%e5%bd%95%e9%9f%b3%ef%bc%8c%e5%b8%81%e5%9c%88%e5%89%b2%e9%9f%ad%e8%8f%9c%e9%bb%91%e5%b9%95.pdf)）；**我无法打开该 PDF，因此不引用其中任何句子。**
- **他的应对（关键，且与旧版不符）**：
  - 他**没有发布"道歉信"**。可检索到的两篇回应标题为：
    - "李笑来发文回应录音泄露事件：**自己傻逼** 但录音大多数被曲解"（[江苏网络电视台](http://news.jstv.com/a/20180706/153086413281.shtml)）
    - "李笑来回应录音门：**没有骂用户傻逼** 录音者真的有问题"（[TechWeb](https://m.techweb.com.cn/article/2018-07-07/2683611.shtml)、[香港商报转载](http://tp.hkcd.com/content/2018-07/06/content_1095167.html)）
  - 界面的一篇标题则将回应包装为正面形象："「李笑来的回应」曝光，比特币首富竟是币圈'头号老实人"（[界面](https://www.jiemian.com/article/2285816.html)）。
  - → **他的策略是"部分承认 + 否认关键指控 + 归因于录音者恶意"，而非道歉。旧版"承认录音真实性、公开道歉"只对了一半。**
- **法律行动**：他与陈伟星长期互怼（[新浪财经·陈伟星X李笑来：几番风雨 一地鸡毛](https://finance.sina.com.cn/blockchain/coin/2018-06-15/doc-ihcyszrz2216388-p2.shtml)、[新浪财经·吃瓜群众专用指南：李笑来陈伟星互怼全程](http://finance.sina.com.cn/blockchain/coin/2018-07-11/doc-ihfefkqq2260844.shtml)），并宣布**起诉陈伟星诽谤**（[澎湃](https://m.thepaper.cn/wifiKey_detail.jsp?contid=2252976)）。后续有报道称**"与陈伟星诽谤的案件二审结果维持原判，此事告一段落"**（[BlockGlobe24](https://www.blockglobe24.com/news-flash/23368.html)、[火讯](https://admindoc.huoxun.com/index.php/lives/589167.html)）。**注意：这些标题只说"维持原判"，未说明一审是胜是败，因此"他赢了还是输了"无法证实。** 另有"他已经换了四拨律师"的说法（[火讯](http://huoxun.com/index.php/lives/551662.html)）。
- **《韭菜的自我修养》的意图**：媒体解读高度负面——[新浪财经 2018-09-17](https://finance.sina.com.cn/blockchain/2018-09-17/doc-ifxeuwwr5114152.shtml) 标题即"李笑来发新书 **一场新收割拉开序幕**"；[凤凰科技](https://tech.ifeng.com/c/7gGaFFhkbsu) 同题转载。亦有[新浪财经 2023 年回顾类文章](https://finance.sina.com.cn/money/future/wemedia/2023-10-29/doc-imzsunmf7934294.shtml)将其定位为"割过'韭菜'的大佬，对'韭菜'说了一些大实话"。**他本人的意图声明未找到。**
- **证据强度**：**成立（录音、回应、诉讼、出版）+ 已被反驳（旧版"发布道歉信"）+ 无法证实（案件胜负）**。

### 决策 8｜宣布退出 → 42 天复出 → 出任港股 CEO（2018-09 至 2019-05）★核心言行不一致

这是本次调研**证据最硬、链条最完整**的一组决策。

| 时间 | 事件 | 来源 |
|---|---|---|
| 2018-09-30 | 公开声明"个人不会做任何项目投资，准备花时间转行" | [新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-09-30/doc-ifxeuwwr9757362.shtml)、[TechWeb](https://people.techweb.com.cn/2018-09-30/2705019.shtml) |
| 2018-10-12 | 媒体深度复盘："绝望半年告别币圈 李笑来的'逃跑计划'" | [新浪科技](https://tech.sina.cn/i/gn/2018-10-12/detail-ifxeuwws3405644.d.html)、[钛媒体](https://www.tmtpost.com/3526509.html)、[界面](https://www.jiemian.com/article/2530586.html) |
| 2018-11-14 | **退出 42 天后复出，为一"暴跌 94.5%"的项目站台** | [新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-11-14/doc-ihnvukfe6652784.shtml)、[未央网](https://www.weiyangx.com/310498.html)、[零壹财经](https://www.01caijing.com/blog/329454.htm) |
| 2018-12-03 | 出任雄岸科技（01647.HK）执行董事及联席行政总裁 | [港交所公告 PDF](http://www.grandshorestech.com/uploadfile/file/20181203/201812030815410.pdf)、[澎湃](https://www.thepaper.cn/newsDetail_forward_2701717) |
| 2018-12-04/05 | 股价涨近 20%；媒体直接冠以"**多次食言退出币圈**" | [新浪财经](https://finance.sina.com.cn/stock/hkstock/ggscyd/2018-12-04/doc-ihmutuec6111489.shtml)、[新浪财经](https://finance.sina.cn/blockchain/2018-12-05/detail-ihmutuec6435165.d.html) |
| 2019-05 | 辞任；转做"高级荐币群" | [智通财经](https://m.zhitongcaijing.com/contentnew/appcontentdetail.html?content_id=202465)、[新浪财经](https://finance.sina.com.cn/blockchain/roll/2019-05-15/doc-ihvhiqax8892786.shtml)、[搜狐](https://www.sohu.com/a/314068326_250147) |
| 2019-07-03 | 发行新币 BOX、建"定投践行群" | [36氪](https://36kr.com/p/1723959853057)、[36氪](https://36kr.com/p/1723965816833)、[Odaily](https://www.odaily.news/post/5138866) |

- **事后反思原话**：**未找到。** 他没有对"食言"作出可检索到的系统回应。
- **证据强度**：**坐实**（一手公告 + 多源主流财经媒体 + 精确日期）。
- **言行是否一致**：**不一致。这是"真实行为 vs 声称原则"落差最清晰的案例。**

### 决策 9｜BOX / 定投践行群 / Mixin（2019 至今）

- **BOX 发行**：2019-07-03，被 36氪、Odaily 明确描述为"录音门'退圈'一周年再发新币"（[36氪](https://36kr.com/p/1723959853057)、[Odaily](https://www.odaily.news/post/5138866)）。其配套文本《定投改变命运》在其 GitHub 开源（[raw.githubusercontent.com/xiaolai/regular-investing-in-box](https://raw.githubusercontent.com/xiaolai/regular-investing-in-box/b7dd6694b2310c6eb0a075844ebf03227a005a38/Z-Appendix.02.md)，该仓库路径 `xiaolai/regular-investing-in-box` 本身可证）。
- **社群规模**：仅见社群/个人博客转述"超过 4000 人的 BOX 定投践行群"（[简书](https://www.jianshu.com/p/e431d43e8d10)）与"7 万多人"（属得到专栏时期，[界面](https://www.jiemian.com/article/889231.html)，勿混用）。**4000 人这一数字仅有非权威来源，标存疑。**
- **批评**：有专门的反面长文"Why 普通人不应该定投李笑来的 BOX"（[AICoin](https://www.aicoin.com/zh-Hans/article/236717)）；Mixin 官方论坛出现"**李笑来鼓励金停发，没有商业道德**"的投诉帖（[Mixin Discourse](http://discuss.mixin.one/questions/D1DJ1/E1JJ1)）。
- **Mixin 关系（务必区分）**：
  - PANews 的措辞是"**李笑來背書、羅永浩入股**"（[PANews](https://t-www.panewslab.com/zh_hk/articledetails/b8u1oqt6Ft.html)）→ **"背书"（站台）与"入股"（投资人）被明确区分，罗永浩是入股方。**
  - 行业媒体描述为"OG 扎堆、**笑来力捧**、粉丝血汗"（[HTX 社区](https://www.htx.com/zh-cn/feed/community/2462137/)、[比推转载](https://api2.bitpush.news/articles/5121403)）。
  - → **"李笑来是 Mixin 早期投资人"这一说法：存疑。** 可确认的是**强力背书/站台**；股权与投资金额**无法证实**。
- **2023-09 被盗事件**：涉及约 **2 亿美元**（[华夏时报](https://www.chinatimes.net.cn/article/130921.html) 标题："2亿美元不翼而飞，项目方却仅赔付50%！Mixin被盗事件被疑自导自演"；[Foresight News](https://foresightnews.pro/article/detail/44294)："背后疑点重重！复盘 Mixin 两亿美元失窃案"）；赔付方案**包含债券**，他在微博被追问"用户的钱呢"（[比推](https://api2.bitpush.news/articles/5131235)）。
- **证据强度**：**成立（BOX 发行、Mixin 被盗与赔付争议）+ 存疑（社群规模、"早期投资人"身份）**。
- **言行是否一致**：公开主张"定投、长期主义、老实做个好人就能赚很多钱"（[虎嗅](https://pro.huxiu.com/article/253376.html)、[36氪快讯](https://36kr.com/newsflashes/3278920450049)）↔ 其社群标的（BOX/Mixin）出现"鼓励金停发"投诉与 50% 赔付争议。**部分不一致（指控来源非权威，标部分成立）。**

### 决策 10｜开源写作与形象修复（2019–2022）

- 《自学是门手艺》《定投改变命运》在 GitHub 形成生态，含第三方 fork、笔记仓库、**西班牙语译本 PDF**（[charliehower fork](https://github.com/charliehower/selfteaching-book-_python)、[leaball 笔记仓库](https://github.com/leaball/the-craft-of-selfteaching)、[西语译本](https://github.com/xiaoqie007/regular-investing-in-box/blob/gitlocalize-9394/Translations/Spanish.pdf)、[前言 PDF](https://github.com/kent666/the-craft-of-selfteaching-PDF/blob/55faee481d4b713d090e60718b4c12a7a6667ac7/01.preface.pdf)）。
- "韭菜节"持续举办：第二届 2020-07-03、第三届 2021、**第四届 2022-07-03**（[第四届直播领会](https://lou-kaiqiang.github.io/2022/07/03/record_of_xiaolai's_video/)）。
- **事后反思原话**：未找到。"教育是我的初心""开源是回馈社会"**无来源，判定为旧版虚构。**
- **证据强度**：**部分成立**（开源仓库与译本存在；年份与动机表述无权威来源）。

### 决策 11｜转向"真相"系列出版 + 家庭教育（2023–2025）

- **《思考的真相》**：2024-07-12 晚开售，**人民论坛网**发推介（[rmlt.com.cn](https://rmlt.com.cn/2024/0712/707250.shtml)）。
- **《专注的真相》**：**2025 年新书**（[当当商品页标题含"李笑来2025年新书上市"](http://product.dangdang.com/29858159.html)）；**人民论坛网 2025-06-20** 与**中国城市网 2025-06-24** 分别发书评"找回被'偷走'的注意力"（[人民论坛网](https://www.rmlt.com.cn/2025/0620/733295.shtml)、[中国城市网](https://zgcsb.com/news/pinDao/2025-06/24/a_601541.html)）。
- **《财富的真相》《好的家庭教育》**：与上两本组成"李笑来4本套"（[文轩网](https://m.winxuan.com/product/1204322653)）；《好的家庭教育（思维导图版）》（[文轩网](https://m.winxuan.com/product/1204397659)）；图书馆与读书会共读（[青岛西海岸图书馆](https://huangdaolib.net/home/pages/detail?id=8154)、[微信读书](https://weread.qq.com/web/bookDetail/1e432b80813abb5ddg017b40)）。
- **得到课程**：《李笑来谈AI时代的家庭教育》（[dedao.cn](https://www.dedao.cn/course/detail?id=93N5e6Rya4ZJjQYspEVOmGApwlo08D)、[pc.igetget.com](https://pc.igetget.com/course/%E6%9D%8E%E7%AC%91%E6%9D%A5%E8%B0%88AI%E6%97%B6%E4%BB%A3%E7%9A%84%E5%AE%B6%E5%BA%AD%E6%95%99%E8%82%B2)）；另有一期与脱不花的对谈"其实你不需要意志力"（[小宇宙](https://www.xiaoyuzhoufm.com/episode/6895a38746542d8c4120d691)、[豆瓣播客](https://www.douban.com/podcast_episode/361788)）。
- **证据强度**：**成立**（多本书有出版社/图书馆/主流媒体书评支撑；得到课程有官方页面）。

### 决策 12｜AI 辅助英文写作（2025–2026）★最新动作

- **《The Half Second》**（英文书）：他本人在**自己的站点发文《How The Half Second was written》，URL 日期为 2026-05-17**（[lixiaolai.com/articles/2026-05-17/how-the-half-second-was-written](https://lixiaolai.com/articles/2026-05-17/how-the-half-second-was-written)）；豆瓣有读者笔记页（[豆瓣](https://book.douban.com/people/135268500/annotation/38486819/)）；中文圈流传其"10 个核心观点"（[Gate 广场](https://apim.gateapi.io/zh/post/status/21180777)、[Gate 广场](http://gate.tv/zh/post/status/21835254)、[新浪](https://sina.cn/news/detail/5307813347197980.html)）——核心论点是"人生由半秒第一反应决定""潜意识比意识快 0.5–10 秒""意志力又慢又弱，改写本能必胜"。
- **《No One Did It》**（英文书，副题 **"Responsibility Laundering, from the Scapegoat to the Algorithm"**）：
  - **GitHub 仓库 `xiaolai/no-one-did-it` 开源**，commit 信息为"**Initial public release — No One Did It (first edition, 2026)**"，提交时间戳 **2026-05-27**（[commit d0ea0d6](https://github.com/xiaolai/no-one-did-it/commit/d0ea0d6a8d729af5ec05353319fae5665334ef51)；仓库见 [README](https://github.com/xiaolai/no-one-did-it/blob/main/README.md)、[about-the-author](https://github.com/xiaolai/no-one-did-it/blob/main/book/back-matter/about-the-author.md)、[LICENSE](https://github.com/xiaolai/no-one-did-it/blob/main/LICENSE)）。
  - 另有商业出版版本（[AbeBooks ISBN 9781808260032](https://www.abebooks.co.uk/products/isbn/9781808260032)）。
  - **这一条是"用 GitHub 开源 + 商业出版并行"的模式，与 2019 年《自学是门手艺》的开源路线一脉相承。**
- **AI 写作方法论**：第三方复盘称他"只花了 18 美金和一天时间"用 GPT-4o 写出《美国常用俚语》（[lmmsoft.github.io](https://lmmsoft.github.io//how_did_xiaolai_write_book_with_gpt4o/)），以及"如何快速写完两本英文书籍"（[lijinma.com](https://lijinma.com/how-lixiaolai-wrote-two-english-books/)）。**这些是第三方复述，非本人披露。**
- **课程/线下**：《相约七年后》《家庭成长年度社群》《写作课》等（[好教师网合集介绍](http://www.goodjiaoshi.com/content/763011.html)）；为企业访学班授课（[家办访学课程页](http://pre.official.ijiabin.com/info/2138/arc/26)、[课程计划页](http://pre.official.ijiabin.com/info/2125/arc/1)）。
- **证据强度**：**成立**（GitHub commit 时间戳 + 本人站点文章 URL 日期 + 独立商业出版 ISBN 三重独立证据）。
- **言行是否一致**：与他一贯的"开源 + 写作变现 + 教方法"一致。**一致。**

---

## 三、言行一致性核验

| # | 公开主张（含来源） | 实际行为（含来源） | 是否一致 | 证据 | 强度分级 |
|---|---|---|---|---|---|
| 1 | 2018-09-30："个人不会做任何项目投资，准备花时间转行"（[新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-09-30/doc-ifxeuwwr9757362.shtml)、[TechWeb](https://people.techweb.com.cn/2018-09-30/2705019.shtml)） | 2018-11-14 复出为项目站台；2018-12-03 出任雄岸科技联席 CEO；2019-05 做"高级荐币群"；2019-07 发新币 BOX（[新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-11-14/doc-ihnvukfe6652784.shtml)、[港交所公告](http://www.grandshorestech.com/uploadfile/file/20181203/201812030815410.pdf)、[新浪财经](https://finance.sina.com.cn/blockchain/roll/2019-05-15/doc-ihvhiqax8892786.shtml)、[36氪](https://36kr.com/p/1723959853057)） | **✗ 不一致** | 一手公告 + 多源主流财经媒体 + 精确日期；媒体直接用词"**多次食言退出币圈**" | **坐实** |
| 2 | 2017-09：公开"拥护ICO监管""配合清退""组织员工学习政策精神"（[新浪财经](https://finance.sina.com.cn/roll/2017-09-06/doc-ifykpzey4811913.shtml)、[江苏网络电视台](http://news.jstv.com/a/20170906/1504679153524.shtml)） | PressOne 在**白皮书未发布**情况下即完成募资（[界面](https://www.jiemian.com/article/1885972.html)、[新浪财经](https://finance.sina.cn/forex/whzx/2017-08-28/detail-ifykkfat0193335.d.html)）；清退比例与完成度无法证实 | **部分不一致**（表态与"无白皮书募资"的募资方式存在张力） | 主张侧坐实；行为侧坐实；**清退结果无法证实** | **部分成立** |
| 3 | 2018-07：回应录音门"没有骂用户傻逼""录音大多数被曲解"（[TechWeb](https://m.techweb.com.cn/article/2018-07-07/2683611.shtml)、[江苏网络电视台](http://news.jstv.com/a/20180706/153086413281.shtml)） | 同一回应中承认"自己傻逼"；曝光录音标题指向"骗割散户"（[新浪财经](https://finance.sina.com.cn/blockchain/coin/2018-07-04/doc-ihevauxi9827249.shtml)）；[经济观察网](http://www.eeo.com.cn/2018/0713/332330.shtml) 直接以"李笑来露馅了"为题 | **✗ 不一致（部分）** | 录音内容我**无法打开核对**；仅凭标题与他的回应措辞 | **部分成立** |
| 4 | 2018：对媒体称"区块链世界里老实做个好人就能赚很多钱"（[虎嗅](https://pro.huxiu.com/article/253376.html)、[36氪快讯](https://36kr.com/newsflashes/3278920450049)） | 被指"收取 20% 高额站台费"（[钛媒体](https://www.tmtpost.com/3237874.html)，标题："**老猫默认**李笑来收取20%高额站台费，引发行业透明度之争"） | **存疑（疑似不一致）** | **单一来源，且为"老猫默认"式转述，非直接证据；我无法核对正文** | **存疑** |
| 5 | 长期主义 / 定投 / 让时间陪你慢慢变富（《定投改变命运》开源文本、书名） | 社群标的 Mixin 出现"**李笑来鼓励金停发，没有商业道德**"投诉（[Mixin Discourse](http://discuss.mixin.one/questions/D1DJ1/E1JJ1)）；2023 年 Mixin 被盗约 2 亿美元后**仅赔付约 50% 且含债券**（[华夏时报](https://www.chinatimes.net.cn/article/130921.html)、[比推](https://api2.bitpush.news/articles/5131235)）；有专门长文"为什么普通人不应该定投李笑来的BOX"（[AICoin](https://www.aicoin.com/zh-Hans/article/236717)） | **部分不一致** | 赔付事实有主流媒体；"鼓励金停发"仅论坛投诉 | **部分成立** |
| 6 | 主动淡化"比特币首富"标签：2018-10"中国至少有2个人比特币数量比我多"（[新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-10-18/doc-ifxeuwws5619380.shtml)） | 长期默许/受益于"比特币首富"标签（媒体标题大量使用：[界面](https://www.jiemian.com/article/1971690.html)、[中新网](https://www.chinanews.com.cn/m/cj/2017/09-11/8327747.shtml) 等） | **一致（自述层面）** | 他本人确实公开修正了夸张标签 | **成立** |
| 7 | 教导读者不追涨杀跌、做"韭菜的自我修养"（书名/出版事实） | 媒体将该书的出版解读为"**一场新收割拉开序幕**"（[新浪财经](https://finance.sina.com.cn/blockchain/2018-09-17/doc-ifxeuwwr5114152.shtml)、[凤凰科技](https://tech.ifeng.com/c/7gGaFFhkbsu)） | **存疑** | 这是**媒体的价值判断**，不是他的行为证据 | **存疑** |
| 8 | 开源回馈（《自学是门手艺》《定投改变命运》《No One Did It》均开源） | GitHub 仓库确实公开可访问、允许 fork 与翻译（[no-one-did-it](https://github.com/xiaolai/no-one-did-it/blob/main/README.md)、[西语译本](https://github.com/xiaoqie007/regular-investing-in-box/blob/gitlocalize-9394/Translations/Spanish.pdf)） | **✓ 一致** | 仓库与 commit 可直接验证 | **成立** |
| 9 | 区块链/去中心化布道者（多年） | 2023 年后公开内容重心明显转向**财富认知、思维、专注力、家庭教育、英文写作**；币圈标签淡化 | **一致（转型，非矛盾）** | 书目与课程来源 | **成立** |
| 10 | EOS 相关：曾与 EOS/BM 关系密切，EOS 官方"**去李笑来化**"（[36氪](https://36kr.com/p/1722433585153)，标题："一天暴涨50%的同时，EOS官方再次去李笑来化"）；新京报还原其操作（[中国网转载](https://finance.china.com/tech/13001906/20180709/32656686.html)，索引片段："李笑来既是EOS开发block…"**片段被截断**） | 2025 年 EOS 更名 Vaulta，币价较高点跌近 90%，被媒体称为其"**七年之约**"到期（[Cointelegraph中文](https://cn.cointelegraph.com/news/the-seven-year-agreement-has-expired-eos-plummeted-90percent-and-finally-rebranded-a-dollar4-1-billion-blockchain-dream-comes-to-an-end)、[比推](https://api2.bitpush.news/articles/7561949)、[BTCC](https://www.btcc.com/zh-TW/amp/square/PanewslabTW/788418)） | **存疑** | 索引片段被截断，**"李笑来=EOS 开发方"这一表述我无法核实**；"七年之约"的确切出处与主语我无法核实 | **存疑** |

---

## 四、数字核验表 ★重点章节

**核验规则**：只有在检索结果标题或索引片段中**直接出现**的数字才算"可追溯"；凡需我推断的，一律"无法证实"。**我未能打开任何正文，因此"可追溯"≠"已核实"。**

| # | 旧版数字/说法 | 核验结果 | 依据 URL | 判定 |
|---|---|---|---|---|
| 1 | 2011 年首次接触比特币，"当时价格极低（**1–10 美元**）" | 检索不到任何来源给出**他的实际买入价**。比特币 2011 年的市场价区间是公开市场数据，但**与他个人的买入成本无关**。旧版把市场价当作他的成本，属于推断。 | 无（**找不到来源**） | **数字无法证实（旧版推断）** |
| 2 | "据称购入 **6 位数比特币**" | ✅ **成立，且是本人自述**。2018-03 王峰十问标题即"曾经确实有过6位数比特币"；界面 2018-01 标题"曾拥有过6位数比特币"。**注意时态是"曾经有过"**。 | [王峰十问](http://www.iheima.com/article-167471.html)、[界面](https://www.jiemian.com/article/1971690.html)、[凤凰科技转载](https://tech.ifeng.com/a/20180306/44896659_0.shtml) | **成立（本人自述）** |
| 3 | （自媒体衍生）"**10 万个比特币**" | ⚠️ 数量级上与"6 位数"不矛盾（10 万也是 6 位数），但**全部来源均为自媒体/交易所广场**，且**与本人"中国至少有 2 个人比我多"的表述无法互证**。旧版未采用此说法，正确。 | [搜狐](https://www.sohu.com/a/1052553463_122159917)、[网易](https://m.163.com/dy/article/KHFSGPG80553V6MP.html)、[今日头条](https://m.toutiao.com/article/7427009902868005428/) | **无法证实（自媒体）** |
| 4 | （自媒体衍生）"套现 **135 亿**"、"押光身家/倾家荡产" | ❌ **无法证实，且高度可疑**。仅有交易所广场与自媒体标题，无任何权威来源。**严禁采信。** | [Gate 广场](https://www.gate.ac/zh/post/status/10162673)、[Binance 广场](https://www.binance.com/zh-CN/square/post/1125009)、[Gate 新闻](https://www.gateweb3.net/zh-tw/news/detail/14635585) | **已被反驳/无法证实** |
| 5 | "成为中国**比特币首富**之一"、"建立了'比特币首富'形象" | ⚠️ 该标签是**媒体加诸于他**的（中新网、界面、财新等标题大量使用），**他本人 2018-10 明确否认**"至少有 2 人比我多"。旧版把标签当作他的自我定位，**不准确**。 | [新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-10-18/doc-ifxeuwws5619380.shtml)、[中新网](https://www.chinanews.com.cn/m/cj/2017/09-11/8327747.shtml) | **部分成立（标签存在，非自我定位）** |
| 6 | 旧版引语："这是我人生最重要的决策""长期主义的胜利""认知升级带来的财富" | ❌ **全部找不到任何来源，判定为旧版虚构。** 相反方向的本人表述存在（"我是困在大树枝头的熊猫……我是下不去了"）。 | [铅笔道](https://pencilnews.cn/p/18066.html)（反向） | **已被反驳（虚构引语）** |
| 7 | "比特基金 2013 创立"、"中国**首个比特币天使投资基金**" | ⚠️ 半对半错。**时间对**：2013-05-29/30 多家主流媒体报"国内首只比特币基金开募"。**定性不准**：比特基金被报道为**比特币基金（私募）**，而非"天使投资基金"；他的**项目天使投资**载体是后来的"硬币资本（INBlockchain）"（[Crunchbase：Xiaolai Li - Founder @ INBlockchain](https://www.crunchbase.com/person/xiaolai-li)、[经济观察网](http://www.eeo.com.cn/2018/0319/324837.shtml)）。 | [人民网](http://finance.people.com.cn/stock/BIG5/n/2013/0529/c222942-21658192.html)、[中新网](https://www.chinanews.com/fortune/2013/05-30/4875445.shtml)、[每经](http://www.nbd.com.cn/articles/2013-05-29/745199.html)、[证券时报](http://epaper.stcn.com/paper/zqsb/html/2013-05/29/content_474060.htm) | **部分成立（时间对，定性错）** |
| 8 | "比特基金投资了多个区块链项目，部分成功部分失败"、"未详细披露投资回报" | ⚠️ 无可核实信息。唯一相关二手说法："老猫 18 年清算了 13 年李笑来的比特基金，**10 万变 430 万**"。**该数字仅一处二手来源（blockvalue，2020-06），无法证实，且"10万→430万"的43倍与"获益百倍"等说法无法互证。** | [blockvalue](https://www.blockvalue.com/news/20200601424458.html) | **存疑（单一二手来源）** |
| 9 | 得到专栏"**订阅人数超 20 万**"、"收入超千万" | ⚠️ **20 万订阅：本次检索找不到任何来源。** 可追溯的锚点是**"已经有 7 万多人上路了"**（界面报道）。收入侧：得到官方口径"总营收1.4亿 最高者入2千万"（**未点名他**）；媒体以引语形式报道他本人说"**一个专栏卖 2000 多万**"。 | [界面](https://www.jiemian.com/article/889231.html)、[新浪科技](https://tech.sina.cn/i/gn/2017-02-21/detail-ifyarrcf5303139.d.html)、[搜狐](https://www.sohu.com/a/122754732_108964) | **部分成立（7万+可追溯；20万无法证实；收入约2000万级为本人转述，非财务披露）** |
| 10 | PressOne "**募资超 2 亿美元**" | ❌ **作为唯一口径不成立。四种互相冲突的公开口径：8200 万美元 / 1 亿美元 / 近 2 亿美元 / 8 亿（币种不明）。** "超 2 亿美元"是上限值，不是共识值。**正确的写法应是："媒体口径在 8200 万美元至近 2 亿美元之间冲突，无法确定。"** | [界面](https://www.jiemian.com/article/1885972.html)、[新浪财经](https://finance.sina.cn/forex/whzx/2017-08-28/detail-ifykkfat0193335.d.html)、[中国网](https://economy.china.com/domestic/11173294/20170901/31251706_2.html)、[中国报](https://www.chinapress.com.my/20170904/%e4%b8%ad%e5%9b%bd%e6%af%94%e7%89%b9%e5%b8%81%e9%a6%96%e5%af%8c%e6%9d%8e%e7%ac%91%e4%be%86-%e7%84%a1%e9%9c%80%e8%a8%88%e5%8a%83%e6%9b%b8-%e7%a9%ba%e6%89%8b%e5%a5%978%e5%84%84/) | **存疑（口径冲突，旧版单点采信错误）** |
| 11 | 录音门后"**发布道歉信**""解释为'私下玩笑'" | ❌ **"道歉信"不成立**；"私下玩笑"这一说法**找不到来源**。可追溯的是微博长文回应，措辞为"自己傻逼"+"录音大多数被曲解"+"没有骂用户傻逼"。 | [江苏网络电视台](http://news.jstv.com/a/20180706/153086413281.shtml)、[TechWeb](https://m.techweb.com.cn/article/2018-07-07/2683611.shtml) | **已被反驳** |
| 12 | 旧版引语："这是人生低谷""学到了很多教训""要更加谨慎" | ❌ **找不到任何来源，判定为旧版虚构。** | 无 | **已被反驳（虚构引语）** |
| 13 | "2019 年出版《自学是门手艺》，开源免费" | ⚠️ **部分成立**。GitHub 生态确实存在（多个 fork、笔记仓库、前言 PDF），但**"2019 年"这一年份与"出版"形式（开源电子书 vs 纸质书）本次未获权威来源确认**。 | [fork 1](https://github.com/charliehower/selfteaching-book-_python)、[笔记仓库](https://github.com/leaball/the-craft-of-selfteaching)、[前言 PDF](https://github.com/kent666/the-craft-of-selfteaching-PDF/blob/55faee481d4b713d090e60718b4c12a7a6667ac7/01.preface.pdf) | **部分成立（年份待核）** |
| 14 | "定投践行群（2019 至今）**收入相对稳定**、影响力局限在小圈子" | ⚠️ 收入**完全无法证实**（无任何财务数据）。社群存在与延续可证（2019-07 建群 → 第四届韭菜节 2022 → 2025 第七年）。 | [36氪](https://36kr.com/p/1723965816833)、[第四届韭菜节](https://lou-kaiqiang.github.io/2022/07/03/record_of_xiaolai's_video/)、[搜狐·七三韭菜节七年反思](https://www.sohu.com/a/910791019_121127926) | **收入无法证实** |
| 15 | "**Mixin（李笑来是早期投资人？）**" | ⚠️ **应改为"强力背书者"**。PANews 的措辞明确区分："李笑來**背書**、羅永浩**入股**"。行业媒体用"笑来力捧"。**投资金额与股权无一手来源。** | [PANews](https://t-www.panewslab.com/zh_hk/articledetails/b8u1oqt6Ft.html)、[HTX 社区](https://www.htx.com/zh-cn/feed/community/2462137/)、[Foresight News](https://foresightnews.pro/article/detail/43822) | **存疑（"投资人"身份不成立，"背书"成立）** |
| 16 | "BOX 定投标的（b.watch）" | ⚠️ "b.watch" 这一域名/品牌名**本次检索未出现任何来源**。BOX 作为其 2019-07 发行的社群标的**成立**（36氪/Odaily）。**另需警惕：CoinLore 上 ticker 为 BOX 的币是 ContentBox，与李笑来的 BOX 不是同一个项目，切勿混用行情数据。** | [36氪](https://36kr.com/p/1723959853057)、[Odaily](https://www.odaily.news/post/5138866)（对照：[CoinLore·ContentBox](https://www.coinlore.com/coin/contentbox)） | **b.watch 无法证实；BOX 发行成立** |
| 17 | 旧版"比特基金→2013 投资了多个区块链项目""部分项目成功" | 无来源 | 无 | **无法证实** |
| 18 | 《The Half Second》《No One Did It》相关 | ✅ **2026 年的真实新动作**（旧版完全没有）。旧版"缺少 2019 年后的重大决策信息"这一自我承认，本次已部分填补。 | [本人站点 2026-05-17](https://lixiaolai.com/articles/2026-05-17/how-the-half-second-was-written)、[GitHub commit 2026-05-27](https://github.com/xiaolai/no-one-did-it/commit/d0ea0d6a8d729af5ec05353319fae5665334ef51)、[AbeBooks](https://www.abebooks.co.uk/products/isbn/9781808260032) | **成立（新增发现）** |
| 19 | "《学习的真相》**1999 元**"（本次检索发现，非旧版） | ⚠️ 仅见知乎提问标题，**不采用**。 | [知乎提问标题](https://www.zhihu.com/question/562060704)（**黑名单源，仅记录"存在此说法"而不作为依据**） | **无法证实** |
| 20 | 深交所某定期报告股东表中出现"李笑来 2016年12月 360,000.00 **0.0758%**" | ⚠️ **不能确认是否同一人**（"李笑来"非罕见姓名），且 PDF 无法打开核对上下文。**不予采用，记录为待核线索。** | [深交所 PDF 索引](http://reportdocs.static.szse.cn/UpFiles/rasinfodisc1/202206/RAS_202206_000181467E1D233FE4B56D935DE8A03F.pdf) | **无法证实（身份不确定）** |

### 四之补充：本次发现的其他"数字"（供后续核验，勿直接采信）

- Mixin 被盗金额"约 **2 亿美元**"、赔付"**仅 50%**"且含债券 —— 有[华夏时报](https://www.chinatimes.net.cn/article/130921.html)、[比推](https://api2.bitpush.news/articles/5131235)、[Foresight News](https://foresightnews.pro/article/detail/44294) 多个来源，**较可信但仍非一手公告**。
- EOS ICO 总额"**41 亿美元**" —— [Cointelegraph 中文](https://cn.cointelegraph.com/news/the-seven-year-agreement-has-expired-eos-plummeted-90percent-and-finally-rebranded-a-dollar4-1-billion-blockchain-dream-comes-to-an-end) 标题给出，**EOS ICO 是公开事实，此数字与其无直接个人关联**。
- 得到全国口径"总营收 **1.4 亿**"（2017-02）/"**2 亿**营收"（后期）—— [新浪科技](https://tech.sina.cn/i/gn/2017-02-21/detail-ifyarrcf5303139.d.html)、[蓝鲸财经](https://www.lanjinger.com/d/32586)。**是平台数据，不是他个人的。**

---

## 五、2023–2026 最新动作

### 已确认（多重独立来源）

1. **出版节奏加快，"真相"系列成型（2023–2025）**
   - 《财富的真相》（约 2023）→《思考的真相》（**2024-07-12 开售**，[人民论坛网](https://rmlt.com.cn/2024/0712/707250.shtml)）→《专注的真相》（**2025 年新书**，[当当](http://product.dangdang.com/29858159.html)；[人民论坛网 2025-06-20 书评](https://www.rmlt.com.cn/2025/0620/733295.shtml)、[中国城市网 2025-06-24 书评](https://zgcsb.com/news/pinDao/2025-06/24/a_601541.html)）→《好的家庭教育》（[文轩](https://m.winxuan.com/product/1204266503)、[微信读书](https://weread.qq.com/web/bookDetail/1e432b80813abb5ddg017b40)）。
   - 出版社侧以"**李笑来4本套**"打包销售（[文轩网](https://m.winxuan.com/product/1204322653)）。
   - **注意**：《专注的真相》获**人民论坛网**与**中国城市网**两家主流媒体书评，这是 2018 年录音门之后其罕见的、非币圈的正面主流媒体曝光。

2. **家庭教育 / AI 教育成为新赛道（2024–2025）**
   - 得到课程《李笑来谈AI时代的家庭教育》（[得到官方页面](https://www.dedao.cn/course/detail?id=93N5e6Rya4ZJjQYspEVOmGApwlo08D)）。
   - 与脱不花对谈播客"其实你不需要意志力"（[小宇宙](https://www.xiaoyuzhoufm.com/episode/6895a38746542d8c4120d691)）。
   - 图书馆/读书会共读《好的家庭教育》（[青岛西海岸图书馆](https://huangdaolib.net/home/pages/detail?id=8154)）。
   - 主题：AI 时代从"知识传递"转向"能力培养与认知升级"（[ResoHub 分析](https://www.resohub.net/2024/10/06/ai-era-family-education-logic-reconstruction/)）。

3. **★ 转向英文写作 + AI 辅助写作（2025–2026）——这是他最新的战略性转向**
   - **《The Half Second》**：他在**自己站点的 2026-05-17 文章**《How The Half Second was written》中公开写作方法（[lixiaolai.com](https://lixiaolai.com/articles/2026-05-17/how-the-half-second-was-written)）。核心主张（据中文圈转述）：人生由"**半秒**第一反应"决定，潜意识比意识快 0.5–10 秒，意志力又慢又弱、应改写本能而非对抗本能。读者笔记见[豆瓣](https://book.douban.com/people/135268500/annotation/38486819/)。
   - **《No One Did It: Responsibility Laundering, from the Scapegoat to the Algorithm》**：GitHub 仓库 `xiaolai/no-one-did-it` 开源，**commit 明确写着 "Initial public release — No One Did It (first edition, 2026)"，时间戳 2026-05-27**（[commit](https://github.com/xiaolai/no-one-did-it/commit/d0ea0d6a8d729af5ec05353319fae5665334ef51)）；同时有商业出版版（[AbeBooks ISBN 9781808260032](https://www.abebooks.co.uk/products/isbn/9781808260032)）。
   - **这一"开源 + 商业出版并行"的模式，与 2019 年《自学是门手艺》完全一致——是他少见的、跨越 7 年保持一致的做事方式。**
   - 另有 AI 快速写书案例《美国常用俚语》（[lmmsoft 复盘](https://lmmsoft.github.io//how_did_xiaolai_write_book_with_gpt4o/)、[lijinma 复盘](https://lijinma.com/how-lixiaolai-wrote-two-english-books/)）。

4. **社群与课程延续（2019 → 2025/2026）**
   - "七三韭菜节"从 2019 连办到 **2025 年（第七年）**（[搜狐·七三韭菜节七年反思与学习心得](https://www.sohu.com/a/910791019_121127926)）。
   - 付费课程矩阵：《相约七年后》《家庭成长年度社群》《写作课》（[好教师网合集](http://www.goodjiaoshi.com/content/763011.html)、[linux.do 资源帖](https://linux.do/t/topic/1371697)）。
   - **企业/家办线下授课**：为访学班授课（[家办访学课程 2025](http://pre.official.ijiabin.com/info/2138/arc/26)）——说明其变现渠道已从币圈转向**高净值人群培训**。

5. **币圈标签的实质性淡化**
   - 2023 年后公开出版与课程重心为财富认知、思维方法、专注力、家庭教育、英文写作；**未检索到 2024–2026 年他有新的币圈投资/发币/站台动作**。
   - Mixin 被盗（2023-09）是他与币圈最后一次高关注度关联（[华夏时报](https://www.chinatimes.net.cn/article/130921.html)、[比推](https://api2.bitpush.news/articles/5131235)）。

### 未能确认（存疑）

- **X/Twitter 上的活跃方式**：未能获取其 X 账号的确切活跃情况。检索到的社交媒体痕迹主要是**微博**（[m.weibo.cn 条目](https://m.weibo.cn/detail/5284641641598434)、[另一条](https://m.weibo.cn/detail/5294950556109650)），但**无法确认发帖时间与内容**。
- 其[官方站点 lixiaolai.com](https://lixiaolai.com/) 与 [About 页](https://lixiaolai.com/about) 确认存在，但**无法打开读取**。
- 2026 年是否有《财富的真相》之后的第五本中文书：未检索到。
- 是否设立基金/家族办公室进行投资：仅见"家办访学"是**授课场景**而非他自设家办，**不可混淆**。

---

## 六、信息不足与存疑

### A. 因工具限制而系统性缺失的（最重要）

1. **全部正文不可读**：`web_fetch` 在本会话被沙箱完全阻断（DNS → 198.18.0.0/15 黑洞）。因此：
   - 所有"本人原话"我**只能**看到标题级转述，**无法确认精确措辞**。
   - 所有数字的**计价口径、时点、上下文**均无法核对（PressOne 的 8200 万/1 亿/2 亿冲突，很可能就是计价时点差异所致，但我无法证明）。
   - 录音全文、法院判决书、港交所/股转系统公告全文、GitHub 仓库内容，**全部未能读取**。
2. **GitHub 仓库内容不可读**：`xiaolai/no-one-did-it`、`xiaolai/regular-investing-in-box`、`the-craft-of-selfteaching` 只看得到仓库/commit 标题与文件名。
3. **优先级媒体未能充分利用**：财新有[《李笑来谈ICO》专题](https://www.caixin.com/hot/lixiaolaitanico.html)与[《PressOne》专题](https://www.caixin.com/hot/pressone.html)，晚点 LatePost、第一财经、36氪的部分深度稿，我只拿到标题。

### B. 具体存疑清单

| 存疑项 | 具体问题 |
|---|---|
| 新东方任职起止年份 | "2001 入职 / 2008 离开"未获直接来源确认；"任教 7 年"是常见说法但本次未证实 |
| 《把时间当作朋友》首版年份与"出版机缘" | 首版年份未确认；旧版所述"机缘"无来源 |
| 2011 年买入比特币的价格与规模 | 完全无法证实；"1–10 美元"是旧版推断 |
| 比特币是否仍持有 | 他用过去式"曾经有过"；是否清仓、何时清仓**无来源** |
| 比特基金的实际回报 | 唯一数字"10 万变 430 万"是单一二手来源 |
| 比特基金与他本人/睿铂极因的确切法律关系 | 股转系统文件不可读 |
| 得到专栏最终订阅数 | "7 万+"可追溯；"20 万"无来源 |
| PressOne 募资额 | 四种口径冲突，无法定论 |
| ICO 清退的完成度与退款比例 | **完全无权威来源** |
| 与陈伟星诽谤案的判决结果 | 只有"二审维持原判"，不知一审胜负；**他是否真的起诉、是否撤诉亦不清楚** |
| "20% 站台费" | 单一来源、间接转述 |
| Mixin 中的股权/投资身份 | "背书"成立；"投资人"不成立 |
| BOX 的 b.watch 品牌 | 检索不到该名称的任何来源 |
| 定投践行群的真实人数与收入 | 无权威来源 |
| 2023–2026 是否仍有币圈投资 | 未检索到，但**"未检索到"不等于"没有"** |
| X/Twitter 活跃度 | 完全未获取 |
| 2026 年下半年的动作 | 除两本英文书外无其他发现；检索对 2026 年内容的索引覆盖明显稀疏 |

### C. 结构性偏差提示

1. **中文搜索结果对 2017–2019 币圈事件的覆盖远好于 2023–2026**。这意味着本报告在"最新动作"一章的**实际覆盖度低于其表面篇幅**——我更多是在描述"有据可查的动作"，而非"他这段时间的全部动作"。
2. **币圈媒体与自媒体（blockvalue、binance square、gate square、huoxun、bitpush）在结果中占比很高**。我已在正文中逐条标注来源性质，但读者仍需注意：**这些来源的"数字"绝大多数我没有独立验证手段。**
3. **本次调研严格遵守了黑名单**：未将知乎、微信公众号、百度百科/知道作为依据。凡此类链接出现在检索结果中，我**只用于"记录存在某种说法"，不作为事实依据，且已明确标注**（如"《学习的真相》1999 元"）。
4. **矛盾原样保留**：PressOne 募资额（4 种口径）、比特币持有量（本人 6 位数 vs 自媒体 10 万枚 vs "2 人比我多"）、Mixin 角色（背书 vs 投资）等矛盾，我**未做调和**，均按原样并列呈现。

---

## 七、来源清单

### 一手 / 准一手（本人站点、官方公告、开源仓库、本人自述的媒体转述）

| 类型 | 来源 | URL |
|---|---|---|
| 本人站点 | lixiaolai.com 首页 / About / 作品集 | [首页](https://lixiaolai.com/)、[About](https://lixiaolai.com/about) |
| 本人站点文章 | How The Half Second was written（2026-05-17） | https://lixiaolai.com/articles/2026-05-17/how-the-half-second-was-written |
| GitHub（本人账号） | xiaolai/no-one-did-it（含 2026-05-27 首发 commit） | [仓库](https://github.com/xiaolai/no-one-did-it/blob/main/README.md)、[commit](https://github.com/xiaolai/no-one-did-it/commit/d0ea0d6a8d729af5ec05353319fae5665334ef51)、[about-the-author](https://github.com/xiaolai/no-one-did-it/blob/main/book/back-matter/about-the-author.md)、[LICENSE](https://github.com/xiaolai/no-one-did-it/blob/main/LICENSE) |
| GitHub（本人账号） | xiaolai/regular-investing-in-box（《定投改变命运》） | https://raw.githubusercontent.com/xiaolai/regular-investing-in-box/b7dd6694b2310c6eb0a075844ebf03227a005a38/Z-Appendix.02.md |
| 港交所公告 | 雄岸科技（01647.HK）2018-12-03 公告 PDF | http://www.grandshorestech.com/uploadfile/file/20181203/201812030815410.pdf |
| 全国股转系统披露 | 比特资产 / 北京睿铂极因投资管理中心（2016-04-14） | https://www.neeq.com.cn/disclosure/2016/2016-04-14/1460619485_902628.pdf |
| 交易所/项目公告 | BigONE 官方帮助中心 | https://bigone.zendesk.com/hc/en-us/articles/900001639546-The-Function-of-Spot-Flashing-Function-is-getting-listed |
| 项目方论坛 | Mixin Discourse（含"鼓励金停发"投诉帖） | http://discuss.mixin.one/questions/D1DJ1/E1JJ1 |
| 得到官方 | 《通往财富自由之路》/《李笑来谈AI时代的家庭教育》 | [财富自由之路](https://www.igetget.com/course/%E9%80%9A%E5%BE%80%E8%B4%A2%E5%AF%8C%E8%87%AA%E7%94%B1%E4%B9%8B%E8%B7%AF)、[AI时代家庭教育](https://www.dedao.cn/course/detail?id=93N5e6Rya4ZJjQYspEVOmGApwlo08D) |
| 本人自述（媒体转述） | 王峰十问李笑来："曾经确实有过 6 位数比特币" | [i黑马](http://www.iheima.com/article-167471.html)、[腾讯云转载](https://cloud.tencent.cn/developer/article/1096132)、[凤凰科技转载](https://tech.ifeng.com/a/20180306/44896659_0.shtml) |
| 本人自述（媒体转述） | "中国至少有 2 个人比特币数量比我多" | http://finance.sina.com.cn/blockchain/roll/2018-10-18/doc-ifxeuwws5619380.shtml |
| 本人自述（媒体转述） | 2018-09-30"不会再做投资，准备转行" | [新浪财经](http://finance.sina.com.cn/blockchain/roll/2018-09-30/doc-ifxeuwwr9757362.shtml)、[TechWeb](https://people.techweb.com.cn/2018-09-30/2705019.shtml) |
| 本人自述（媒体转述） | "一个专栏卖 2000 多万" | [搜狐](https://www.sohu.com/a/122754732_108964) |
| 商业出版 | 《No One Did It》ISBN 9781808260032 | https://www.abebooks.co.uk/products/isbn/9781808260032 |

### 优先媒体（财新、界面、澎湃、36氪、虎嗅、钛媒体、第一财经系、经济观察网、新浪财经、人民网、中新网、证券时报、每经、华夏时报、人民论坛网、中国城市网、新京报系）

- 财新：[《李笑来谈ICO》专题](https://www.caixin.com/hot/lixiaolaitanico.html)、[《PressOne》专题](https://www.caixin.com/hot/pressone.html)
- 界面：[李笑来凭什么搅翻亿级资本](https://www.jiemian.com/article/1605533.html)、[比特币首富李笑来，手里到底有多少个比特币？](https://m.jiemian.com/article/1934489.html)、[中国比特币首富李笑来：曾拥有过6位数比特币](https://www.jiemian.com/article/1971690.html)、[已经有7万多人上路了](https://www.jiemian.com/article/889231.html)、[深访币圈（PressOne 8200 万美元）](https://www.jiemian.com/article/1885972.html)、[央行禁止ICO后 李笑来首次发声](https://m.jiemian.com/article/1605577.html)、[ICO三方亲述清退经历](https://m.jiemian.com/article/1637618.html)、[【人物】李笑来的"逃跑计划"](https://www.jiemian.com/article/2530586.html)、[五问李笑来之"逃"](https://m.jiemian.com/article/2511656.html)、[中国"币神"跳船逃生](https://www.jiemian.com/article/2520605.html)、[「李笑来的回应」曝光](https://www.jiemian.com/article/2285816.html)、[想创业，就来新东方](https://www.jiemian.com/article/2363837_qq.html)
- 澎湃：["中国比特币首富"李笑来退出雄岸基金，称将起诉陈伟星诽谤](https://m.thepaper.cn/wifiKey_detail.jsp?contid=2252976)、[李笑来转行？出任雄岸科技执行董事及联席CEO](https://www.thepaper.cn/newsDetail_forward_2701717)
- 36氪：[录音门事件"退圈"一周年，李笑来再发新币「BOX」](https://36kr.com/p/1723959853057)、[李笑来发新币、建新群](https://36kr.com/p/1723965816833)、[EOS官方再次去李笑来化](https://36kr.com/p/1722433585153)、[李笑来：老实做个好人（快讯）](https://36kr.com/newsflashes/3278920450049)
- 虎嗅：[两位从新东方走出的韭菜收割师](https://pro.huxiu.com/article/299894.html)、[对话李笑来：区块链世界里老实做个好人就能赚很多钱](https://pro.huxiu.com/article/253376.html)、[李笑来的"逃跑计划"](https://pro.huxiu.com/article/266425.html)
- 钛媒体：[李笑来的"逃跑计划"](https://www.tmtpost.com/3526509.html)、[老猫默认李笑来收取20%高额站台费](https://www.tmtpost.com/3237874.html)、[李笑来想退出区块链投资，但他需要先回答这几个问题](https://www.tmtpost.com/3508807.html)
- 经济观察网：[李笑来露馅了](http://www.eeo.com.cn/2018/0713/332330.shtml)、[区块链是虚火？有投资人说95%项目处在幻想阶段](http://www.eeo.com.cn/2018/0319/324837.shtml)
- 新浪财经/科技：[李笑来私聊遭录音：骗割散户 嘲讽软银](https://finance.sina.com.cn/blockchain/coin/2018-07-04/doc-ihevauxi9827249.shtml)、["比特币首富"李笑来：拥护ICO监管 下线部分区块链资产](https://finance.sina.com.cn/roll/2017-09-06/doc-ifykpzey4811913.shtml)、[李笑来回应代币监管：配合清退](https://finance.sina.com.cn/chanjing/cyxw/2017-09-06/doc-ifykpysa3674381.shtml)、[失控的ICO：项目书都没有就融了1亿美元](https://finance.sina.cn/forex/whzx/2017-08-28/detail-ifykkfat0193335.d.html)、[退出币圈42天后 李笑来又复出站台暴跌94.5%的项目](http://finance.sina.com.cn/blockchain/roll/2018-11-14/doc-ihnvukfe6652784.shtml)、[李笑来发新书 一场新收割拉开序幕](https://finance.sina.com.cn/blockchain/2018-09-17/doc-ifxeuwwr5114152.shtml)、[比特币大佬又火了 刚当上联席CEO雄岸科技就涨近20%](https://finance.sina.com.cn/stock/hkstock/ggscyd/2018-12-04/doc-ihmutuec6111489.shtml)、[李笑来多次食言退出币圈!出任CEO公司股票还涨20%](https://finance.sina.cn/blockchain/2018-12-05/detail-ihmutuec6435165.d.html)、[李笑来退出、姚勇杰减持、雄岸科技退出区块链](https://finance.sina.com.cn/stock/relnews/hk/2019-05-10/doc-ihvhiews1084512.shtml)、[李笑来回归：做"高级荐币群"](https://finance.sina.com.cn/blockchain/roll/2019-05-15/doc-ihvhiqax8892786.shtml)、[签到10年到手30万？李笑来站台的Mixin被质疑是骗局](https://finance.sina.cn/blockchain/2019-12-24/detail-iihnzhfz7973082.d.html)、[陈伟星X李笑来：几番风雨 一地鸡毛](https://finance.sina.com.cn/blockchain/coin/2018-06-15/doc-ihcyszrz2216388-p2.shtml)、[吃瓜群众专用指南：李笑来陈伟星互怼全程](http://finance.sina.com.cn/blockchain/coin/2018-07-11/doc-ihfefkqq2260844.shtml)、[绝望半年告别币圈 李笑来的"逃跑计划"](https://tech.sina.cn/i/gn/2018-10-12/detail-ifxeuwws3405644.d.html)、[得到公布运营数据：总营收1.4亿 最高者入2千万](https://tech.sina.cn/i/gn/2017-02-21/detail-ifyarrcf5303139.d.html)、[割过"韭菜"的大佬，对"韭菜"说了一些大实话](https://finance.sina.com.cn/money/future/wemedia/2023-10-29/doc-imzsunmf7934294.shtml)、[李笑来 GitHub 持续更新动态](https://www.sina.cn/news/detail/5331594149364138.html)
- 人民网：[国内首只比特币基金开募 法律人士称风险大](http://finance.people.com.cn/stock/BIG5/n/2013/0529/c222942-21658192.html)、[专家警示风险大](http://finance.people.com.cn/money/n/2013/0530/c218900-21677845.html)、[法律专家称风险非常大](http://finance.people.com.cn/stock/n/2013/0530/c222942-21676140.html)
- 中新网：[中国首只比特币基金开募 发起人称获益百倍](https://www.chinanews.com/fortune/2013/05-30/4875445.shtml)、[监管风暴中的"比特币首富"李笑来](https://www.chinanews.com.cn/m/cj/2017/09-11/8327747.shtml)
- 每经：[原新东方教师开募国内首只比特币基金](http://www.nbd.com.cn/articles/2013-05-29/745199.html)、[被曝涉赌洗钱，欠下3万枚比特币，"比特币首富"回应：别来挑事！](https://www.nbd.com.cn/rss/toutiao/articles/1224697.html)
- 证券时报：[国内首只比特币基金开募 法律人士称风险大](http://epaper.stcn.com/paper/zqsb/html/2013-05/29/content_474060.htm)
- 华夏时报：[2亿美元不翼而飞，项目方却仅赔付50%！Mixin被盗事件被疑自导自演](https://www.chinatimes.net.cn/article/130921.html)
- 人民论坛网：[新书推介｜李笑来新作《思考的真相》于7月12日晚开售](https://rmlt.com.cn/2024/0712/707250.shtml)、[找回被"偷走"的注意力（2025-06-20）](https://www.rmlt.com.cn/2025/0620/733295.shtml)
- 中国城市网：[找回被"偷走"的注意力——评李笑来《专注的真相》（2025-06-24）](https://zgcsb.com/news/pinDao/2025-06/24/a_601541.html)
- 中国网（转载新京报）：[谁在纵容币圈乱象"李笑来"们？](https://finance.china.com/tech/13001906/20180709/32656686.html)、[ICO风口已过 李笑来是"天使"or"骗子"？](http://finance.china.com.cn/industry/renwu/20170906/4380052.shtml)、[监管风暴中的"比特币首富"李笑来](https://finance.china.com.cn/money/efinance/20170911/4386087.shtml)、[起底失控的ICO](http://finance.china.com.cn/money/efinance/20170828/4368122.shtml)、[用一个没有白皮书的ICO项目融资近2亿美元](https://economy.china.com/domestic/11173294/20170901/31251706_2.html)
- 未央网（清华大学金融科技研究院孵化）：[退出币圈42天后，李笑来复出了](https://www.weiyangx.com/310498.html)
- 零壹财经：[退出币圈42天后，李笑来复出了](https://www.01caijing.com/blog/329454.htm)
- 蓝鲸财经：[罗辑思维公布运营数据：不做开放平台的"得到"也能做到2亿营收](https://www.lanjinger.com/d/32586)
- 江苏网络电视台/香港商报/TechWeb：[李笑来发文回应录音泄露事件](http://news.jstv.com/a/20180706/153086413281.shtml)、[李笑来回应录音门](http://tp.hkcd.com/content/2018-07/06/content_1095167.html)、[TechWeb 版](https://m.techweb.com.cn/article/2018-07-07/2683611.shtml)、[李笑来谈ICO政策：积极拥护](http://news.jstv.com/a/20170906/1504679153524.shtml)
- 智通财经：[雄岸科技(01647)：李笑来辞任执行董事及联席行政总裁](https://m.zhitongcaijing.com/contentnew/appcontentdetail.html?content_id=202465)、[复出的李笑来：一场"收割"的生意](https://www.zhitongcaijing.com/content/detail/168471.html)
- 凤凰科技/凤凰网：[王峰十问李笑来转载](https://tech.ifeng.com/a/20180306/44896659_0.shtml)、[虚拟货币ICO币投资者：9元接盘9毛离场](https://news.ifeng.com/a/20170920/52091133_0.shtml)、[李笑来发新书转载](https://tech.ifeng.com/c/7gGaFFhkbsu)、[消息称监管层将对ICO采取行动](https://finance.ifeng.com/a/20170828/15617070_0.shtml)

### 行业/区块链媒体与第三方（作为补充，已逐条标注性质）

- [PANews·李笑來背書、羅永浩入股，深扒Mixin背後的陳年往事](https://t-www.panewslab.com/zh_hk/articledetails/b8u1oqt6Ft.html)
- [PANews·博链财经直面大佬第二期实录：独家专访李笑来](https://www.panewslab.com/zh/articles/866)
- [Foresight News·被盗 2 亿美元，深扒 Mixin 背后的那些事儿](https://foresightnews.pro/article/detail/43822)、[复盘 Mixin 两亿美元失窃案](https://foresightnews.pro/article/detail/44294)、[信李笑来，投降输一半](https://solana-test.foresightnews.pro/article/detail/44026)
- [比推·Mixin被盗约2亿美元后续：赔付方案包含债券](https://api2.bitpush.news/articles/5131235)、[起底Mixin](https://api2.bitpush.news/articles/5121403)、[李笑来"七年之约"已到，EOS 币价跌近 90% 并更名为 Vaulta](https://api2.bitpush.news/articles/7561949)、[笑来"哭去" 比特币首富大败局](https://www.bitpush.news/articles/282244)、[李笑来的项目不要参与！但是李笑来的话一定要听？](https://bitpush.news/articles/5382417)
- [Cointelegraph 中文·七年之约到期，EOS暴跌90%终更名](https://cn.cointelegraph.com/news/the-seven-year-agreement-has-expired-eos-plummeted-90percent-and-finally-rebranded-a-dollar4-1-billion-blockchain-dream-comes-to-an-end)
- [BTCC·李笑來"七年之約"已到](https://www.btcc.com/zh-TW/amp/square/PanewslabTW/788418)
- [Odaily·李笑来发新币、建新群](https://www.odaily.news/post/5138866)
- [AICoin·为什么普通人不应该定投李笑来的BOX](https://www.aicoin.com/zh-Hans/article/236717)
- [HTX 社区·起底Mixin：OG扎堆、笑来力捧、粉丝血汗](https://www.htx.com/zh-cn/feed/community/2462137/)
- [WikiBit·BigONE：李笑来、老猫的"币圈活化石"](https://www.wikibit.com/zh-cn/news/cryptocurrency-regulatory-blacklist-exchange-wikibit-xiaolai)
- [blockvalue·老猫18年清算了13年李笑来的比特基金](https://www.blockvalue.com/news/20200601424458.html)、["签到就送比特币"，李笑来站台的钱包被质疑是骗局](https://www.blockvalue.com/jingyan/20191226139112.html)、[bitcointalk帖：揭露李笑来和赵东](https://www.blockvalue.com/jingyan/20140417135.html)、[Mixin想要做成币圈的微信](https://www.blockvalue.com/blockchain/20191210110272.html)、[笑来老师一直强调概念要清晰](https://www.blockvalue.com/news/20200605437013.html)、[斜杠青年笑来斯基的多面人生](https://www.blockvalue.com/xinbi/2019112285213.html)、[中国比特币首富李笑来和他的创纪录的ICO项目PressOne](https://www.blockvalue.com/ICO/2017071910316.html)
- [BlockGlobe24·李笑来：与陈伟星诽谤的案件二审结果维持原判](https://www.blockglobe24.com/news-flash/23368.html)、[火讯同题](https://admindoc.huoxun.com/index.php/lives/589167.html)、[火讯·关于陈伟星诽谤案他已经换了四拨律师](http://huoxun.com/index.php/lives/551662.html)
- [Crunchbase·Xiaolai Li - Founder @ INBlockchain](https://www.crunchbase.com/person/xiaolai-li)
- [Quill·PRS 清算那些事儿](https://quill.im/34305390/eed8d93a-8853-400c-aefb-bfbcbfe2d795)
- [铅笔道·李笑来谈币圈成就：我是困在大树枝头的熊猫](https://pencilnews.cn/p/18066.html)
- [搜狐·万字长文深度对话：关于比特币首富李笑来](https://www.sohu.com/a/224918755_100111153)、[历史进程中的李笑来](https://www.sohu.com/a/241265540_100188883)、[比特币翻倍李笑来回归](https://www.sohu.com/a/314068326_250147)、[七三韭菜节七年反思与学习心得](https://www.sohu.com/a/910791019_121127926)、[李笑来：一个专栏卖2000多万](https://www.sohu.com/a/122754732_108964)
- [亿欧·历史进程中的李笑来](https://www.iyiou.com/analysis/2018071376786)
- [网易·辣评李笑来：先富带动后富，感动币圈十大人物](https://www.163.com/dy/article/DMDV81C405198LHD.html)
- [lmmsoft·深度拆解李笑来如何用GPT-4o写书](https://lmmsoft.github.io//how_did_xiaolai_write_book_with_gpt4o/)、[lijinma·笑来老师是如何快速写完两本英文书籍的？](https://lijinma.com/how-lixiaolai-wrote-two-english-books/)
- [中国报（马来西亚）·中國比特幣首富李笑來 無需計劃書 空手套8億](https://www.chinapress.com.my/20170904/%e4%b8%ad%e5%9b%bd%e6%af%94%e7%89%b9%e5%b8%81%e9%a6%96%e5%af%8c%e6%9d%8e%e7%ac%91%e4%be%86-%e7%84%a1%e9%9c%80%e8%a8%88%e5%8a%83%e6%9b%b8-%e7%a9%ba%e6%89%8b%e5%a5%978%e5%84%84/)

### 出版/课程/馆藏类

- 电子工业出版社：[财富自由之路（修订版）](https://cbjj.phei.com.cn/module/goods/wssd_content.jsp?bookid=62917)
- 文轩网：[李笑来4本套](https://m.winxuan.com/product/1204322653)、[好的家庭教育](https://m.winxuan.com/product/1204266503)、[好的家庭教育（思维导图版）](https://m.winxuan.com/product/1204397659)、[财富的真相](https://fenxiao.winxuan.com/product/1203250796)
- 当当：[专注的真相（2025年新书）](http://product.dangdang.com/29858159.html)、[韭菜的自我修养(2019)](http://e.dangdang.com/touch/products/1901128001.html)、[好的家庭教育电子书](http://e.dangdang.com/products/1901388755.html)
- 微信读书：[专注的真相](https://weread.qq.com/web/reader/59b324d0813ababe6g010489)、[好的家庭教育](https://weread.qq.com/web/bookDetail/1e432b80813abb5ddg017b40)
- 豆瓣阅读/豆瓣：[思考的真相](https://read.douban.com/ebook/665934815/)、[财富的真相](https://read.douban.com/ebook/665932792/)、[The Half Second 笔记](https://book.douban.com/people/135268500/annotation/38486819/)
- 图书馆：[上海图书馆](https://vufind.library.sh.cn/Record/6dd15d94-e0bb-4e37-a9ec-e7e07ff36809)、[浙江图书馆·把时间当作朋友](https://opac.zjlib.cn/opac/book/2117454)、[湖南师大·让时间陪你慢慢变富](https://opaclib.hunnu.edu.cn/opac/book/a53d1340dd46640894e100ab327eb160)、[北大医学图书馆·财富自由之路](https://opac.bjmu.edu.cn/record/761560812)、[北大医学图书馆·专注的真相](https://opac.bjmu.edu.cn/record/765728457)、[南大图书馆](https://libopac.nudt.edu.cn/opac/book/964769?view=simple&flag=printer)
- [QQ阅读·把时间当作朋友（第3版）再版前言](https://book.qq.com/book-read/23437994/6)、[思考的真相](https://book.qq.com/book-detail/57302006)
- [好教师网·李笑来全领域付费课程合集](http://www.goodjiaoshi.com/content/763011.html)
- [家办访学课程·李笑来等授课](http://pre.official.ijiabin.com/info/2138/arc/26)、[访学课程计划](http://pre.official.ijiabin.com/info/2125/arc/1)
- [青岛西海岸图书馆·共读《好的家庭教育》](https://huangdaolib.net/home/pages/detail?id=8154)
- 播客：[小宇宙·ep5 李笑来x脱不花：其实你不需要意志力](https://www.xiaoyuzhoufm.com/episode/6895a38746542d8c4120d691)、[豆瓣播客](https://www.douban.com/podcast_episode/361788)
- [ResoHub·AI 时代家庭教育的逻辑重构（2024-10-06）](https://www.resohub.net/2024/10/06/ai-era-family-education-logic-reconstruction/)
- [小花生·关于AI时代的家庭教育的个人观点](https://www.xiaohuasheng.cn/note/36ea67f9ae12b37f)
- [Gate 广场·李笑来《The Half Second》核心观点解读](https://apim.gateapi.io/zh/post/status/21180777)、[比特吴老湿书评](http://gate.tv/zh/post/status/21835254)、[新浪·用一天时间读完《The Half Second》](https://sina.cn/news/detail/5307813347197980.html)
- [linux.do·李笑来丨相约七年后](https://linux.do/t/topic/1371697)、[李笑来·合集（全）](https://linux.do/t/topic/1116132)
- [多抓鱼·财富的真相](https://www.duozhuayu.com/books/923618786832159101)、[微信互联网平民创业](https://www.duozhuayu.com/books/514865473746244991)
- [豆瓣·李笑来 开了"得到"专栏：《通往财富自由之路》](https://www.douban.com/note/581237611/)
- [简书·如何加入一个超过4000人的BOX定投践行群](https://www.jianshu.com/p/e431d43e8d10)、[践行群的发展历史（语雀）](https://www.yuque.com/zhouxingchenzhoujunqinqinjie/fd0nxc/lyw7vt)、[定投人生课堂大事记（语雀）](https://www.yuque.com/box1972/utg8xv/kvg00b)
- [lou-kaiqiang.github.io·第四届韭菜节直播领会（2022-07-03）](https://lou-kaiqiang.github.io/2022/07/03/record_of_xiaolai's_video/)

### 已排除（黑名单，仅记录"存在该说法"，不作依据）

知乎、微信公众号（mp.weixin.qq.com）、百度百科/百度知道/百科TA说、百度百家号、今日头条、binance/gate 等交易所"广场"UGC。以上链接在正文中出现时均已明确标注其非权威性质。**特别注意**：交易所广场与自媒体传播的"10 万枚比特币""套现 135 亿""押光身家"三组数字，**本报告明确判定为无法证实，并建议在后续 skill 中禁止引用**。

---

完成度自评：**约 60%**。**扣分主因是环境而非投入**：本会话 `web_fetch` 被沙箱彻底阻断（DNS 劫持至 198.18.0.0/15 黑洞，PowerShell 出网亦被重置），因此**全部证据停在标题/索引片段级，我未能读到任何一篇文章的正文**——这对"核验具体数字"的任务目标构成实质性削弱，PressOne 募资额、比特基金回报、得到订阅数、ICO 清退比例等关键数字我都只能呈现冲突或标注无法证实。**加分项**：①用约 40 轮检索搭出了从 2001 到 2026-05 的完整决策链，并**新发现旧版完全缺失的 2025–2026 英文书与 AI 写作转向**（`xiaolai/no-one-did-it` 的 2026-05-27 首发 commit + 本人站点 2026-05-17 文章 + ISBN 9781808260032 三重独立证据）；②**言行不一致的主证据链做到了"一手公告 + 多源 + 精确日期"级别**（2018-09-30 声明"不再做投资"→2018-11-14 复出站台→2018-12-03 港交所公告出任联席 CEO→2019-05 荐币群→2019-07 发新币，媒体直接用词"多次食言退出币圈"）；③在第四章逐条推翻了旧版多项具体数字（旧版的四处"事后反思"引语全部无源、判定为虚构；"发布道歉信"不成立；"比特天使投资基金"定性错误；"20 万订阅"无源；"超 2 亿美元"是四种冲突口径中的上限）；④严格未使用黑名单来源，矛盾一律原样保留。**最薄弱环节**：录音全文、法院判决结果（只知"二审维持原判"而不知胜负）、ICO 清退的真实处理情况——三者都是判断其品行最关键的材料，却恰恰是我完全够不到的。
