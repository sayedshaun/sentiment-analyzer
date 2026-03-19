import asyncio
import litserve as ls
from infer import BERTClassifierLitAPI


async def main():
    bert_api = BERTClassifierLitAPI(api_path="/predict", enable_async=True)
    server = ls.LitServer(bert_api)
    server.run(host="0.0.0.0", port=8000, generate_client_file=False)


if __name__ == "__main__":
    asyncio.run(main())
