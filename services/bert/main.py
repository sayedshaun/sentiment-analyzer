import asyncio
import litserve as ls
from bert.infer import BERTClassifierLitAPI


async def main():
    bert_api = BERTClassifierLitAPI(api_path="/predict", enable_async=True)
    server = ls.LitServer(bert_api)
    server.run(port=8003, generate_client_file=False)


if __name__ == "__main__":
    asyncio.run(main())
