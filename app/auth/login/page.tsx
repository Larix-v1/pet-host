'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const identifier = formData.get('identifier') as string
    const password = formData.get('password') as string

    // 表单验证
    if (!identifier || !password) {
      setError('请完整输入账号和密码')
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        identifier,
        password,
        redirect: false
      })

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('密码错误，请重新输入')
        } else if (result.error === 'UserNotFound') {
          setError(
            <div className="space-y-2">
              <p>该账号尚未注册</p>
              <p className="text-sm">
                <Link href="/auth/register" className="text-blue-500">
                  立即注册 →
                </Link>
              </p>
            </div>
          )
        } else {
          setError(result.error)
        }
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      setError('登录过程中出现错误，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container mx-auto p-4 max-w-sm">
        <Button 
          variant="backButton" 
          size="sm" 
          onClick={() => router.back()} 
          className="mb-4 text-2xl"
        >
          &lt;
        </Button>
        <h1 className="text-2xl font-bold mb-4 text-center">用户登录</h1>
      </div>

      <div className="p-4">
        <div className="max-w-[400px] mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">账号</label>
              <Input
                type="text"
                name="identifier"
                placeholder="手机号码或邮箱"
                required
                className="w-full"
                onChange={() => error && setError(null)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">密码</label>
              <Input
                type="password"
                name="password"
                required
                className="w-full"
                onChange={() => error && setError(null)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </form>
          <p className="text-center mt-4">
            还没有账号？ <Link href="/auth/register" className="text-blue-500">注册</Link>
          </p>
        </div>
      </div>
    </div>
  )
} 