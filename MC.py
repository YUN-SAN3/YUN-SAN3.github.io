#!/usr/bin/env python3
import sys
import asyncio
import time
import argparse
from mcstatus import JavaServer

# 存储上一次输出的行数（用于覆盖）
last_line_count = 0

def print_overwrite(text: str):
    global last_line_count
    # 清除上一次的输出（逐行向上清除）
    if last_line_count > 0:
        for _ in range(last_line_count):
            sys.stdout.write("\033[F")  # 光标上移一行
            sys.stdout.write("\033[K")  # 清除该行
    # 打印新内容
    lines = text.splitlines()
    last_line_count = len(lines)
    print(text, flush=True)

async def check_server_once(address: str, timeout: float = 5.0):
    if ':' in address and address.count(':') == 1:
        host, port_str = address.rsplit(':', 1)
        try:
            port = int(port_str)
        except ValueError:
            return f"❌ 端口格式错误: '{port_str}' 不是有效数字"
    else:
        host = address
        port = 25565

    try:
        server = JavaServer.lookup(f"{host}:{port}")
        status = await asyncio.wait_for(server.async_status(), timeout=timeout)

        lines = []
        lines.append(f"[{time.strftime('%H:%M:%S')}] ✅ {host}:{port} 在线")
        lines.append(f"  版本: {status.version.name}")
        lines.append(f"  延迟: {round(status.latency, 2)} ms")
        lines.append(f"  玩家: {status.players.online} / {status.players.max}")
        if status.players.sample:
            names = [p.name for p in status.players.sample]
            lines.append(f"  在线玩家: {', '.join(names)}")
        else:
            lines.append("  （未提供具体玩家列表）")
        return "\n".join(lines)

    except asyncio.TimeoutError:
        return f"[{time.strftime('%H:%M:%S')}] ❌ {host}:{port} 超时（无响应）"
    except OSError as e:
        return f"[{time.strftime('%H:%M:%S')}] ❌ {host}:{port} 网络错误: {e}"
    except Exception as e:
        return f"[{time.strftime('%H:%M:%S')}] ❌ {host}:{port} 错误: {e}"

async def monitor_loop(address: str, interval: int):
    global last_line_count
    # 首次提示（不被覆盖）
    print(f"🔁 开始监控 {address}，每 {interval} 秒刷新状态（Ctrl+C 退出）\n")

    while True:
        output = await check_server_once(address)
        print_overwrite(output)
        await asyncio.sleep(interval)

def main():
    parser = argparse.ArgumentParser(
        description="检测 Minecraft 服务器状态（支持原地刷新）",
        usage="python check_mc.py [-t [INTERVAL]] ADDRESS"
    )
    parser.add_argument("address", help="服务器地址（如: play.example.com 或 192.168.1.1:25566）")
    parser.add_argument(
        "-t", "--loop",
        nargs="?",
        const=1,
        type=int,
        metavar="SECONDS",
        help="启用循环检测，默认间隔 1 秒（例如: -t 或 -t 5）"
    )

    args = parser.parse_args()
    address = args.address.strip()

    if not address:
        print("❌ 地址不能为空", file=sys.stderr)
        sys.exit(1)

    if args.loop is not None:
        interval = args.loop
        if interval < 1:
            print("❌ 轮询间隔必须 ≥ 1 秒", file=sys.stderr)
            sys.exit(1)
        try:
            asyncio.run(monitor_loop(address, interval))
        except KeyboardInterrupt:
            # 恢复光标位置（可选）
            global last_line_count
            if last_line_count > 0:
                print()  # 换行，避免提示符覆盖状态
            print("\n🛑 监控已停止。")
    else:
        # 单次检测：正常打印，不覆盖
        result = asyncio.run(check_server_once(address))
        print(result)
        if result.startswith("❌"):
            sys.exit(1)

if __name__ == "__main__":
    main()