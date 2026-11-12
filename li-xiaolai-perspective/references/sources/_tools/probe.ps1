$urls = @(
  "http://finance.sina.com.cn/blockchain/coin/2018-07-05/doc-ihevauxk4967340.shtml",
  "http://www.sohu.com/a/239138154_115060",
  "http://m.sohu.com/a/239655813_118792/",
  "http://www.jiemian.com/article/2282360.html",
  "http://m.weibo.cn/status/5286654316126479",
  "http://weibo.com/xiaolai",
  "http://www.36kr.com/p/1725071228929",
  "https://x.com/xiaolai",
  "http://www.baidu.com",
  "http://www.baijiahao.baidu.com/s?id=1657349695258863880",
  "http://github.com/xiaolai",
  "http://raw.githubusercontent.com/xiaolai/regular-investing-in-box/master/README.md",
  "http://www.techweb.com.cn",
  "http://www.thepaper.cn",
  "http://www.douban.com/note/588630961/",
  "http://www.jianshu.com",
  "http://www.ftchinese.com",
  "http://www.iqiyi.com",
  "http://www.bilibili.com",
  "http://www.zhihu.com",
  "http://www.8btc.com",
  "http://www.chainnode.com",
  "http://www.xiaolai.co",
  "http://b.xiaolai.co",
  "http://www.lixiaolai.com",
  "http://www.people.com.cn",
  "http://www.chinanews.com.cn",
  "http://www.yicai.com",
  "http://www.caixin.com",
  "http://www.tmtpost.com",
  "http://www.huxiu.com",
  "http://www.tuicool.com",
  "http://www.csdn.net",
  "http://www.secretchina.com",
  "http://www.rfa.org",
  "http://www.bbc.com",
  "http://www.nytimes.com",
  "http://medium.com",
  "http://www.reddit.com",
  "http://api.github.com"
)
foreach ($u in $urls) {
  try {
    $r = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 12 -MaximumRedirection 4 -Headers @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36" }
    Write-Output ("OK   " + $r.StatusCode + " len=" + $r.RawContentLength + "  " + $u)
  } catch {
    Write-Output ("FAIL " + $u + " :: " + $_.Exception.Message)
  }
}
