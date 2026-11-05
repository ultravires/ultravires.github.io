/**
 * Cloudflare Worker 运行时的最小类型声明。
 *
 * 项目未引入 @cloudflare/workers-types，这里只声明 Worker 脚本实际用到的接口，
 * 让 workers/ 下的代码也能纳入类型检查。
 */

/** KV 命名空间（wrangler.toml 中的 kv_namespaces 绑定） */
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

/** ctx.waitUntil 让后台任务在响应返回后继续执行 */
interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

/** Cron Trigger 事件 */
interface ScheduledEvent {
  cron?: string;
  scheduledTime: number;
}

/** Worker 绑定的资源与密钥 */
interface WorkerEnv {
  STATS_KV: KVNamespace;
  LA_ACCESS_KEY?: string;
  LA_SECRET_KEY?: string;
}
