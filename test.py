import json
from urllib.parse import unquote
from typing import Any, Dict
import trafilatura
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig


async def crawler(url: str) -> Dict[str, Any]:
    browser_config = BrowserConfig()
    crawler_config = CrawlerRunConfig()
    async with AsyncWebCrawler(config=browser_config) as crawler:
        results = await crawler.arun_many([url], config=crawler_config)
        r = results[0]

        if not r.success:
            return {"url": url, "error": "Failed to fetch URL"}

        data = trafilatura.extract(
            r.html,
            output_format="markdown",
            include_tables=True,
            include_links=False,
            include_comments=True,
            with_metadata=True,
            include_formatting=True,
        )
        if not data:
            return {"url": url, "error": "No content extracted"}

        return data


if __name__ == "__main__":
    import asyncio

    url = "https://www.prothomalo.com/politics/1nwjgd1fn1"

    content = asyncio.run(crawler(url))

    with open("output.md", "w", encoding="utf-8") as f:
        f.write(content)

    print(content)
