import asyncio
from src.backend.genai.analyzer.executor import get_executor

async def main():
    executor = await get_executor()
    result = await executor.ainvoke({
        "text": "I had a great day at the park, but the weather was terrible."
    })
    print(result)

if __name__ == "__main__":
    asyncio.run(main())