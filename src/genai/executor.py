import asyncio
from .analyzer.graph import create_graph

_executors = {}
_locks = {}


async def get_executor():
    loop = asyncio.get_running_loop()

    # create lock per loop if not exists
    if loop not in _locks:
        _locks[loop] = asyncio.Lock()

    async with _locks[loop]:
        # create executor if not cached
        if loop not in _executors:
            _executors[loop] = create_graph()

        return _executors[loop]
