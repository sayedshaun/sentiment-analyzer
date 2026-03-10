import asyncio
from .graph import create_graph

_executors = {}
_locks = {}

async def get_executor():
    loop = asyncio.get_running_loop()

    if loop not in _locks:
        _locks[loop] = asyncio.Lock()

    async with _locks[loop]:
        if loop not in _executors:
            _executors[loop] = await create_graph()

        return _executors[loop]
    
