'use client'

export default function AuthPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">用户登录/注册</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="邮箱"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="密码"
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            登录
          </button>
          <p className="text-center">
            还没有账号？ <a href="/register" className="text-blue-500">注册</a>
          </p>
        </div>
      </div>
    </div>
  )
} 