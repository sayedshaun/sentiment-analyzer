import asyncio
import litserve as ls
from infer import ASRLitAPI


async def main():
    asr_api = ASRLitAPI(api_path="/transcribe", enable_async=True)
    server = ls.LitServer(asr_api)
    server.run(port=8000, generate_client_file=False)


if __name__ == "__main__":
    asyncio.run(main())
